import HomeScreen from "@/components/screens/home/home";
// import CustomContainer from "@/components/ui/custom_container/custom_container";

const Home = ({ homeData }) => {
  return (
    <HomeScreen
      packages={homeData.packages}
      bannerImages={homeData.bannerImages}
      reviews={homeData.reviews}
    />
  );
};

export default Home;

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`http://${context.req.headers.host}/api/homeData`);
    const homeData = await res.json();
    return { props: { homeData } };
  } catch (err) {
    return { props: { images: "errr-->" + err.message } };
  }
}
