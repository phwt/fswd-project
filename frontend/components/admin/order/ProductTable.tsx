import { useMemo } from "react";
import {
  calculateTotalPrice,
  calculateTotalWeight,
  discountPrice,
  formatNumber,
} from "@modules/Utils";
import { Table } from "react-bootstrap";

const ProductTable = ({ products, promotions }) => {
  const totalItems = useMemo(() => {
    return products.length + promotions.length;
  }, [products, promotions]);

  const totalWeight = useMemo(() => {
    return calculateTotalWeight(products, promotions);
  }, [products, promotions]);

  const totalPrice = useMemo(() => {
    return calculateTotalPrice(products, promotions);
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
            <td>{formatNumber(product.weight)} g</td>
            <td>-</td>
            <td>{formatNumber(product.price)} THB</td>
          </tr>
        ))}
        {promotions.map((promotion, index) => (
          <tr key={promotion._id}>
            <td>{index + 1 + products.length}</td>
            <td>{promotion.sku}</td>
            <td>{promotion.name}</td>
            <td>{formatNumber(promotion.weight)} g</td>
            <td>{promotion.discountPercentage}%</td>
            <td>
              {formatNumber(
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
          <td>{formatNumber(totalPrice)} THB</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ProductTable;
