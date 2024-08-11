import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useState } from "react";
import NewService from "./new_service/new_service";

const ServicesPanel = ({ service, setCurrentCategory }) => {
  const [showForm, setShowForm] = useState(null);

  return (
    <div>
      <CustomButton
        clickHandler={() => {
          setCurrentCategory(null);
        }}
      >
        Back
      </CustomButton>
      &nbsp; &nbsp; &nbsp;
      <CustomButton
        clickHandler={() => {
          setShowForm(service);
        }}
      >
        New Service
      </CustomButton>
      {showForm && <NewService service={service} />}
    </div>
  );
};

export default ServicesPanel;
