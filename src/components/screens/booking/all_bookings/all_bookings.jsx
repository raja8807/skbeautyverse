const { Table, Modal, Spinner, Image } = require("react-bootstrap");
import { useEffect, useState } from "react";
import styles from "./all_booking.module.scss";
import { X } from "react-bootstrap-icons";
import axios from "axios";

const AllBookings = ({ bookingData: data = [] }) => {
  const [bookingData, setBookingData] = useState(data);

  const [showPopupFor, setShowPopupFor] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateBooking = async () => {
    setLoading(true);
    const messages = {
      Confirmed: `Hi ${showPopupFor.customer.name}, We are happy to inform you that we have confirmed your booking on ${showPopupFor.date}. Thank You.`,
      Cancelled: `Hi ${showPopupFor.customer.name}, We are sorry to inform you that we have cancelled your booking on ${showPopupFor.date}. Thank You.`,
      Pending: `Hi ${showPopupFor.customer.name}, We are sorry to inform you that we have marked your booking for ${showPopupFor.date} as pending. We will get back soon as possible. Thank You.`,
    };
    try {
      const res = await axios.put("/api/booking", { ...showPopupFor, status });
      setLoading(false);
      console.log(showPopupFor.customer);
      const a = document.createElement("a");
      a.setAttribute(
        "href",
        `https://wa.me/91${showPopupFor.customer.phoneNumber}?text=${messages[status]}`
      );
      a.setAttribute("target", "_black");
      a.click();
      setBookingData((prev) => {
        const b = [...prev];
        b[showPopupFor.index] = res.data;
        return b;
      });
      setShowPopupFor(null);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
    setStatus(showPopupFor?.status);
  }, [showPopupFor]);

  console.log(showPopupFor);

  return (
    <>
      <Modal
        show={showPopupFor}
        onHide={() => {
          setShowPopupFor(null);
        }}
        centered
        className={styles.popup}
        animation
      >
        <div className={styles.box}>
          <div className={styles.top}>
            {showPopupFor?.date}
            <X
              className={styles.close}
              onClick={() => {
                setShowPopupFor(null);
              }}
            />
          </div>
          <div className={styles.bottom}>
            {/* <div> */}
            <p>Booking Id &nbsp;&nbsp;: {showPopupFor?.bookingId}</p>
            <p>Name &nbsp;&nbsp;&nbsp;&nbsp;: {showPopupFor?.customer.name}</p>
            <p>
              Phone &nbsp;&nbsp;&nbsp;&nbsp;:{" "}
              {showPopupFor?.customer.phoneNumber}
            </p>
            <p>
              Slot&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
              {showPopupFor?.slot}
            </p>
            <p>Location&nbsp;&nbsp;: {showPopupFor?.location}</p>
            <p>Package&nbsp;&nbsp;&nbsp;: {showPopupFor?.packageId}</p>
            <p>Category&nbsp;&nbsp;: {showPopupFor?.categoryId}</p>
            <p>Message&nbsp;&nbsp;: {showPopupFor?.customer?.email}</p>
            {showPopupFor?.screenshotUrl && (
              <Image
                alt="screenshot"
                src={showPopupFor?.screenshotUrl}
                width={100}
              />
            )}
            <div className={styles.status}>
              <p>Status</p>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancel</option>
              </select>
            </div>
            <div className={styles.status}>
              <button
                onClick={() => {
                  setShowPopupFor(null);
                }}
              >
                Close
              </button>

              <button
                disabled={status === showPopupFor?.status || loading}
                onClick={updateBooking}
              >
                {loading ? <Spinner /> : "Update"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Slot</th>
            <th>Customer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking, i) => {
            return (
              <tr
                key={`boo_${i}`}
                className={styles.booking}
                onClick={() => {
                  setShowPopupFor({ ...booking, index: i });
                }}
              >
                <td>{booking.bookingId}</td>
                <td>{booking.date}</td>
                <td>{booking.slot}</td>
                <td>{booking.customer.name}</td>
                <td className={styles[booking.status]}>{booking.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AllBookings;
