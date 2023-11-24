import { useRef, useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { Image } from "react-bootstrap";

export default function Card({ id, refCard }) {
  return (
    <div className="bubble" ref={refCard}>
      <div className={`${styles.card} m-2 pt-2`}>
        {
          <Image
            height={350}
            src={`/images/certificates/certificate (${id}).jpg`}
            alt="cert"
          />
        }
      </div>
    </div>
  );
}
