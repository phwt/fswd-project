import { Product } from "@type/SchemaModel";

export const productTotal = (products: Product[]) => {
  if (products.length)
    return products
      .map((product) => product.price)
      .reduce((acc, cur) => acc + cur);
  return 0;
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN").format(price);
