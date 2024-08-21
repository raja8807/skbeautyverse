import React from "react";
import ServicesSection from "../home/sections/v2/services/services";
import PageHead from "@/components/ui/page_head/page_head";

const ServicesScreen = () => {
  return (
    <div>
      <PageHead
        head="Services"
        img="/images/png/service4.PNG"
        rightImg="/images/png/service5.PNG"
        variant={2}
      />
      <ServicesSection />
    </div>
  );
};

export default ServicesScreen;
