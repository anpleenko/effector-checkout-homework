import { createEvent, createStore } from 'effector';

import * as api from '../../api';

export const basketToggleClicked = createEvent<api.Product>();
export const $basket = createStore<api.Product[]>([]);

$basket.on(basketToggleClicked, (list, product) => {
  const alreadyInBasket = list.some((item) => item.id === product.id);
  if (alreadyInBasket) return list.filter((item) => item.id !== product.id);
  return [...list, product];
});
