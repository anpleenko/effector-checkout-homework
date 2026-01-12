import { FC } from 'react';
import { useStoreMap } from 'effector-react';

import { Product } from '../../api';
import { quickBasketToggleClicked } from '../../pages/home/model';

import { $basket, basketToggleClicked } from './model';

export const AddProductButton: FC<{ product: Product }> = ({ product }) => {
  const hasInBasket = useStoreMap({
    store: $basket,
    keys: [product.id],
    fn: (currentBaskets, [productId]) => currentBaskets.some((exist) => exist.id === productId),
  });

  const text = hasInBasket ? 'Remove from basket' : 'Add to basket';

  return (
    <>
      <button type="button" onClick={() => basketToggleClicked(product)}>
        {text}
      </button>
      {!hasInBasket && (
        <button type="button" onClick={() => quickBasketToggleClicked(product)}>
          Buy now!
        </button>
      )}
    </>
  );
};
