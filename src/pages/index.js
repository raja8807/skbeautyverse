import HomeScreen from "@/components/screens/home/home";
import { getAllData, getData } from "@/libs/firebase/firebase";
// import CustomContainer from "@/components/ui/custom_container/custom_container";

const Home = ({ homeData = {}, blogs, reviews }) => {

  return (
    <HomeScreen
      // reviews={homeData.reviews}
      galleryImages={homeData.galleryImages || []}
      blogs={blogs}
      reviews={reviews}
    />
  );
};

export default Home;

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`http://${context.req.headers.host}/api/homeData`);
    const reviews = await getData("reviews", ["isApproved", "==", true]);
    const homeData = await res.json();
    return { props: { homeData, reviews } };
  } catch (err) {
    return { props: { images: "errr-->" + err.message } };
  }
}
