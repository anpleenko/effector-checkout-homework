import { createBrowserHistory } from 'history';
import { createEffect } from 'effector';

export const history = createBrowserHistory({
  basename: '/effector-checkout-homework',
});

export const historyPushFx = createEffect((path: string) => {
  history.push(path);
});
