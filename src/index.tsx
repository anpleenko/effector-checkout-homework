import { createRoot } from 'react-dom/client';
import { Router } from 'react-router-dom';

import { history } from './entities/navigation';
import { App } from './app';

const container = document.querySelector('#root');

if (container) {
  const root = createRoot(container);

  root.render(
    <Router history={history}>
      <App />
    </Router>,
  );
}
