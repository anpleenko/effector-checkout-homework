import { FC, useEffect } from 'react';
import { useStore } from 'effector-react';

import { BasketShortWidget } from '../../entities/basket';
import { ProductView } from '../../entities/product';

import * as model from './model';

export const HomePage: FC = () => {
  useEffect(() => model.pageMounted(), []);

  return (
    <section>
      <BasketShortWidget />
      <h2>Products</h2>
      <Failure />
      <Loading />
      <Products />
    </section>
  );
};

const Loading: FC = () => {
  const loading = useStore(model.$loading);
  if (!loading) return null;
  return <div>Wait for a seconds, we're bringing your stuff here...</div>;
};

const Products: FC = () => {
  const products = useStore(model.$products);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <ProductView product={product} />
        </li>
      ))}
    </ul>
  );
};

const Failure: FC = () => {
  const failure = useStore(model.$error);
  if (!failure) return null;
  return (
    <>
      <code>Wow! Something broken</code>
      <small>{String(failure)}</small>
    </>
  );
};
