import { createStore, createEvent } from "effector";
import * as api from "../../api";

export const busketToggleClicked = createEvent<api.Product>();
export const $currentBusket = createStore<api.Product[]>([]);

$currentBusket.on(busketToggleClicked, (list, product) => {
  const alreadyInBusket = list.some((item) => item.id === product.id);
  if (alreadyInBusket) return list.filter((item) => item.id !== product.id);
  return [...list, product];
});
