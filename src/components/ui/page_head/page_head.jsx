import React, { useState } from "react";
import styles from "./page_head.module.scss";
import { Image } from "react-bootstrap";

const PageHead = ({ head, caption, img, btn }) => {
  const [src, setSrc] = useState(img || "/images/page_head_bg.png");

  return (
    <div className={styles.pageHead}>
      <div className={styles.wrap}>
        <Image
          src={src}
          height={450}
          alt={src}
          data-aos="fade-right"
          onError={() => {
            setSrc("/images/page_head_bg.png");
          }}
        />
        <div>
          <h1 data-aos="fade-down">{head}</h1>
          <span data-aos="fade-down">{caption}</span>
          {btn}
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
