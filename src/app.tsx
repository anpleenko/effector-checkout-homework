import { Link } from 'react-router-dom';
import { Pages } from './routes';
import './processes/busket-checkout';
import './styles.css';
import { FC } from 'react';

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
