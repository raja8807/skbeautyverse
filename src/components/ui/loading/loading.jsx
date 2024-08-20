import React from "react";
import styles from "./loading.module.scss";
import { Image } from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <div className={styles.LoadingScreen}>
      <div className={styles.box}>
        <div className={styles.left}>
          <Image src="/images/logo/logo.png" width={70} alt="logo" />
        </div>

        <div className={styles.right}>
          <Image src="/images/logo/name.png" width={200} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
