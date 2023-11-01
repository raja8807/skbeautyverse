const { useState } = require("react");
const { default: Calendar } = require("react-calendar");
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
  ]

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

    alert(bookedObj)

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
        />
      </div>

      <style>
        {bookedDates
          .map((date) => {
            if (date.slots.every((d) => d.booked)) {
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
