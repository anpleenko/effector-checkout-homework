import { FC } from 'react';
import { Link } from 'react-router-dom';

import './processes/basket-checkout';

import { Pages } from './routes';

import './styles.css';

export const App: FC = () => {
  return (
    <div className="App">
      <h1>
        <Link to="/">Some Store</Link>
      </h1>
      <Pages />
    </div>
  );
};
