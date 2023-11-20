"use client";
import styles from "./book_popup.module.scss";
import { Image, Modal, Spinner } from "react-bootstrap";
import "firebase/compat/auth";
import { X } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import contactDetails from "@/components/constants/contact";

const BookPopup = (props) => {
  const {
    showPopupFor,
    setShowPopupFor,
    packages,
    currentBookingData,
    setcurrentBookingData,
  } = props;

  const [bookingData, setBookingData] = useState(currentBookingData || null);
  const [currentPage, setCurrentPage] = useState(currentBookingData ? 3 : 1);

  const [selected, setSelected] = useState(
    currentBookingData
      ? {
          id: parseInt(currentBookingData.slot),
          bookingData: currentBookingData,
        }
      : null
  );
  const [apiStatus, setApiStatus] = useState("idle");
  const [bookingValues, setBookingValues] = useState({
    package: null,
    category: null,
    location: "",
    name: "",
    phoneNumber: "",
    message: "",
  });

  // console.log(selected);

  const makeBooking = async () => {
    setApiStatus("loading");
    const newBookingId = Math.floor(1000 + Math.random() * 9000);
    try {
      const newBooking = {
        date: showPopupFor.date,
        slot: selected.id.toString(),
        status: "Payment Pending",
        packageId: bookingValues.package,
        categoryId: bookingValues.category,
        location: bookingValues.location,
        bookingId: newBookingId,
        customer: {
          name: bookingValues.name,
          phoneNumber: bookingValues.phoneNumber,
          customerId: "customer.uid",
          email: bookingValues.message,
        },
      };
      const res = await axios.post("/api/booking", newBooking);
      if (res) {
        setBookingData(res.data);
      }
      setApiStatus("success");
      setCurrentPage(3);
    } catch (err) {
      console.log(err);
      setApiStatus("error");
    }
  };

  const btnNames = ["", "Next", "Book", "Upload"];
  const [file, setFile] = useState(null);

  console.log(bookingData);

  const updateBooking = async () => {
    // screenshotUrl
    try {
      setApiStatus("loading");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gallery_image");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dm0mza7qt/image/upload",
        formData
      );
      const res = await axios.put("/api/booking", {
        ...bookingData,
        screenshotUrl: uploadRes.data.url,
        status: "Pending",
      });
      // console.log(res);
      setBookingData(res.data);
      setApiStatus("idle");
      const a = document.createElement("a");
      a.setAttribute(
        "href",
        `https://wa.me/918610030499?text=Hi, I've made advance payment for ${bookingData.packageId} - ${bookingData.categoryId} on ${bookingData.date} at slot ${bookingData.slot}`
      );
      a.setAttribute("target", "_black");
      a.click();
    } catch (err) {
      setApiStatus("error");
      console.log(err);
    }
  };

  const services = {
    Makeup: [...packages.map((p) => p.head), "ANY OTHER OCASSION"],
    Skin: [
      "Waxing",
      "Manicure",
      "Pedicure",
      "Cleanup",
      "Facial",
      "Skin detoxification treatment",
      "Anti aging treatment",
      "Anti acne treatment",
      "De tan treatment",
      "Advance Facial",
      "OTHER",
    ],
    Hair: [
      "Haircut",
      "Hairwash",
      "Hair spa",
      "Anti dandruff treatment",
      "Anti hairfall treatment",
      "Highlights",
      "Hair color treatments",
      "Straightening treatment",
      "Smoothing treatment",
      "Keratin treatment",
      "OTHER",
    ],
  };

  useEffect(() => {
    return () => setcurrentBookingData(null);
  }, []);

  console.log(file);

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
            {!bookingData && (
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
            )}
            {selected ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                {currentPage === 1 && (
                  <>
                    <select
                      onChange={(e) => {
                        const { value } = e.target;
                        setBookingValues((prev) => ({
                          ...prev,
                          category: value === "false" ? null : value,
                          package: null,
                        }));
                      }}
                    >
                      <option value={false}>Select Category</option>
                      <option value="Makeup">Makeup</option>
                      <option value="Skin">Skin</option>
                      <option value="Hair">Hair</option>
                    </select>

                    <select
                      onChange={(e) => {
                        const { value } = e.target;
                        setBookingValues((prev) => ({
                          ...prev,
                          package: value === "false" ? null : value,
                        }));
                      }}
                      disabled={!bookingValues.category}
                    >
                      <option value={false}>Select Service</option>

                      {services[bookingValues.category] &&
                        services[bookingValues.category].map((s) => (
                          <option key={s} value={s}>
                            {s && s.toUpperCase()}
                          </option>
                        ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Loaction"
                      disabled={
                        !bookingValues.package || !bookingValues.category
                      }
                      value={bookingValues.location}
                      onChange={(e) => {
                        const { value } = e.target;
                        setBookingValues((prev) => ({
                          ...prev,
                          location: value,
                        }));
                      }}
                    />
                  </>
                )}
                {currentPage === 2 && (
                  <>
                    <input
                      placeholder="Your Name"
                      value={bookingValues.name}
                      onChange={(e) => {
                        const { value } = e.target;
                        setBookingValues((prev) => ({
                          ...prev,
                          name: value,
                        }));
                      }}
                    />
                    <input
                      placeholder="Your Phone Number"
                      value={bookingValues.phoneNumber}
                      onChange={(e) => {
                        const { value } = e.target;
                        setBookingValues((prev) => ({
                          ...prev,
                          phoneNumber: value,
                        }));
                      }}
                    />
                    <textarea
                      placeholder="Your Message"
                      value={bookingValues.message}
                      onChange={(e) => {
                        const { value } = e.target;
                        setBookingValues((prev) => ({
                          ...prev,
                          message: value,
                        }));
                      }}
                    />
                  </>
                )}
                {currentPage === 3 && bookingData && (
                  <div className={styles.body}>
                    <p>
                      Hi {bookingData.customer.name}, Your booking on{" "}
                      {bookingData.date} for slot {bookingData.slot} has been
                      successful
                    </p>
                    <p>
                      Your booking Id : <span>{bookingData.bookingId}</span>
                    </p>
                    <p>(Use this booking id to track your booking status)</p>
                    <p>Current Status : {bookingData.status}</p>

                    {bookingData.status === "Payment Pending" && (
                      <div className={styles.img}>
                        <Image
                          src="/images/qr.png"
                          alt="qr"
                          fluid
                          height={100}
                          width={220}
                        />
                        <p>
                          Please scan this QR with your upi app to make advance
                          payment and upload payment
                          screenshot to confirm your booking or contact{" "}
                          {contactDetails.whatsapp} for any queries.
                        </p>
                        <div>
                          <input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setFile(file);
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {bookingData.status !== "Payment Pending" &&
                      bookingData.screenshotUrl && (
                        <div className={styles.img}>
                          <Image
                            src={bookingData.screenshotUrl}
                            fluid
                            width={100}
                            alt="screenshot"
                          />
                        </div>
                      )}
                  </div>
                )}
                <div className={styles.control}>
                  <input
                    type="button"
                    value="Back"
                    disabled={
                      currentPage === 1 ||
                      apiStatus === "loading" ||
                      currentPage === 3
                    }
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                    }}
                  />
                  <button
                    disabled={
                      bookingData
                        ? bookingData.status !== "Payment Pending" ||
                          !file ||
                          !file.type.includes("image")
                        : !bookingValues.package ||
                          !bookingValues.category ||
                          !bookingValues.location ||
                          apiStatus === "loading"
                    }
                    onClick={() => {
                      if (currentPage === 1) {
                        setCurrentPage(currentPage + 1);
                      } else if (currentPage === 2) {
                        makeBooking();
                      } else if (currentPage === 3) {
                        updateBooking();
                      }
                    }}
                  >
                    {apiStatus === "loading" ? (
                      <Spinner style={{ width: "20px", height: "20px" }} />
                    ) : (
                      btnNames[currentPage]
                    )}
                  </button>
                </div>
              </form>
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
