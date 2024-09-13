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

import "nprogress/nprogress.css";
import Router from "next/router";
import fonts from "@/styles/fonts/fonts";
import { auth, getAllData } from "@/libs/firebase/firebase";
import LoadingScreen from "@/components/ui/loading/loading";
import { onAuthStateChanged } from "firebase/auth";
import DefaultEditor from "react-simple-wysiwyg";
import { DefaultSeo } from "next-seo";
import KeywordsSection from "@/components/keywords/keywords";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-1YXX6P0YZ6`}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || []; 
      function gtag(){
      dataLayer.push(arguments);
      } gtag('js', new Date()); gtag('config', 'G-1YXX6P0YZ6'); 
      `,
        }}
      />

      <SessionProvider session={pageProps.session}>
        <DefaultSeo
          title="SK Beauty-Verse - Skin care | Hair Care | Bridal makeup | Courses"
          // description='I am SUSHMITHA KARTHIK, your dedicated makeup artist, Certified by "Lakme Academy" specializing in hair, skin, and bridal makeup. Discover personalized beauty experiences crafted with premium products, which do not cause damage to skin & hair. "Make your beautyful day, More Beutiful with our Makup Services!"'
        />
        {isLoading && <LoadingScreen />}
        <main className={fonts.mainFont}>
          <Layout services={services}>
            <Component
              {...pageProps}
              blogs={blogs}
              services={services}
              clientSession={clientSession}
            />
            <KeywordsSection />
          </Layout>
        </main>
      </SessionProvider>
      <Analytics/>
      <SpeedInsights/>
    </>
  );
}
