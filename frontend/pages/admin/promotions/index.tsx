import { useQuery, gql } from "@apollo/client";
import { Nav, Button } from "react-bootstrap";
import { formatPrice } from "@modules/Utils";

const AdminPromotionsPage = () => {
  const { loading, error, data } = useQuery(
    gql`
      {
        promotions {
          _id
          name
          detail
          price
          stock
          discountPercentage
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

  const renderTablePromotions = data.promotions.map((promotion) => {
    return (
      <tr key={promotion.name.toString()}>
        <th scope="row">{promotion._id}</th>
        <td>{promotion.name}</td>
        <td>{promotion.detail}</td>
        <td>{formatPrice(promotion.price)}</td>
        <td>{promotion.stock}</td>
        <td>{promotion.discountPercentage}</td>
        <td>
          <Button variant="outline-dark">
            <Nav.Link href={"/admin/promotion/" + promotion._id}>View</Nav.Link>
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2>Promotions</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Detail</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Discount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderTablePromotions}</tbody>
      </table>
    </>
  );
};

export default AdminPromotionsPage;
