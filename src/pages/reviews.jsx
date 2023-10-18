const {
  default: ReviewsScreen,
} = require("@/components/screens/reviews/reviews");

const Reviews = ({ reviews }) => {

  return <ReviewsScreen reviews={reviews}/>;
};

export default Reviews;

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`http://${context.req.headers.host}/api/review`);
    const reviews = await res.json();
    return { props: { reviews } };
  } catch (err) {
    console.log("errr--->", err);
    return { props: { images: "errr-->" + err.message } };
  }
}
