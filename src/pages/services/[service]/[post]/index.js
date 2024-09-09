import ServicePostScreen from "@/components/screens/services/service/service_post/service_post";
import { getData } from "@/libs/firebase/firebase";
import Head from "next/head";
import React from "react";

const ServicePost = ({ service }) => {
  return (
    <>
      <Head>
        <title>{`${service.title} - SK Beauty-Verse`}</title>
        <meta name="description" content={service.description} />
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.description} />
        <meta property="og:image" content={service?.rows?.[0]?.img} />
        <meta
          property="og:url"
          content={`https://www.skbeautyverse.com/services/${service.service}/${service.id}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={service.title} />
        <meta name="twitter:description" content={service.description} />
        <meta name="twitter:image" content={service?.rows?.[0]?.img} />
        <link
          rel="canonical"
          href={`https://www.skbeautyverse.com/services/${service.service}/${service.id}`}
        />
      </Head>
      <ServicePostScreen service={service} />
    </>
  );
};

export default ServicePost;

export async function getServerSideProps(context) {
  try {
    const service = await getData("service_post", [
      "id",
      "==",
      context.query.post,
    ]);
    return { props: { service: service[0] || {} } };
  } catch (err) {
    console.log(err);

    return { props: { service: {} } };
  }
}
