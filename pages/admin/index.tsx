import { useQuery, gql } from "@apollo/client";

const AdminPage = () => {
  const { loading, error, data } = useQuery(
    gql`
      {
        products {
          _id
        }
        users {
          _id
        }
        promotions {
          _id
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

  return (
    <div className="content-admin">
      <h2>Admin Page</h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">สินค้าคงคลัง</th>
            <td>{data.products.length}</td>
          </tr>
          <tr>
            <th scope="row">ผู้ใช้งานเว็บไซต์</th>
            <td>{data.users.length}</td>
          </tr>
          <tr>
            <th scope="row">โปรโมชั่นในปัจจุบัน</th>
            <td>{data.promotions.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
