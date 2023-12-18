import CustomerBookings from "./customer_bookings/customer_bookings";
import CustomerProfile from "./cutomer_profile/cutomer_profile";

const { Row, Col } = require("react-bootstrap");

const CustomerPortal = ({ customer, user }) => {
  //   console.log(customer);

  return (
    <Row>
      <Col md={4}>
        <CustomerProfile customer={customer} user={user} />
      </Col>
      <Col>
        {/* <CustomerBookings customerBookings={customerBookings}/> */}
      </Col>
    </Row>
  );
};

export default CustomerPortal;
