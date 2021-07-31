import { createEffect } from "effector";
import faker from "faker";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  color: string;
}

const products: Product[] = Array.from({ length: 20 }, () => ({
  id: faker.datatype.uuid(),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(1, 60, 2),
  color: faker.commerce.color()
}));

export const productsListFx = createEffect<void, Product[]>(async () => {
  await wait(800);
  return products;
});

export const productGetByIdFx = createEffect<{ id: string }, Product | null>(
  async ({ id }) => {
    await wait(600);
    return products.find((prod) => prod.id === id) ?? null;
  }
);
