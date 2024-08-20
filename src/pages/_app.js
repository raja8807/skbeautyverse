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
import fonts from "@/styles/fonts/fonts";
import { getAllData } from "@/libs/firebase/firebase";
import LoadingScreen from "@/components/ui/loading/loading";

// Kaushan_Script

const roboto = BaseFont({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const [load, setLoad] = useState(true);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await getAllData("service_post");
      const blogRes = await getAllData("blog_post");
      const servicesByCategory = [];
      res.forEach((doc) => {
        const serIdx = servicesByCategory.findIndex((sc) => {
          return sc.category === doc.service;
        });

        if (serIdx != -1) {
          if (servicesByCategory[serIdx].services) {
            servicesByCategory[serIdx].services.push(doc);
          } else {
            servicesByCategory[serIdx].services = [];
            servicesByCategory[serIdx].services.push(doc);
          }
        } else {
          servicesByCategory.push({
            category: doc.service,
            services: [{ ...doc }],
          });
        }
      });

      setServices(servicesByCategory || []);
      setBlogs(blogRes || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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

    fetchServices();

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
     
      {isLoading || load ? (
        <LoadingScreen />
      ) : (
        <main className={fonts.mainFont}>
          <Layout customer={customer} services={services}>
            <Component
              {...pageProps}
              customer={customer}
              setCustomer={setCustomer}
              blogs={blogs}
              services={services}
            />
          </Layout>
        </main>
      )}
    </SessionProvider>
  );
}
