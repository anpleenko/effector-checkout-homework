import { createEvent } from 'effector';

import { $currentBasket } from '../../entities/basket';

export const pageMounted = createEvent();
export const $products = $currentBasket;
