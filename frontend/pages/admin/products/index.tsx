import { useQuery, gql } from "@apollo/client";
import { Nav, Button } from "react-bootstrap";
import { formatPrice } from "@modules/Utils";

const AdminProductsPage = () => {
  const { loading, error, data } = useQuery(
    gql`
      {
        products {
          name
          detail
          price
          stock
          sku
        }
      }
    `
  );
  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>Error...</div>;
  }

  const renderTableProducts = data.products.map((products,index) => {
    return (
      <tr key={products.name.toString()}>
        <th>{index+1}</th>
        <td>{products.name}</td>
        <td>{products.detail}</td>
        <td>{formatPrice(products.price)}</td>
        <td>{products.stock}</td>
        <td>
          <Button variant="outline-dark">
            <Nav.Link href={"/admin/product/" + products._id}>View</Nav.Link>
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Products</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Detail</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderTableProducts}</tbody>
      </table>
    </div>
  );
};

export default AdminProductsPage;
