import React from "react";
import styles from "./service.module.scss";
import CustomSection from "@/components/ui/custom_section/custom_section";
import { Col, Image, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { useRouter } from "next/router";
import Link from "next/link";

const Service = ({ service, data }) => {
  const { rows, title, price, id, description } = data;
  return (
    <Col xs={12} md={6} lg={4} data-aos="fade-up">
      <Link href={`/services/${service}/${id}`}>
        <div className={styles.Service}>
          <div
            className={styles.img}
            style={{
              backgroundImage: `url(${rows[0].img})`,
            }}
          />
          <h4>{title}</h4>
          <p>{description}</p>
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

  return (
    <div className={styles.ServicesSection}>
      <br />
      <br />
      <br />
      <CustomSection>
        <CustomContainer>
          <Row>
            {services.map((s, i) => {
              return <Service key={s.id} data={s} service={service} />;
            })}
          </Row>
        </CustomContainer>
      </CustomSection>
    </div>
  );
};

export default ServiceScreen;
