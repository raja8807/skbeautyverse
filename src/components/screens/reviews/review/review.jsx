import { Col } from "react-bootstrap";
import styles from "./review.module.scss";
import { StarFill, Trash3 } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Review = ({ review, deleteReview }) => {
  const ratings = [1, 2, 3, 4, 5];

  const [isUserComment, setIsUserComment] = useState(false);

  useEffect(() => {
    setIsUserComment(localStorage.getItem("reviewId") === review._id);
  }, []);


  const session = useSession();

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
          {(isUserComment || session?.data) && (
            <Trash3
              className={styles.trash}
              onClick={async () => {
                await deleteReview(review._id);
              }}
            />
          )}
        </div>
        <div className={styles.bottom}>
          <span>{review.comment}</span>
        </div>
      </div>
    </Col>
  );
};

export default Review;
