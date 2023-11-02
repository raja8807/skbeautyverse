import HomeScreen from "@/components/screens/home/home";
// import CustomContainer from "@/components/ui/custom_container/custom_container";

const Home = ({ homeData }) => {
  return (
    <HomeScreen
      packages={homeData.packages}
      bannerImages={homeData.bannerImages}
    />
  );
};

export default Home;

export async function getServerSideProps(context) {
  //   console.log("aeoaen-------------------------->>>>");
  // const limit = Math.floor(Math.random() * 40);
  try {
    const res = await fetch(`http://${context.req.headers.host}/api/homeData`);
    const homeData = await res.json();
    return { props: { homeData } };
  } catch (err) {
    console.log("errr--->", err);
    return { props: { images: "errr-->" + err.message } };
  }
}
