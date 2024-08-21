import { getAllData } from "@/libs/firebase/firebase";

const {
  default: ReviewsScreen,
} = require("@/components/screens/reviews/reviews");

const Reviews = ({ reviews = [] }) => {
  return <ReviewsScreen reviews={reviews} />;
};

export default Reviews;

export async function getServerSideProps(context) {
  try {
    const reviews = await getAllData("reviews");

    return { props: { reviews } };
  } catch (err) {
    console.log("errr--->", err);
    return { props: {} };
  }
}
