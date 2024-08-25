import { Col, Image } from "react-bootstrap";
import styles from "./review.module.scss";
import { customFont1 } from "@/styles/fonts/fonts";

const Review = ({ review }) => {

  return (
    <Col xs={12} md={6}>
      <div className={styles.review}data-aos='fade-left'>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(${review.img})`,
          }}
        />
        <strong>{review.name}</strong>
        <i className={customFont1}>&quot;{review.message}&quot;</i>
      </div>
    </Col>
  );
};

export default Review;
