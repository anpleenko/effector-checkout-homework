import { createEvent, createStore } from 'effector';

import * as api from '../../api';

export const basketToggleClicked = createEvent<api.Product>();
export const $currentBasket = createStore<api.Product[]>([]);

$currentBasket.on(basketToggleClicked, (list, product) => {
  const alreadyInBasket = list.some((item) => item.id === product.id);
  if (alreadyInBasket) return list.filter((item) => item.id !== product.id);
  return [...list, product];
});
