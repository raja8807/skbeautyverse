const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
const {
  default: CustomSection,
} = require("@/components/ui/custom_section/custom_section");
import { Row } from "react-bootstrap";
import Review from "./review/review";
import NewReviewForm from "./new_review/new_review";
import { useState } from "react";

const ReviewsScreen = ({ reviews: reviewsData = [] }) => {
  const [reviews, setReviews] = useState(reviewsData);

  const [isSubmitted, setIsSubmitted] = useState(
    localStorage.getItem("reviewId") || false
  );

  const deleteReview = async (id) => {
    const res = await fetch(`/api/review?q=${id}`, {
      method: "DELETE",
    });

    setReviews((prev) => prev.filter((r) => r._id !== id));
    localStorage.removeItem("reviewId");
    setIsSubmitted(false);
  };

  return (
    <CustomContainer>
      <CustomSection head="Reviews" caption="Look what our customer says" bg='textGold'>
        {!isSubmitted && (
          <NewReviewForm
            setIsSubmitted={setIsSubmitted}
            setReviews={setReviews}
          />
        )}
        <Row>
          {reviews
            .sort(function (a, b) {
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((review) => {
              return (
                <Review
                  key={review._id}
                  review={review}
                  deleteReview={deleteReview}
                  reviews={reviews}
                />
              );
            })}
        </Row>
      </CustomSection>
    </CustomContainer>
  );
};

export default ReviewsScreen;
