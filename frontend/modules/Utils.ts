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

export const calculateTotalWeight = (
  products: Product[],
  promotions: Promotion[]
) => {
  let productWeight = 0,
    promotionWeight = 0;

  if (products.length)
    productWeight = products
      .map((product) => product.weight)
      .reduce((acc, cur) => acc + cur);

  if (promotions.length)
    promotionWeight = promotions
      .map((product) => product.weight)
      .reduce((acc, cur) => acc + cur);

  return productWeight + promotionWeight;
};

export const calculateTotalPrice = (
  products: Product[],
  promotions: Promotion[]
) => {
  let productPrice = 0,
    promotionPrice = 0;

  if (products.length)
    productPrice = products
      .map((product) => product.price)
      .reduce((acc, cur) => acc + cur);

  if (promotions.length)
    promotionPrice = promotions
      .map((product) =>
        discountPrice(product.price, product.discountPercentage)
      )
      .reduce((acc, cur) => acc + cur);

  return productPrice + promotionPrice;
};
