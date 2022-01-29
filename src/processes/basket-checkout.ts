import { guard } from 'effector';
import { historyPushFx } from '../entities/navigation';
import * as basketPage from '../pages/basket/model';
import * as deliveryPage from '../pages/delivery/model';

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
