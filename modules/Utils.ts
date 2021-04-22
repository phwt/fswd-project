import { Product } from "@type/SchemaModel";

export const productTotal = (products: Product[]) => {
  if (products.length)
    return products
      .map((product) => product.price)
      .reduce((acc, cur) => acc + cur);
  return 0;
};
