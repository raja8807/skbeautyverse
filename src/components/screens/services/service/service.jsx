import React, { useState } from "react";
import styles from "./service.module.scss";
import CustomSection from "@/components/ui/custom_section/custom_section";
import { Col, Form, Image, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { useRouter } from "next/router";
import Link from "next/link";
import CustomInput from "@/components/ui/custom_input/custom_input";

const Service = ({ service, data, searchQuery }) => {
  const getTitle = () => {
    if (searchQuery) {
      const newTitle = title
        .toLowerCase()
        .replaceAll(
          searchQuery.toLowerCase(),
          `<span>${searchQuery.toUpperCase()}</span>`
        );
      return `<h4>${newTitle.toUpperCase()}</h4>`;
    }
    return `<h4>${title}</h4>`;
  };

  const { rows, title, price, id, description } = data;
  return (
    <Col xs={12} md={6} lg={4} data-aos="fade-up">
      <Link href={`/services/${service}/${id}`}>
        <div className={styles.Service}>
          <div
            className={styles.img}
            style={{
              backgroundImage: `url(${rows?.[0]?.img})`,
            }}
          />
          <h4 dangerouslySetInnerHTML={{ __html: getTitle() }} />
          <p className={styles.desc}>{description}</p>
          <p className={styles.price}> &#8377;{price}/-</p>
          <CustomButton variant={2}>Know More</CustomButton>
        </div>
      </Link>
    </Col>
  );
};

const ServiceScreen = ({ services }) => {
  const router = useRouter();

  const service = router.query.service;

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={styles.ServicesSection}>
      <br />
      <br />
      <br />

      <CustomSection>
        <CustomContainer>
          <Form.Control
            placeholder="Search here.."
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <Row>
            {services
              .filter((ser) => {
                return ser.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              })
              .map((s, i) => {
                return (
                  <Service
                    key={s.id}
                    data={s}
                    service={service}
                    searchQuery={searchQuery}
                  />
                );
              })}
          </Row>
        </CustomContainer>
      </CustomSection>
    </div>
  );
};

export default ServiceScreen;
