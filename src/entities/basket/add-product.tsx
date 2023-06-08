import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useStoreMap } from 'effector-react';

import { Product } from '../../api';
import { quickBasketToggleClicked } from '../../pages/home/model';

import { $currentBasket, basketToggleClicked } from './model';

export const AddProductButton: FC<{ product: Product }> = ({ product }) => {
  const hasInBasket = useStoreMap({
    store: $currentBasket,
    keys: [product.id],
    fn: (basketProducts, [productId]) => basketProducts.some((exist) => exist.id === productId),
  });

  const text = hasInBasket ? 'Remove from basket' : 'Add to basket';

  return (
    <>
      <button type="button" onClick={() => basketToggleClicked(product)}>
        {text}
      </button>
      {!hasInBasket && (
        <Link to="/delivery">
          <button type="button" onClick={() => quickBasketToggleClicked(product)}>
            Buy now!
          </button>
        </Link>
      )}
    </>
  );
};
