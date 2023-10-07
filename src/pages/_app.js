import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Layout from "@/components/layout/layout";

import { Outfit as BaseFont } from "next/font/google";

// Kaushan_Script

const roboto = BaseFont({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  weight: ["400", "500", "600", "700"],
  // weight: ["400"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const [load, setLoad] = useState(true);
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

  return (
    <>
      {load ? (
        <div className="ov">Loading..</div>
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
