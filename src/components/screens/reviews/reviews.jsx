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
    // console.log(id);
    const res = await fetch(`/api/review?q=${id}`, {
      method: "DELETE",
    });

    setReviews((prev) => prev.filter((r) => r._id !== id));
    localStorage.removeItem('reviewId')
    setIsSubmitted(false);
  };

  return (
    <CustomContainer>
      <CustomSection head="Reviews" caption="Look what our customer says">
        {!isSubmitted && (
          <NewReviewForm
            setIsSubmitted={setIsSubmitted}
            setReviews={setReviews}
          />
        )}
        <Row>
          {reviews.map((review) => {
            return (
              <Review
                key={review._id}
                review={review}
                deleteReview={deleteReview}
              />
            );
          })}
        </Row>
      </CustomSection>
    </CustomContainer>
  );
};

export default ReviewsScreen;
