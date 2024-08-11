import ServiceScreen from "@/components/screens/services/service/service";
import { getData } from "@/libs/firebase/firebase";
import React from "react";

const ServicePage = ({ services }) => {
  // console.log(services);

  return <ServiceScreen services={services} />;
};

export default ServicePage;

export async function getServerSideProps(context) {
  try {
    const services = await getData("service_post", [
      "service",
      "==",
      context.query.service,
    ]);
    return { props: { services } };
  } catch (err) {
    return { props: { services: [] } };
  }
}
