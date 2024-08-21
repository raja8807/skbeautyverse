import ServicePostScreen from "@/components/screens/services/service/service_post/service_post";
import { getData } from "@/libs/firebase/firebase";
import React from "react";

const ServicePost = ({ service }) => {
  return <ServicePostScreen service={service} />;
};

export default ServicePost;

export async function getServerSideProps(context) {
  try {
    const service = await getData("service_post", ["id", "==", context.query.post]);
    return { props: { service: service[0] || {} } };
  } catch (err) {
    console.log(err);

    return { props: { service: {} } };
  }
}
