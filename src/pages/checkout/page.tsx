import { FC, useEffect } from 'react';
import { useList, useStore } from 'effector-react';

import { ProductView } from '../../entities/product';
import { $deliveryAddress, $deliveryType, $isPickup, $selectedPickupStore, $zipCode } from '../delivery/model';

import { $products, pageMounted } from './model';

export const CheckoutPage: FC = () => {
  useEffect(() => pageMounted(), []);
  const deliveryType = useStore($deliveryType);
  const deliveryAddress = useStore($deliveryAddress);
  const products = useList($products, (product) => <ProductView product={product} />);
  const isPickup = useStore($isPickup);
  const zipCode = useStore($zipCode);
  const selectedPickupStore = useStore($selectedPickupStore);
  return (
    <section>
      <h2>Checkout</h2>
      <p>Delivery type: {deliveryType}</p>
      {!isPickup && (
        <>
          <p>Address: {deliveryAddress}</p>
          <p>ZipCode: {zipCode}</p>
        </>
      )}
      {isPickup && <p>Warehouse: {selectedPickupStore}</p>}
      <p>Products: {products}</p>
    </section>
  );
};
