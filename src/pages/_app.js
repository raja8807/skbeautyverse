import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Layout from "@/components/layout/layout";

import { Outfit as BaseFont } from "next/font/google";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

// Kaushan_Script

const roboto = BaseFont({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  weight: ["400", "500", "600", "700"],
  // weight: ["400"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const [load, setLoad] = useState(true);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Aos.init({
      // easing: "ease-out-cubic",
      duration: 1000,
      once: false,
    });

    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const handleChangeStart = (url) => {
      if (url === "/" || url.includes("gallery")|| url.includes("admin")) {
        console.log(url, "adeaefef------------>>");
        setIsLoading(true);
      }
    };

    const handleChangeEnd = (url) => {
      if (url === "/" || url.includes("gallery") || url.includes("admin")) {
        setIsLoading(false);
      }
    };

    router.events.on("routeChangeStart", handleChangeStart);
    router.events.on("routeChangeComplete", handleChangeEnd);
    router.events.on("routeChangeError", handleChangeEnd);
  }, [router.events]);

  return (
    <>
      {load && <div className="loading">Loading..</div>}
      {isLoading ? (
        <div className="loading">
          <Spinner />
        </div>
      ) : (
        <main className={roboto.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      )}
    </>
  );
}
