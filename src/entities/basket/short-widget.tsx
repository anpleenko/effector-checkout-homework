import { useStore } from 'effector-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { $currentBasket } from './model';

const $countProducts = $currentBasket.map((list) => list.length);

export const BasketShortWidget: FC = () => {
  const count = useStore($countProducts);

  if (count === 0) return null;

  return (
    <div data-block="notify">
      <span>You have {count} products in basket</span>
      &nbsp;
      <Link to="/basket">Review</Link>
    </div>
  );
};
