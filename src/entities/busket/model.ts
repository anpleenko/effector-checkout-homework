import { createStore, createEvent } from "effector";
import * as api from "../../api";

export type BusketSubmit = {
  products: api.Product[];
  deliveryType: Delivery;
  address: string;
};

export type Delivery = "courier" | "postal" | "pickup";

export const busketToggleClicked = createEvent<api.Product>();
export const $currentBusket = createStore<api.Product[]>([]);
export const $deliveryType = createStore("");
export const $address = createStore("");
export const deliverySubmit = createEvent<BusketSubmit>();

$currentBusket.on(busketToggleClicked, (list, product) => {
  const alreadyInBusket = list.some((item) => item.id === product.id);
  if (alreadyInBusket) return list.filter((item) => item.id !== product.id);
  return [...list, product];
});

$deliveryType.on(deliverySubmit, (_, {deliveryType}) => deliveryType)
$address.on(deliverySubmit, (_, {address}) => address)