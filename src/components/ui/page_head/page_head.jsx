import React from "react";
import styles from "./page_head.module.scss";
import { Image } from "react-bootstrap";

const PageHead = ({ head, caption }) => {
  return (
    <div className={styles.pageHead}>
      {/* <div className={styles.bg} /> */}

      <div className={styles.wrap}>
        <Image
          src="/images/page_head_bg.png"
          height={450}
          alt="page_head_bg.png"
          data-aos="fade-right"
        />
        <div>
          <h1 data-aos="fade-down">{head}</h1>
          <span data-aos="fade-down">{caption}</span>
        </div>
        <Image
          src="/images/page_head_flower2.png"
          height={450}
          alt="page_head_bg.png"
          data-aos="fade-left"
        />
      </div>
    </div>
  );
};

export default PageHead;
