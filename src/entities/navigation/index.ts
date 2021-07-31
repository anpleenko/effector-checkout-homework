import { createBrowserHistory } from "history";
import { createEffect } from "effector";

export const history = createBrowserHistory();

export const historyPushFx = createEffect((path: string) => {
  history.push(path);
});
