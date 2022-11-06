import { FC, useEffect } from 'react';

import { pageMounted } from './model';

export const CheckoutPage: FC = () => {
  useEffect(() => pageMounted(), []);

  return (
    <section>
      <h2>Checkout</h2>
    </section>
  );
};
