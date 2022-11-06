import { createEffect } from 'effector';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const historyPushFx = createEffect((path: string) => {
  history.push(path);
});
