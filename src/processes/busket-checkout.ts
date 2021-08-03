import { guard } from "effector";
import { historyPushFx } from "../entities/navigation";
import * as busketPage from "../pages/busket/model";
import * as deliveryPage from "../pages/delivery/model";
import * as checkoutPage from "../pages/checkout/model";

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

guard({
  clock: deliveryPage.formSubmitted,
  filter: deliveryPage.$submitDisabled.map((disabled) => !disabled),
  target: historyPushFx.prepend(() => "/checkout")
});

guard({
  clock: checkoutPage.pageMounted,
  filter: busketPage.$busketCheckedUp.map((checked) => !checked),
  target: historyPushFx.prepend(() => "/")
});