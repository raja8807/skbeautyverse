const { useState } = require("react");
const { default: Calendar } = require("react-calendar");
import { useSession } from "next-auth/react";
// import {formatLongDate} from "react-calendar/dist/cjs/shared/dateFormatter";
import BookPopup from "./book_popup/book_popup";
import styles from "./booking.module.scss";
import "react-calendar/dist/Calendar.css";
import AllBookings from "./all_bookings/all_bookings";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";

const BookingScreen = ({ customer, setCustomer, bookingData,packages }) => {
  const [value, setValue] = useState(new Date());
  const [showPopupFor, setShowPopupFor] = useState(null);
  const session = useSession();

  console.log(session);

  const alter = (slotsData) => {
    const newArr = [];
    slotsData.forEach((book) => {
      const isExistIndex = newArr.findIndex((e) => e.date === book.date);
      if (isExistIndex !== -1) {
        newArr[isExistIndex] = {
          date: book.date,
          slots: ["1", "2", "3"].map((slotId) => {
            const slot = slotsData.find(
              (sl) => sl.date === book.date && sl.slot === slotId
            );
            if (slot) {
              return {
                id: slotId,
                bookingData: slot.status === "Confirmed",
              };
            } else {
              return {
                id: slotId,
                bookingData: null,
              };
            }
          }),
        };
      } else {
        newArr.push({
          date: book.date,
          slots: ["1", "2", "3"].map((slotId) => {
            const slot = slotsData.find(
              (sl) => sl.date === book.date && sl.slot === slotId
            );
            if (slot) {
              return {
                id: slotId,
                bookingData: slot.status === "Confirmed",
              };
            } else {
              return {
                id: slotId,
                bookingData: null,
              };
            }
          }),
        });
      }
    });

    return newArr;
  };

  const [bookedDates, setBookedDates] = useState(alter(bookingData));

  const onChange = (x, y) => {
    setValue(x, y);

    let date;
    if (y.target.tagName.toLowerCase() === "abbr") {
      date = y.target.getAttribute("aria-label");
    } else {
      const e = y.target.querySelector("abbr");
      date = e.getAttribute("aria-label");
    }

    const bookedObj = bookedDates.find((d) => d.date === date);

    if (bookedObj) {
      if (bookedObj.slots.some((s) => !s.bookingData)) {
        setShowPopupFor(bookedObj);
      }
    } else {
      setShowPopupFor({
        date,
        slots: [
          {
            id: 1,
            bookingData: null,
          },
          {
            id: 2,
            bookingData: null,
          },
          {
            id: 3,
            bookingData: null,
          },
        ],
      });
    }
  };

  return (
    <>
      {showPopupFor && (
        <BookPopup
          showPopupFor={showPopupFor}
          setShowPopupFor={setShowPopupFor}
          customer={customer}
          setCustomer={setCustomer}
          setBookedDates={setBookedDates}
          alter={alter}
          packages={packages}
          //   setBookingSamples={setBookingSamples}
        />
      )}
      <CustomContainer>
        <div className={styles.booking}>
          <Calendar
            className={styles.calander}
            onChange={onChange}
            value={value}
            minDate={new Date()}
            maxDate={new Date(new Date().getTime() + 86400000 * (365 / 2))}
            minDetail="month"
            formatLongDate={(locale, date) => {
              return new Intl.DateTimeFormat("en-IN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(date);
            }}
          />
        </div>
        {session.data && (
          <CustomSection head="Manage Bookings">
            <AllBookings bookingData={bookingData} />
          </CustomSection>
        )}
      </CustomContainer>

      <style>
        {bookedDates
          .map((date) => {
            if (date.slots.every((d) => d.bookingData)) {
              return `button:has(abbr[aria-label="${date.date}"]){
                        background-color:red;
                        opacity:0.7;
                          }`;
            }
          })
          .join(" ")}
      </style>
    </>
  );
};

export default BookingScreen;
