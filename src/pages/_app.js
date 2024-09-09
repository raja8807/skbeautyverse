import "@/styles/globals.css";
import { startTransition, useEffect, useState } from "react";
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
import { auth, getAllData } from "@/libs/firebase/firebase";
import LoadingScreen from "@/components/ui/loading/loading";
import { onAuthStateChanged } from "firebase/auth";

// Kaushan_Script

const roboto = BaseFont({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [clientSession, setClientSession] = useState();

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const blogRes = await getAllData("blog_post");
      const servicesByCategory = [];
      const res = await getAllData("service_post");
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
      setTimeout(() => {
        startTransition(() => {
          setIsLoading(false);
        });
      }, 1000);
    }
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
    });

    fetchServices();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (session) => {
      setClientSession(session);
    });
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      {isLoading && <LoadingScreen />}
      <main className={fonts.mainFont}>
        <Layout services={services}>
          <Component
            {...pageProps}
            blogs={blogs}
            services={services}
            clientSession={clientSession}
          />
        </Layout>
      </main>
    </SessionProvider>
  );
}
