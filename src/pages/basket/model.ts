import { createEvent, createStore } from 'effector';

import { $basket } from '../../entities/basket';
import { quickBasketToggleClicked } from '../home/model';

export const pageMounted = createEvent();
export const submitClicked = createEvent();

export const $products = $basket;
export const $productsCount = $products.map((list) => list.length);
export const $isEmpty = $productsCount.map((count) => count === 0);
export const $totalPrice = $products
  .map((list) => list.reduce((total, product) => total + Number.parseFloat(product.price), 0))
  .map((price) => price.toFixed(2));
export const $submitDisabled = $isEmpty;

export const $basketCheckedUp = createStore(false);

$basketCheckedUp.on(submitClicked, () => true);
$basketCheckedUp.reset($products);

$basketCheckedUp.on(quickBasketToggleClicked, () => true);
