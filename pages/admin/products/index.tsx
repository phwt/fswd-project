import { useQuery, gql } from "@apollo/client";
import { Nav, Button } from "react-bootstrap";

const AdminProductsPage = () => {
  const { loading, error, data } = useQuery(
    gql`
      {
        products {
          _id
          name
          detail
          price
          stock
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

  const renderTableProducts = data.products.map((products) => {
    return (
      <tr>
        <th scope="row">{products._id}</th>
        <td>{products.name}</td>
        <td>{products.detail}</td>
        <td>{products.price}</td>
        <td>{products.stock}</td>
        <td>
          <Button variant="outline-dark">
            <Nav.Link href={"/admin/products/" + products._id}>View</Nav.Link>
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="content-admin">
      <h2>Admin Page</h2>
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
