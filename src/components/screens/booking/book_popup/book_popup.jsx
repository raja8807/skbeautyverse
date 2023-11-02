"use client";
import styles from "./book_popup.module.scss";
import {  Modal } from "react-bootstrap";
import "firebase/compat/auth";
import { X } from "react-bootstrap-icons";
import {  useState } from "react";
import categories from "@/components/constants/categories";

const BookPopup = (props) => {
  const { showPopupFor, setShowPopupFor } = props;

  const [selected, setSelected] = useState(null);
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
                    className={`${styles.slot} ${slot.booked && styles.booked}
                ${selected && selected.id === slot.id && styles.selected}
                `}
                    onClick={() => {
                      if (!slot.booked) {
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
                    <small>{slot.booked ? "Booked" : "Available"}</small>
                  </div>
                );
              })}
            </div>
            {selected ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <select >
                    <option value={null} >Select Package</option>
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
                <select >
                    <option value={null} >Select Category</option>
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
                <input placeholder="Name" />
                <input placeholder="Phone" />
                <input placeholder="Location" />
                <input type="submit" value={`Book Slot ${selected.id}`} />
              </form>
            ) : (
              <p className={styles.message}>Please select a slot</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BookPopup;
