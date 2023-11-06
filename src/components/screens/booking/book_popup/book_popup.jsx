"use client";
import styles from "./book_popup.module.scss";
import { Modal, Spinner } from "react-bootstrap";
import "firebase/compat/auth";
import { X } from "react-bootstrap-icons";
import { useState } from "react";
import categories from "@/components/constants/categories";
import CustomerLogin from "../../admin/login/customer_login/customer_login";
import axios from "axios";
import { useRouter } from "next/router";

const BookPopup = (props) => {
  const { showPopupFor, setShowPopupFor, customer, setCustomer, packages } =
    props;

  const [selected, setSelected] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [apiStatus, setApiStatus] = useState("idle");
  const [bookingValues, setBookingValues] = useState({
    package: null,
    category: null,
    location: "",
  });
  const router = useRouter();

  const makeBooking = async () => {
    setApiStatus("loading");
    try {
      const newBooking = {
        date: showPopupFor.date,
        slot: selected.id.toString(),
        status: "Pending",
        packageId: bookingValues.package,
        categoryId: bookingValues.category,
        location: bookingValues.location,
        customer: {
          name: customer?.displayName,
          phoneNumber: customer.photoURL,
          customerId: customer.uid,
          email: customer.email,
        },
      };
      await axios.post("/api/booking", newBooking);
      router.replace("/account/customer");
      setApiStatus("success");
    } catch (err) {
      console.log(err);
      setApiStatus("error");
    }
  };

  return (
    <Modal
      show={showPopupFor}
      onHide={() => {
        setShowPopupFor(null);
      }}
      centered
      className={styles.popup}
      animation
    >
      {showPopupFor && (
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
            <div className={styles.slots}>
              {showPopupFor.slots.map((slot) => {
                return (
                  <div
                    key={`slot_${slot.id}`}
                    className={`${styles.slot} ${
                      slot.bookingData && styles.booked
                    }
                ${selected && selected.id === slot.id && styles.selected}
                `}
                    onClick={() => {
                      if (!slot.bookingData) {
                        if (selected) {
                          if (selected.id === slot.id) {
                            setSelected(null);
                          } else {
                            setSelected(slot);
                          }
                        } else {
                          setSelected(slot);
                        }
                      }
                    }}
                  >
                    <p>Slot {slot.id}</p>
                    <small>{slot.bookingData ? "Booked" : "Available"}</small>
                  </div>
                );
              })}
            </div>
            {selected ? (
              <>
                {showLogin ? (
                  <div>
                    <CustomerLogin
                      customer={customer}
                      setCustomer={setCustomer}
                    />
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <select
                      value={bookingValues.package}
                      onChange={(e) => {
                        const { value } = e.target;
                        setBookingValues((prev) => ({
                          ...prev,
                          package: value,
                        }));
                      }}
                    >
                      <option value={null}>Select Package</option>
                      {packages.map((c, i) => {
                        if (i !== 3) {
                          return (
                            <option key={c.id} value={c.head}>
                              {c.head} - Rs.{c.price}
                            </option>
                          );
                        }
                      })}
                    </select>
                    <select
                      value={bookingValues.category}
                      onChange={(e) => {
                        const { value } = e.target;
                        setBookingValues((prev) => ({
                          ...prev,
                          category: value,
                        }));
                      }}
                    >
                      <option value={null}>Select Category</option>
                      {categories.map((c, i) => {
                        if (i !== 3) {
                          return (
                            <option key={c.id} value={c.name}>
                              {c.name}
                            </option>
                          );
                        }
                      })}
                    </select>

                    <input
                      placeholder="Location"
                      value={bookingValues.location}
                      onChange={(e) => {
                        const { value } = e.target;
                        setBookingValues((prev) => ({
                          ...prev,
                          location: value,
                        }));
                      }}
                    />
                    {apiStatus === "idle" && (
                      <input
                        type="submit"
                        disabled={
                          !bookingValues.package ||
                          !bookingValues.category ||
                          !bookingValues.location
                        }
                        onClick={async () => {
                          if (
                            !customer ||
                            !customer?.displayName ||
                            !customer?.photoURL
                          ) {
                            setShowLogin(true);
                          } else {
                            await makeBooking();
                            setShowPopupFor;
                          }
                        }}
                        value={`Book Slot ${selected.id}`}
                      />
                    )}
                  </form>
                )}
              </>
            ) : (
              <p className={styles.message}>Please select a slot </p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BookPopup;
