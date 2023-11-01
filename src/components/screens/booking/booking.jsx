const { useState } = require("react");
const { default: Calendar } = require("react-calendar");
// import {formatLongDate} from "react-calendar/dist/cjs/shared/dateFormatter";
import BookPopup from "./book_popup/book_popup";
import styles from "./booking.module.scss";
import "react-calendar/dist/Calendar.css";

const BookingScreen = () => {
  const [value, setValue] = useState(new Date());
  const [showPopupFor, setShowPopupFor] = useState(null);

  //   const [bookedDates, setBookedDates] = useState([
  //     {
  //       id: "3828042",
  //       date: "November 16, 2023",
  //       slots: [
  //         {
  //           id: 1,
  //           booked: "user 1",
  //         },
  //         {
  //           id: 2,
  //           booked: "user 2",
  //         },
  //         {
  //           id: 3,
  //           booked: "user 3",
  //         },
  //       ],
  //     },
  //     {
  //       id: "jeooefooe",
  //       date: "November 17, 2023",
  //       slots: [
  //         {
  //           id: 1,
  //           booked: "user 4",
  //         },
  //         {
  //           id: 2,
  //           booked: null,
  //         },
  //         {
  //           id: 3,
  //           booked: null,
  //         },
  //       ],
  //     },
  //   ]);

  const bookedDates = [
    {
      id: "3828042",
      date: "November 16, 2023",
      slots: [
        {
          id: 1,
          booked: "user 1",
        },
        {
          id: 2,
          booked: "user 2",
        },
        {
          id: 3,
          booked: "user 3",
        },
      ],
    },
    {
      id: "jeooefooe",
      date: "November 17, 2023",
      slots: [
        {
          id: 1,
          booked: "user 4",
        },
        {
          id: 2,
          booked: null,
        },
        {
          id: 3,
          booked: null,
        },
      ],
    },
  ];

  const onChange = (x, y) => {
    setValue(x, y);
    let date;
    if (y.target.tagName.toLowerCase() === "abbr") {
      date = y.target.getAttribute("aria-label");
    } else {
      const e = y.target.querySelector("abbr");
      date = e.getAttribute("aria-label");
    }

    const bookedObj = bookedDates.find(
      (d) => new Date(d.date).toDateString() === new Date(date).toDateString()
    );

    // console.log(new Date(date));

    if (bookedObj) {
      if (bookedObj.slots.some((s) => !s.booked)) {
        setShowPopupFor(bookedObj);
      }
    } else {
      setShowPopupFor({
        date,
        slots: [
          {
            id: 1,
            booked: null,
          },
          {
            id: 2,
            booked: null,
          },
          {
            id: 3,
            booked: null,
          },
        ],
      });
    }
  };

  const months = ["October", "November", "December"];

  return (
    <>
      {showPopupFor && (
        <BookPopup
          showPopupFor={showPopupFor}
          setShowPopupFor={setShowPopupFor}
        />
      )}
      <div className={styles.booking}>
        <Calendar
          className={styles.calander}
          onChange={onChange}
          value={value}
          minDate={new Date()}
          maxDate={new Date(new Date().getTime() + 86400000 * (365 / 2))}
          minDetail="month"
          //   formatLongDate={(locale,date)=>formatLongDate(date,'dd MM YYYY')}
        />
      </div>

      <style>
        {bookedDates
          .map((date) => {
            // console.log();

            if (date.slots.every((d) => d.booked)) {
              const splittedDate = date.date.replace(",", "").split(" ");
              // console.log(splittedDate);
              const monthIndex = splittedDate.findIndex((e) =>
                months.includes(e)
              );
              const dateIndex = splittedDate.findIndex(
                (e) => parseInt(e) <= 31
              );
              const yearIndex = splittedDate.findIndex(
                (e) => parseInt(e) > 2000
              );

              const label = `${splittedDate[monthIndex]} ${splittedDate[dateIndex]}, ${splittedDate[yearIndex]}`;

              return `button:has(abbr[aria-label="${label}"]){
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
