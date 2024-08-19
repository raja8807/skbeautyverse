import React from "react";
import styles from "./loading.module.scss";
import { Image } from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <div className={styles.LoadingScreen}>
      <div className={styles.left}>
        <Image src="/images/logo/logo.png" width={100} alt="logo" />
      </div>

      <div className={styles.right}>
        <Image src="/images/logo/name.png" width={250} alt="logo" />
      </div>
    </div>
  );
};

export default LoadingScreen;
