import React, { useState } from "react";
import styles from "./page_head.module.scss";
import { Image } from "react-bootstrap";

const PageHead = ({
  head,
  caption,
  img,
  btn,
  rightImg,
  variant = 1,
  bottom,
}) => {
  const [src, setSrc] = useState(img || "/images/page_head_bg.png");
  const [rightSrc, setRightSrc] = useState(
    rightImg || "/images/page_head_flower2.png"
  );

  return (
    <div className={`${styles.pageHead} ${styles[`v${variant}`]}`}>
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
        <div className={styles.text}>
          <h1 data-aos="fade-down" className={""}>
            {head && head.toUpperCase()}
          </h1>
          <p data-aos="fade-down" className={styles.caption}>
            {caption}
          </p>
          {bottom && <h2 className={styles.caption}>{bottom}</h2>}
          {btn}
        </div>
        <Image
          src={rightSrc}
          height={450}
          alt="page_head_bg.png"
          data-aos="fade-left"
          onError={() => {
            setRightSrc("/images/page_head_flower2.png");
          }}
        />
      </div>
    </div>
  );
};

export default PageHead;
