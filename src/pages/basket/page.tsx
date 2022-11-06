import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useList, useStore } from 'effector-react';

import { ProductView } from '../../entities/product';

import { $isEmpty, $products, $productsCount, $submitDisabled, $totalPrice, pageMounted, submitClicked } from './model';

export const BasketPage: FC = () => {
  useEffect(() => pageMounted(), []);

  const products = useList($products, (product) => <ProductView product={product} />);

  return (
    <section>
      <h2>Basket</h2>
      <Empty />
      {products}
      <Total />
    </section>
  );
};

const Empty: FC = () => {
  const isEmpty = useStore($isEmpty);
  if (isEmpty)
    return (
      <div style={{ textAlign: 'center' }}>
        Add products from <Link to="/">home page</Link> to your basket
      </div>
    );

  return null;
};

const Total: FC = () => {
  const isEmpty = useStore($isEmpty);
  const price = useStore($totalPrice);
  const count = useStore($productsCount);
  const disabled = useStore($submitDisabled);

  if (isEmpty) return null;

  return (
    <div data-block="notify">
      <div>
        The subtotal price of {count} products in basket: <small>$</small>
        <b>{price}</b>
      </div>
      <button type="button" disabled={disabled} onClick={() => submitClicked()}>
        Select delivery type
      </button>
    </div>
  );
};
