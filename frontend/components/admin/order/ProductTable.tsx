import { useMemo } from "react";
import { discountPrice, formatPrice } from "@modules/Utils";
import { Table } from "react-bootstrap";

const ProductTable = ({ products, promotions }) => {
  const totalItems = useMemo(() => {
    return products.length + promotions.length;
  }, [products, promotions]);

  const totalWeight = useMemo(() => {
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
  }, [products, promotions]);

  const totalPrice = useMemo(() => {
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
  }, [products, promotions]);

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>SKU</th>
          <th>Product Name</th>
          <th>Weight</th>
          <th>Discount</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product._id}>
            <td>{index + 1}</td>
            <td>{product.sku}</td>
            <td>{product.name}</td>
            <td>{formatPrice(product.weight)} g</td>
            <td>-</td>
            <td>{formatPrice(product.price)} THB</td>
          </tr>
        ))}
        {promotions.map((promotion, index) => (
          <tr key={promotion._id}>
            <td>{index + 1 + products.length}</td>
            <td>{promotion.sku}</td>
            <td>{promotion.name}</td>
            <td>{formatPrice(promotion.weight)} g</td>
            <td>{promotion.discountPercentage}%</td>
            <td>
              {formatPrice(
                discountPrice(promotion.price, promotion.discountPercentage)
              )}{" "}
              THB
            </td>
          </tr>
        ))}
        <tr>
          <td />
          <td>
            <b>Total</b>
          </td>
          <td>{totalItems} items</td>
          <td>{totalWeight} g</td>
          <td>
            <b>Subtotal</b>
          </td>
          <td>{totalPrice} THB</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ProductTable;
