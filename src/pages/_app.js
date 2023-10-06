import "@/styles/globals.css";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Layout from "@/components/layout/layout";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      // easing: "ease-out-cubic",
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
