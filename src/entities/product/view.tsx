import { FC } from 'react';

import { Product } from '../../api';
import { AddProductButton } from '../basket';

export const ProductView: FC<{ product: Product }> = ({ product }) => (
  <>
    <h4>{product.title}</h4>
    <p>{product.description}</p>
    <p>
      <small>$</small>
      <b>{product.price}</b>
    </p>
    <AddProductButton product={product} />
  </>
);
