import { useStore } from 'effector-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { $currentBusket } from './model';

const $countProducts = $currentBusket.map((list) => list.length);

export const BusketShortWidget: FC = () => {
  const count = useStore($countProducts);

  if (count === 0) return null;

  return (
    <div data-block="notify">
      <span>You have {count} products in busket</span>
      &nbsp;
      <Link to="/busket">Review</Link>
    </div>
  );
};
