const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
const {
  default: CustomSection,
} = require("@/components/ui/custom_section/custom_section");
import { Row } from "react-bootstrap";
import Review from "./review/review";
import { useState } from "react";
import PageHead from "@/components/ui/page_head/page_head";

const ReviewsScreen = ({ reviews }) => {
  return (
    <div>
      <PageHead head="Reviews" />
      <CustomContainer>
        <CustomSection bg="textGold">
          <Row>
            {reviews
              // .sort(function (a, b) {
              //   // Turn your strings into dates, and then subtract them
              //   // to get a value that is either negative, positive, or zero.
              //   return new Date(b.createdAt) - new Date(a.createdAt);
              // })
              .map((review,i) => {
                return (
                  <Review key={`review_${i}`} review={review} reviews={reviews} />
                );
              })}
          </Row>
        </CustomSection>
      </CustomContainer>
    </div>
  );
};

export default ReviewsScreen;
