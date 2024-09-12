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
          content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/www.skbeautyverse.com/SK%20Beauty-Verse%20-%20Skin%20care%20%7C%20Hair%20Care%20%7C%20Bridal%20makeup%20%7C%20Courses/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2F1171157b-250d-48d1-8b38-936992b37a2d.png%3Ftoken%3DXzUkbxrHyuxvdPDF9zQ8f3G7TfuLX8yF4-dG6g82d3g%26height%3D949%26width%3D1200%26expires%3D33262139363/og.png"
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
          content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/www.skbeautyverse.com/SK%20Beauty-Verse%20-%20Skin%20care%20%7C%20Hair%20Care%20%7C%20Bridal%20makeup%20%7C%20Courses/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2F1171157b-250d-48d1-8b38-936992b37a2d.png%3Ftoken%3DXzUkbxrHyuxvdPDF9zQ8f3G7TfuLX8yF4-dG6g82d3g%26height%3D949%26width%3D1200%26expires%3D33262139363/og.png"
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
