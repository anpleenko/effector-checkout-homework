import { guard } from "effector";
import { historyPushFx } from "../entities/navigation";
import * as busketPage from "../pages/busket/model";
import * as deliveryPage from "../pages/delivery/model";

guard({
  clock: busketPage.submitClicked,
  filter: busketPage.$busketCheckedUp,
  target: historyPushFx.prepend(() => "/delivery")
});

guard({
  clock: deliveryPage.pageMounted,
  filter: busketPage.$busketCheckedUp.map((checked) => !checked),
  target: historyPushFx.prepend(() => "/")
});
