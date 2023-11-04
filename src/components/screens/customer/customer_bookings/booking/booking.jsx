// import { Trash } from "react-bootstrap-icons";
import styles from "./booking.module.scss";

const Booking = ({ bookingData, index }) => {
  return (
    <>
      <tr className={styles.booking}>
        <td>{index + 1}</td>
        <td>{bookingData.date}</td>
        <td>{bookingData.slot}</td>
        <td className={styles[bookingData.status]}>{bookingData.status}</td>
        {/* <td>
          <span>Cancel</span>
        </td> */}
      </tr>
    </>
  );
};

export default Booking;
