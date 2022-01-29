import { createStore, createEvent, attach, sample } from 'effector';
import * as api from '../../api';

const productsListFx = attach({ effect: api.productsListFx });

export const pageMounted = createEvent();

export const $products = createStore<api.Product[]>([]);
export const $loading = productsListFx.pending;
export const $error = createStore<Error | null>(null);

sample({
  clock: pageMounted,
  target: productsListFx,
});

$products.on(productsListFx.done, (_, { result }) => result);

$error.on(productsListFx.fail, (_, { error }) => error);

productsListFx.done.watch(console.info);
