const { useState } = require("react");
import { StarFill } from "react-bootstrap-icons";
import styles from "./new_review.module.scss";
import { Spinner } from "react-bootstrap";

const NewReviewForm = ({ setIsSubmitted, setReviews }) => {
  const [newReview, setNewReview] = useState({
    firstName: "",
    lastName: "",
    rating: 0,
    comment: "",
  });

  const ratings = [1, 2, 3, 4, 5];

  const [tempRating, setTempRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const postReview = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify(newReview),
      });
      const postedReview = await res.json();
      console.log(postedReview);
      localStorage.setItem("reviewId", postedReview._id);
      setReviews((prev) => [postedReview, ...prev]);
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <form
      className={styles.newReview}
      onSubmit={(e) => {
        e.preventDefault();
        postReview();
      }}
    >
      <h2>Leave a Review</h2>
      <div className={styles.name}>
        <input
          placeholder="First Name"
          value={newReview.firstName}
          onChange={(e) => {
            const { value } = e.target;
            setNewReview((prev) => ({ ...prev, firstName: value }));
          }}
        />
        <input
          value={newReview.lastName}
          placeholder="Last Name"
          onChange={(e) => {
            const { value } = e.target;
            setNewReview((prev) => ({ ...prev, lastName: value }));
          }}
        />
      </div>

      <textarea
        rows={3}
        placeholder="Your Review Comment.."
        value={newReview.comment}
        onChange={(e) => {
          const { value } = e.target;
          if (value.length <= 200) {
            setNewReview((prev) => ({ ...prev, comment: value }));
          }
        }}
      ></textarea>
      <small>{newReview.comment.length}/200</small>

      <div>
        Your Rating &nbsp; &nbsp;
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
        ))}
      </div>
      {isLoading ? (
        <Spinner style={{ margin: "auto" }} />
      ) : (
        <input
          type="submit"
          value="Submit Review"
          disabled={
            !(
              newReview.firstName &&
              newReview.lastName &&
              newReview.comment &&
              newReview.rating
            )
          }
        />
      )}
    </form>
  );
};

export default NewReviewForm;
