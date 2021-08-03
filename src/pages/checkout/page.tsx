/* eslint-disable @typescript-eslint/no-use-before-define */
import { FC, useEffect } from "react";
import { pageMounted } from "./model";
import {useList, useStore} from "effector-react";
import { $currentBusket, $address, $deliveryType } from "../../entities/busket";
import {ProductView} from "../../entities/product";

export const CheckoutPage: FC = () => {
  useEffect(() => pageMounted(), []);

    const products = useList($currentBusket, (product) => (
        <ProductView product={product} />
    ));

  return (
    <section>
      <h2>Checkout</h2>
      {products}
      <DeliveryType />
    </section>
  );
};

const DeliveryType = () => {
    const deliveryType = useStore($deliveryType);
    const address = useStore($address);

    return (
        <>
            <h4>Delivery type:</h4>
            <div>{deliveryType}</div>

            <h4>Delivery address:</h4>
            <div>{address}</div>
        </>
    )
}