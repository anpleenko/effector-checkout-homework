import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { App } from './app';
import { history } from './entities/navigation';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  rootElement,
);
