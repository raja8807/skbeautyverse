import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "./spinner_screen.module.scss";

const SpinnerScreen = () => {
  return (
    <div className={styles.SpinnerScreen}>
      <Spinner />
    </div>
  );
};

export default SpinnerScreen;
