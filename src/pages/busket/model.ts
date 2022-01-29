import { createEvent, createStore } from 'effector';
import { $currentBusket } from '../../entities/busket';

export const pageMounted = createEvent();
export const submitClicked = createEvent();

export const $products = $currentBusket;
export const $productsCount = $products.map((list) => list.length);
export const $isEmpty = $productsCount.map((count) => count === 0);
export const $totalPrice = $products
  .map((list) => list.reduce((total, product) => total + Number.parseFloat(product.price), 0))
  .map((price) => price.toFixed(2));
export const $submitDisabled = $isEmpty;

export const $busketCheckedUp = createStore(false);

$busketCheckedUp.on(submitClicked, () => true);
$busketCheckedUp.reset($products);
