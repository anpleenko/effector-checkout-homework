/* eslint-disable @typescript-eslint/no-use-before-define */
import { useStore } from 'effector-react';
import { FC, useCallback, useEffect } from 'react';
import {
  $availablePickupStores,
  $deliveryAddress,
  $deliveryType,
  $isPickup,
  $requireAddress,
  $requireZipCode,
  $selectedPickupStore,
  $submitDisabled,
  $zipCode,
  deliveryAddressChanged,
  deliveryTypeChanged,
  formSubmitted,
  pageMounted,
  pickupStoreChanged,
  zipCodeChanged,
} from './model';

export const DeliveryPage: FC = () => {
  useEffect(() => pageMounted(), []);
  const submitDisabled = useStore($submitDisabled);
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    formSubmitted();
  }, []);

  return (
    <section>
      <h2>Delivery</h2>
      <form onSubmit={handleSubmit}>
        <DeliverySelect />
        <PickupCentre />
        <Address />
        <ZipCode />
        <div>
          <button type="submit" disabled={submitDisabled}>
            Proceed
          </button>
        </div>
      </form>
    </section>
  );
};

const DeliverySelect: FC = () => {
  const value = useStore($deliveryType);

  return (
    <div>
      <label>
        Select delivery type:
        <select value={value ?? ''} onChange={(event) => deliveryTypeChanged(event.target.value)}>
          <option value="courier">Courier</option>
          <option value="postal">Postal</option>
          <option value="pickup">Pickup</option>
        </select>
      </label>
    </div>
  );
};

const PickupCentre: FC = () => {
  const opened = useStore($isPickup);
  const availableStores = useStore($availablePickupStores);
  const selectedStore = useStore($selectedPickupStore);
  if (!opened) return null;

  return (
    <div>
      <label>
        Select store to pickup from:
        <select value={selectedStore} onChange={(event) => pickupStoreChanged(event.target.value)}>
          {availableStores.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

const Address: FC = () => {
  const address = useStore($deliveryAddress);
  const required = useStore($requireAddress);
  if (!required) return null;

  return (
    <div>
      <label>
        Enter your full address:
        <input value={address} onChange={(event) => deliveryAddressChanged(event.target.value)} />
      </label>
    </div>
  );
};

const ZipCode: FC = () => {
  const zipcode = useStore($zipCode);
  const required = useStore($requireZipCode);
  if (!required) return null;

  return (
    <div>
      <label>
        Enter delivery zip code:
        <input value={zipcode} onChange={(event) => zipCodeChanged(event.target.value)} />
      </label>
    </div>
  );
};
