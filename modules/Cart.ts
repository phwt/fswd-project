const storageKey = (type: "PRODUCT" | "PROMOTION") =>
  type === "PRODUCT" ? "cartProduct" : "cartPromotion";

export const getCartItems = (type: "PRODUCT" | "PROMOTION" = "PRODUCT") => {
  if (process.browser) {
    const key = storageKey(type);
    const items = JSON.parse(localStorage.getItem(key));
    if (items) return items;
    return [];
  }
  return [];
};

export const addCartItem = (
  id: string,
  type: "PRODUCT" | "PROMOTION" = "PRODUCT"
) => {
  if (process.browser) {
    const key = storageKey(type);
    let products = getCartItems(type);
    products = [...products, id];
    localStorage.setItem(key, JSON.stringify(products));

    return products;
  }
  return [];
};

export const removeCartItem = (
  id: string,
  type: "PRODUCT" | "PROMOTION" = "PRODUCT"
) => {
  if (process.browser) {
    const key = storageKey(type);
    let products = getCartItems(type);
    products = products.filter((product) => product !== id);
    localStorage.setItem(key, JSON.stringify(products));

    return products;
  }
  return [];
};
