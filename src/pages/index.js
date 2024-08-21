import HomeScreen from "@/components/screens/home/home";
import { getAllData, getData } from "@/libs/firebase/firebase";
import Head from "next/head";
// import CustomContainer from "@/components/ui/custom_container/custom_container";

const Home = ({ homeData = {}, blogs, reviews }) => {
  return (
    <>
      <Head>
        <title>SK Beauty-Verse</title>
        <meta
          name="description"
          content='I am SUSHMITHA KARTHIK, your dedicated makeup artist, Certified by "Lakme Academy" specializing in hair, skin, and bridal makeup. Discover personalized beauty experiences crafted with premium products, which does not cause damage to skin & hair. "Make your beautyful day, More Beutiful with our Makup Services!"'
        />
        <meta property="og:title" content="SK Beauty-Verse" />
        <meta
          property="og:description"
          content='I am SUSHMITHA KARTHIK, your dedicated makeup artist, Certified by "Lakme Academy" specializing in hair, skin, and bridal makeup. Discover personalized beauty experiences crafted with premium products, which does not cause damage to skin & hair. "Make your beautyful day, More Beutiful with our Makup Services!"'
        />
        <meta
          property="og:image"
          content={"https://www.skbeautyverse.com/images/logo/logo.png"}
        />
        <meta property="og:url" content={`https://www.skbeautyverse.com/`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SK Beauty-Verse" />
        <meta
          name="twitter:description"
          content='I am SUSHMITHA KARTHIK, your dedicated makeup artist, Certified by "Lakme Academy" specializing in hair, skin, and bridal makeup. Discover personalized beauty experiences crafted with premium products, which does not cause damage to skin & hair. "Make your beautyful day, More Beutiful with our Makup Services!"'
        />
        <meta
          name="twitter:image"
          content="https://www.skbeautyverse.com/images/logo/logo.png"
        />
        <link rel="canonical" href={`https://www.skbeautyverse.com/`} />
      </Head>
      <HomeScreen
        // reviews={homeData.reviews}
        galleryImages={homeData.galleryImages || []}
        blogs={blogs}
        reviews={reviews}
      />
    </>
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
