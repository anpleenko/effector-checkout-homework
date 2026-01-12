import { combine, createEffect, createEvent, createStore, guard, sample } from 'effector';

import * as api from '../../api';
import { $basket } from '../../entities/basket';
import { $quickBasket, quickBasketToggleClicked } from '../home/model';

type Delivery = 'courier' | 'postal' | 'pickup';
type Basket = 'basket' | 'quickBasket';

interface BasketSubmit {
  products: api.Product[];
  deliveryType: Delivery;
  address: string;
}

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
export const $basketType = createStore<Basket>('basket');

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
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (type === 'pickup') return pickup;
    return false;
  },
);

export const $currentBasket = combine(
  {
    type: $basketType,
    basket: $basket,
    quickBasket: $quickBasket,
  },
  ({ type, basket, quickBasket }) => {
    if (type === 'quickBasket') return basket.concat(quickBasket);
    return basket;
  },
);

$basketType.on($quickBasket, (_quickBasket) => 'quickBasket');

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
  source: combine({ products: $currentBasket, deliveryType: $deliveryType, address: $deliveryAddress, zip: $zipCode }),
  fn: ({ products, deliveryType, address, zip }) => ({ products, deliveryType, address: `${address}, ${zip}` }),
  target: basketSubmitFx,
});

const pickupSubmitted = guard({
  clock: formSubmitted,
  filter: $deliveryType.map((type) => type === 'pickup'),
});

sample({
  clock: pickupSubmitted,
  source: combine({ products: $currentBasket, deliveryType: $deliveryType, pickupStore: $selectedPickupStore }),
  fn: ({ products, deliveryType, pickupStore }) => ({ products, deliveryType, address: pickupStore }),
  target: basketSubmitFx,
});

sample({
  clock: quickBasketToggleClicked,
  source: combine({ products: $quickBasket, deliveryType: $deliveryType, pickupStore: $selectedPickupStore }),
  fn: ({ products, deliveryType, pickupStore }) => ({ products, deliveryType, address: pickupStore }),
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
