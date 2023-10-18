import { Col } from "react-bootstrap";
import styles from "./review.module.scss";
import { StarFill } from "react-bootstrap-icons";

const Review = ({ review }) => {
  const ratings = [ 1, 2, 3, 4,5];

  return (
    <Col xs={12} md={6}>
      <div className={styles.review}>
        <div className={styles.top}>
          <p
            className={styles.initial}
          >{`${review.firstName[0]}${review.lastName[0]}`}</p>
          <div>
            <p className={styles.name}>
              {review.firstName} {review.lastName}
            </p>
            {ratings.map((r) => {
              return (
                <StarFill
                  key={r}
                  className={`${styles.star} ${
                    r <= review.rating && styles.rated
                  }`}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.bottom}>
          <span>{review.comment}</span>
        </div>
      </div>
    </Col>
  );
};

export default Review;
