import { FC } from 'react';
import { useStoreMap } from 'effector-react';

import { Product } from '../../api';

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
      {/* TODO: {!hasInBasket && <button type="button">Buy now!</button>} */}
    </>
  );
};
