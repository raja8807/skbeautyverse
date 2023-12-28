import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Layout from "@/components/layout/layout";

import { Outfit as BaseFont } from "next/font/google";
import { useRouter } from "next/router";
import { Image, Spinner } from "react-bootstrap";
import { SessionProvider } from "next-auth/react";

// import firebase from "firebase/compat/app";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

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
    Router.events.on("routeChangeStart", (...params) => {
      NProgress.start(params);
    });
    Router.events.on("routeChangeComplete", NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);

    Aos.init({
      duration: 1000,
      once: false,
    });

    setTimeout(() => {
      setLoad(false);
    }, 2000);

    return () => {
      Router.events.off("routeChangeStart", NProgress.start);
      Router.events.off("routeChangeComplete", NProgress.done);
      Router.events.off("routeChangeError", NProgress.done);
    };
  }, []);

  useEffect(() => {
    const handleChangeStart = (url) => {
      if (url === "/" || url.includes("gallery") || url.includes("admin")) {
        setIsLoading(true);
      }
    };

    const handleChangeEnd = (url) => {
      if (
        typeof url === "string" &&
        (url === "/" || url.includes("gallery") || url.includes("account"))
      ) {
        setIsLoading(false);
      }
    };

    router.events.on("routeChangeStart", handleChangeStart);
    router.events.on("routeChangeComplete", handleChangeEnd);
    router.events.on("routeChangeError", handleChangeEnd);
  }, [router.events]);

  const [customer, setCustomer] = useState(null);


  return (
    <SessionProvider session={pageProps.session}>
      {load && (
        <div className="loading">
          <div class="bg"></div>
          <div class="star-field">
            <div class="layer"></div>
            <div class="layer"></div>
            <div class="layer"></div>
            <Image
              className="logo"
              src="/images/logo/logo.png"
              width={100}
              alt="logo"
            />
          </div>
        </div>
      )}
      {isLoading || load ? (
        <div className="loading">
          <div class="bg"></div>

          <div class="star-field">
            <div class="layer"></div>
            <div class="layer"></div>
            <div class="layer"></div>
            <Image
              className="logo"
              src="/images/logo/logo.png"
              width={120}
              alt="logo"
            />
          </div>
        </div>
      ) : (
        <main className={roboto.className}>
          <Layout customer={customer}>
            <Component
              {...pageProps}
              customer={customer}
              setCustomer={setCustomer}
            />
          </Layout>
        </main>
      )}
    </SessionProvider>
  );
}
