import HomeScreen from "@/components/screens/home/home";
import { getData } from "@/libs/firebase/firebase";
import Head from "next/head";
// import CustomContainer from "@/components/ui/custom_container/custom_container";

const Home = ({ homeData = {}, blogs = [], reviews = [] }) => {
  return (
    <>
      <Head>
        <title>
          SK Beauty-Verse - Skin care | Hair Care | Bridal makeup | Courses
        </title>
        <meta
          name="description"
          content="Welcome to SK BEAUTY-VERSE, your one-stop destination for expert skincare, haircare, bridal makeup, and beautician courses. Personalised Skin Care, Hair Care, and Bridal Makeup Also Hands on training for courses with our Expert Professionals."
        />
        <meta property="og:url" content="https://www.skbeautyverse.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="SK Beauty-Verse - Skin care | Hair Care | Bridal makeup | Courses"
        />
        <meta
          property="og:description"
          content="Welcome to SK BEAUTY-VERSE, your one-stop destination for expert skincare, haircare, bridal makeup, and beautician courses. Personalised Skin Care, Hair Care, and Bridal Makeup Also Hands on training for courses with our Expert Professionals."
        />
        <meta
          property="og:image"
          content="/og.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="skbeautyverse.com" />
        <meta property="twitter:url" content="https://www.skbeautyverse.com" />
        <meta
          name="twitter:title"
          content="SK Beauty-Verse - Skin care | Hair Care | Bridal makeup | Courses"
        />
        <meta
          name="twitter:description"
          content="Welcome to SK BEAUTY-VERSE, your one-stop destination for expert skincare, haircare, bridal makeup, and beautician courses. Personalised Skin Care, Hair Care, and Bridal Makeup Also Hands on training for courses with our Expert Professionals."
        />
        <meta
          name="twitter:image"
          content="/og.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.skbeautyverse.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#317EFB" />
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
