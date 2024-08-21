import ServiceScreen from "@/components/screens/services/service/service";
import { getData } from "@/libs/firebase/firebase";
import React from "react";

const ServicePage = ({ servicesData }) => {
  // console.log(services);

  return <ServiceScreen services={servicesData} />;
};

export default ServicePage;

export async function getServerSideProps(context) {
  try {
    const servicesData = await getData("service_post", [
      "service",
      "==",
      context.query.service,
    ]);
    return { props: { servicesData } };
  } catch (err) {
    return { props: { servicesData: [] } };
  }
}
