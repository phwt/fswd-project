import { Product, Promotion } from "@type/SchemaModel";

export const productTotal = (products: Product[]) => {
  if (products.length)
    return products
      .map((product) => product.price)
      .reduce((acc, cur) => acc + cur);
  return 0;
};

export const promotionTotal = (promotions: Promotion[]) => {
  if (promotions.length)
    return promotions
      .map((product) =>
        discountPrice(product.price, product.discountPercentage)
      )
      .reduce((acc, cur) => acc + cur);
  return 0;
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN").format(price);

export const discountPrice = (price: number, discountPercentage: number) =>
  price - price * (discountPercentage / 100);
