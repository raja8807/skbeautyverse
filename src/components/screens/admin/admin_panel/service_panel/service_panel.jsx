import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useEffect, useState } from "react";
import NewService from "./new_service/new_service";
import axios from "axios";
import { useRouter } from "next/router";
import { deletData, getData } from "@/libs/firebase/firebase";
import { Col, Image, Row } from "react-bootstrap";

const ServicesPanel = ({ service, setCurrentCategory }) => {
  const [showForm, setShowForm] = useState(null);
  const [services, setServices] = useState([]);

  const [currentPost, setCurrentPost] = useState(null);

  const fetchService = async () => {
    const services = await getData("service_post", [
      "service",
      "==",
      service?.id,
    ]);
    setServices(services);
  };

  useEffect(() => {
    fetchService();
  }, []);

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
      <br />
      <br />
      {showForm ? (
        <NewService
          service={service}
          setShowForm={setShowForm}
          currentPost={currentPost}
          setCurrentPost={setCurrentPost}
          setServices={setServices}
        />
      ) : (
        <Row>
          {services.map((s) => {
            return (
              <Col key={s?.id} xs={12} md={3}>
                <div>
                  <Image src={s.rows[0]?.img} fluid alt="xx" />
                  <p>{s.title}</p>
                  <p>{s.price}</p>
                  <CustomButton
                    clickHandler={async () => {
                      try {
                        await deletData("service_post", s.id);
                        alert("Deleted");
                        setServices((prev) =>
                          prev.filter((sp) => sp.id !== s.id)
                        );
                      } catch (err) {
                        alert("Error", err.message);
                      }
                    }}
                  >
                    Delete
                  </CustomButton>
                  &nbsp; &nbsp;
                  <CustomButton
                    clickHandler={() => {
                      setCurrentPost(s);
                      setShowForm(service);
                    }}
                  >
                    Edit
                  </CustomButton>
                  <br />
                  <br />
                  <br />
                </div>
              </Col>
            );
          })}
        </Row>
      )}
      <br />
      <br />
    </div>
  );
};

export default ServicesPanel;
