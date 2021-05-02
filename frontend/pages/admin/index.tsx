import { gql } from "@apollo/client";
import { Container, Row, Col, Card } from "react-bootstrap";
import { serverApollo } from "@modules/Apollo";

export const getServerSideProps = async (context) => {
  const apolloClient = serverApollo(context);

  const { data } = await apolloClient.query({
    query: gql`
      {
        products {
          name
          detail
          price
          stock
        }
        users {
          _id
        }
        promotions {
          _id
        }
        orders(filter: { status: PAID }) {
          products {
            price
          }
        }
        FilterOrder: orders(limit: 5, sort: _ID_DESC) {
          _id
          products {
            name
          }
          status
          timestamp
          orderedBy {
            username
          }
        }
      }
    `,
  });

  return {
    props: { data },
  };
};

const AdminPage = ({ data }) => {
  var profit = 0;
  const product = data.products;

  const sortStock = product.slice().sort((a, b) => {
    return parseFloat(a.stock) - parseFloat(b.stock);
  });
  console.log(sortStock);

  const totalPrice = data.orders.map((order) => {
    const total = order.products.map((product) => {
      profit += product.price;
    });
  });

  const renderTableOrder = data.FilterOrder.map((order, index) => {
    var dateString = new Date(order.timestamp);
    return (
      <tr key={order._id.toString()}>
        <th>{index + 1}</th>
        <th>{order.orderedBy.username}</th>
        <td>{order.status}</td>
        <td>{dateString.toLocaleDateString()}</td>
      </tr>
    );
  });

  const renderTableProduct = sortStock.slice(0, 5).map((item, index) => {
    return (
      <tr>
        <th>{index + 1}</th>
        <th>{item.name}</th>
        <td>{item.detail}</td>
        <td>{item.price}</td>
        <td>{item.stock}</td>
      </tr>
    );
  });

  return (
    <>
      <h2>Dashboard</h2>
      <Container>
        <Row className="mt-5">
          <Col md={2}>
            <Card style={{ height: "20vh", width: "12vw" }}>
              <Card.Body>
                <Card.Title>สินค้าทั้งหมด</Card.Title>
                <Card.Text>
                  <h1>{data.products.length}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={{ span: 2, offset: 1 }}>
            <Card style={{ height: "20vh", width: "12vw" }}>
              <Card.Body>
                <Card.Title>โปรโมชั่นทั้งหมด</Card.Title>
                <Card.Text>
                  <h1>{data.promotions.length}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={{ span: 2, offset: 1 }}>
            <Card style={{ height: "20vh", width: "12vw" }}>
              <Card.Body>
                <Card.Title>ยอดขาย</Card.Title>
                <Card.Text>
                  <h1>{data.orders.length}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={{ span: 2, offset: 1 }}>
            <Card style={{ height: "20vh", width: "12vw" }}>
              <Card.Body>
                <Card.Title>รายรับ</Card.Title>
                <Card.Text>
                  <h1>{profit}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h3>รายการสั่งซื้อล่าสุด</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>ลำดับรายการ</th>
                  <th>ชื่อลูกค้า</th>
                  <th>สถานะ</th>
                  <th>วันที่</th>
                </tr>
              </thead>
              <tbody>{renderTableOrder}</tbody>
            </table>
          </Col>
          <Col>
            <h3>สินค้าขาดสต็อค</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>ลำดับสินค้า</th>
                  <th>ชื่อสินค้า</th>
                  <th>รายละเอียด</th>
                  <th>ราคา</th>
                  <th>จำนวนคงเหลือ</th>
                </tr>
              </thead>
              <tbody>{renderTableProduct}</tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPage;
