const { useState } = require("react");
import { StarFill } from "react-bootstrap-icons";
import styles from "./new_review.module.scss";

const NewReviewForm = () => {
  const [newReview, setNewReview] = useState({
    firstName: "",
    lastName: "",
    rating: 0,
    comment: "",
  });

  const ratings = [1, 2, 3, 4, 5];

  const [tempRating, setTempRating] = useState(0);

  return (
    <form
      className={styles.newReview}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input />
      <input />
      <br />
      {ratings.map((r) => (
        <StarFill
          key={`star_${r}`}
          className={`${styles.star} ${
            (r <= newReview.rating || r <= tempRating) && styles.rated
          }`}
          onClick={() => {
            setNewReview((prev) => ({ ...prev, rating: r }));
          }}
          onMouseOver={() => {
            setTempRating(r);
          }}
          onMouseLeave={() => {
            setTempRating(0);
          }}
        />
      ))}{" "}
      <br />
      <input type="submit" value="Submit Review" />
    </form>
  );
};

export default NewReviewForm;
