import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { history } from './entities/navigation';
import { App } from './app';

const rootElement = document.querySelector('#root');
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  rootElement,
);
