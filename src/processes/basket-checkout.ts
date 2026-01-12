import { guard } from 'effector';

import { historyPushFx } from '../entities/navigation';
import * as basketPage from '../pages/basket/model';
import * as checkoutPage from '../pages/checkout/model';
import * as deliveryPage from '../pages/delivery/model';
import * as homePage from '../pages/home/model';

guard({
  clock: homePage.quickBasketToggleClicked,
  filter: basketPage.$basketCheckedUp,
  target: historyPushFx.prepend(() => '/delivery'),
});

guard({
  clock: basketPage.submitClicked,
  filter: basketPage.$basketCheckedUp,
  target: historyPushFx.prepend(() => '/delivery'),
});

guard({
  clock: deliveryPage.pageMounted,
  filter: basketPage.$basketCheckedUp.map((checked) => !checked),
  target: historyPushFx.prepend(() => '/'),
});

guard({
  clock: deliveryPage.formSubmitted,
  filter: basketPage.$basketCheckedUp,
  target: historyPushFx.prepend(() => '/checkout'),
});

guard({
  clock: checkoutPage.pageMounted,
  filter: basketPage.$basketCheckedUp.map((checked) => !checked),
  target: historyPushFx.prepend(() => '/'),
});
