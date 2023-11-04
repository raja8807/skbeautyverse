// import { Table } from "react-bootstrap-icons";
import { Table } from "react-bootstrap";
import styles from "../cutomer_profile/cutomer_profile.module.scss";
import Booking from "./booking/booking";

const CustomerBookings = ({ customerBookings }) => {
  const bookings = customerBookings;

  return (
    <div className={styles.customerProfile}>
      <div className={styles.top}>
        <p>My Bookings</p>
        <br />
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Slot</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, i) => {
            return (
              <Booking key={`booking_${i}`} bookingData={booking} index={i} />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerBookings;
