import { createEvent } from 'effector';

import { $currentBasket } from '../delivery/model';

export const pageMounted = createEvent();
export const $products = $currentBasket;
