import { attach, createEvent, createStore, sample } from 'effector';

import * as api from '../../api';
import { $currentBasket } from '../../entities/basket';
import { historyPushFx } from '../../entities/navigation';

const productsListFx = attach({ effect: api.productsListFx });

export const pageMounted = createEvent();

export const $quickBasket = createStore<api.Product[]>([]);
export const quickBasketToggleClicked = createEvent<api.Product>();

export const $products = createStore<api.Product[]>([]);
export const $loading = productsListFx.pending;
export const $error = createStore<Error | null>(null);

sample({
  clock: pageMounted,
  target: productsListFx,
});

sample({
  clock: quickBasketToggleClicked,
  target: historyPushFx.prepend(() => '/delivery'),
});

$quickBasket.on(quickBasketToggleClicked, (_list, product) => {
  return [product];
});

$products.on(productsListFx.done, (_, { result }) => result);

$error.on(productsListFx.fail, (_, { error }) => error);

productsListFx.done.watch(console.info);
