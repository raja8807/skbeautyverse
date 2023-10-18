const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
const {
  default: CustomSection,
} = require("@/components/ui/custom_section/custom_section");
import { Row } from "react-bootstrap";
import Review from "./review/review";
import NewReviewForm from "./new_review/new_review";

const ReviewsScreen = () => {
  const reviews = [
    {
      _id: "snkaen",
      firstName: "John",
      lastName: "Doe",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad vel autem blanditiis libero eveniet laborum nemo facere quo, iste possimus velit omnis labore! Similique ratione ipsam, quam perspiciatis totam mollitia.",
    },
    {
      _id: "aepfma",
      firstName: "Aohn",
      lastName: "Boe",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad vel autem blanditiis libero eveniet laborum nemo facere quo, iste possimus velit omnis labore! Similique ratione ipsam, quam perspiciatis totam mollitia.",
    },
    {
      _id: "pqekpqe",
      firstName: "Qohn",
      lastName: "Loe",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad vel autem blanditiis libero eveniet laborum nemo facere quo, iste possimus velit omnis labore! Similique ratione ipsam, quam perspiciatis totam mollitia.",
    },
    {
      _id: "zdvldml",
      firstName: "Pohn",
      lastName: "Yoe",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad vel autem blanditiis libero eveniet laborum nemo facere quo, iste possimus velit omnis labore! Similique ratione ipsam, quam perspiciatis totam mollitia.",
    },
  ];

  return (
    <CustomContainer>
      <CustomSection head="Reviews" caption="Look what our customer says">
        <NewReviewForm />
        <Row>
          {reviews.map((review) => {
            return <Review key={review._id} review={review} />;
          })}
        </Row>
      </CustomSection>
    </CustomContainer>
  );
};

export default ReviewsScreen;
