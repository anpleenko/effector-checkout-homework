/* eslint-disable @typescript-eslint/no-use-before-define */
import { combine, createEffect, createEvent, createStore, guard, sample } from 'effector';
import * as api from '../../api';
import { $currentBasket } from '../../entities/basket';

type Delivery = 'courier' | 'postal' | 'pickup';

type BasketSubmit = {
  products: api.Product[];
  deliveryType: Delivery;
  address: string;
};

const basketSubmitFx = createEffect<BasketSubmit, void>((basket) => {
  console.info('SUBMITTED', basket);
});

export const pageMounted = createEvent();
export const formSubmitted = createEvent();
export const deliveryTypeChanged = createEvent<string>();
export const pickupStoreChanged = createEvent<string>();
export const deliveryAddressChanged = createEvent<string>();
export const zipCodeChanged = createEvent<string>();

export const $deliveryType = createStore<Delivery>('courier');

export const $isPickup = $deliveryType.map((delivery) => delivery === 'pickup');
export const $availablePickupStores = createStore(['warehouse A', 'warehouse B']);
export const $selectedPickupStore = createStore('warehouse A');

export const $deliveryAddress = createStore('');
export const $isDeliveryEmpty = $deliveryAddress.map((address) => address.trim().length === 0);
export const $requireAddress = $isPickup.map((isPickup) => !isPickup);

export const $zipCode = createStore('');
export const $requireZipCode = $isPickup.map((isPickup) => !isPickup);

const $isAddressValid = $deliveryAddress.map(isValidAddress);
const $isZipCodeValid = $zipCode.map(isValidZipCode);

const $isCourierValid = combine($isAddressValid, $isZipCodeValid, (isAddress, isZip) => isAddress && isZip);

const $isPostalValid = combine($isAddressValid, $isZipCodeValid, (isAddress, isZip) => isAddress && isZip);

const $isPickupValid = createStore(true);

const $isFormValid = combine(
  {
    type: $deliveryType,
    courier: $isCourierValid,
    postal: $isPostalValid,
    pickup: $isPickupValid,
  },
  ({ type, courier, postal, pickup }) => {
    if (type === 'courier') return courier;
    if (type === 'postal') return postal;
    if (type === 'pickup') return pickup;
    return false;
  },
);

export const $submitDisabled = $isFormValid.map((isValid) => !isValid);

// TODO: check that user can open this page (then move code to process)

$deliveryType.on(deliveryTypeChanged.map(validateDeliveryType), (_, deliveryType) => deliveryType);

$deliveryAddress.on(deliveryAddressChanged, (_, address) => address);

$zipCode.on(zipCodeChanged, (_, zipcode) => zipcode);

$selectedPickupStore.on(pickupStoreChanged, (_, newStore) => newStore);

const validFormSubmitted = guard({
  clock: formSubmitted,
  filter: $submitDisabled.map((disabled) => !disabled),
});

const deliverySubmitted = guard({
  clock: validFormSubmitted,
  filter: $deliveryType.map((type) => type === 'courier' || type === 'postal'),
});

sample({
  clock: deliverySubmitted,
  source: [$currentBasket, $deliveryType, $deliveryAddress, $zipCode],
  fn: ([products, deliveryType, address, zip]) => ({
    products,
    deliveryType,
    address: `${address}, ${zip}`,
  }),
  target: basketSubmitFx,
});

const pickupSubmitted = guard({
  clock: formSubmitted,
  filter: $deliveryType.map((type) => type === 'pickup'),
});

sample({
  clock: pickupSubmitted,
  source: [$currentBasket, $deliveryType, $selectedPickupStore],
  fn: ([products, deliveryType, pickupStore]) => ({
    products,
    deliveryType,
    address: pickupStore,
  }),
  target: basketSubmitFx,
});

// TODO: submit form, but slightly validate before

const validDelivery = ['courier', 'postal', 'pickup'];
function validateDeliveryType(input: string): Delivery {
  if (validDelivery.includes(input)) {
    return input as Delivery;
  }
  return 'postal';
}

function isValidZipCode(input: string): boolean {
  return /^\d{6}$/.test(input);
}

function isValidAddress(input: string): boolean {
  return input.length > 6;
}
