import { useStoreMap } from 'effector-react';
import { FC } from 'react';
import { Product } from '../../api';
import { $currentBusket, busketToggleClicked } from './model';

export const AddProductButton: FC<{ product: Product }> = ({ product }) => {
  const hasInBusket = useStoreMap({
    store: $currentBusket,
    keys: [product.id],
    fn: (busketProducts, [productId]) => busketProducts.some((exitst) => exitst.id === productId),
  });

  const text = hasInBusket ? 'Remove from busket' : 'Add to busket';

  return (
    <>
      <button type="button" onClick={() => busketToggleClicked(product)}>
        {text}
      </button>
      {/* TODO: {!hasInBusket && <button type="button">Buy now!</button>} */}
    </>
  );
};
