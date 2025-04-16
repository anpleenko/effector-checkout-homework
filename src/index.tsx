import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { history } from './entities/navigation';
import { App } from './app';

const container = document.querySelector('#root');

if (container) {
  ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    container,
  );
}
