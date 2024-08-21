import ServicesScreen from "@/components/screens/services/services";
import Head from "next/head";
import React from "react";

const ServicesPage = () => {
  return (
    <>
      <Head>
        <title>SK Beauty-Verse</title>
        <meta
          name="description"
          content='I am SUSHMITHA KARTHIK, your dedicated makeup artist, Certified by "Lakme Academy" specializing in hair, skin, and bridal makeup. Discover personalized beauty experiences crafted with premium products, which do not cause damage to skin & hair. "Make your beautyful day, More Beutiful with our Makup Services!"'
        />
        <meta property="og:url" content="https://www.skbeautyverse.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SK Beauty-Verse" />
        <meta
          property="og:description"
          content='I am SUSHMITHA KARTHIK, your dedicated makeup artist, Certified by "Lakme Academy" specializing in hair, skin, and bridal makeup. Discover personalized beauty experiences crafted with premium products, which do not cause damage to skin & hair. "Make your beautyful day, More Beutiful with our Makup Services!"'
        />
        <meta
          property="og:image"
          content="https://opengraph.b-cdn.net/production/images/1171157b-250d-48d1-8b38-936992b37a2d.png?token=a2WslOTnXlU7wkxgcx0HhENUn1vM6WdBYa8CR_L9Q0U&height=949&width=1200&expires=33260249685"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="skbeautyverse.com" />
        <meta property="twitter:url" content="https://www.skbeautyverse.com" />
        <meta name="twitter:title" content="SK Beauty-Verse" />
        <meta
          name="twitter:description"
          content='I am SUSHMITHA KARTHIK, your dedicated makeup artist, Certified by "Lakme Academy" specializing in hair, skin, and bridal makeup. Discover personalized beauty experiences crafted with premium products, which do not cause damage to skin & hair. "Make your beautyful day, More Beutiful with our Makup Services!"'
        />
        <meta
          name="twitter:image"
          content="https://opengraph.b-cdn.net/production/images/1171157b-250d-48d1-8b38-936992b37a2d.png?token=a2WslOTnXlU7wkxgcx0HhENUn1vM6WdBYa8CR_L9Q0U&height=949&width=1200&expires=33260249685"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.skbeautyverse.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <ServicesScreen />
    </>
  );
};

export default ServicesPage;
