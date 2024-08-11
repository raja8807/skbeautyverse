import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import styles from "./services.module.scss";
import Link from "next/link";
import SERVICE_CATEGORIES from "@/components/constants/service_categories";

const Service = ({ data }) => {
  const { title, img, id } = data;

  return (
    <Col xs={6} md={6} lg={3}>
      <Link href={`/services/${id}`}>
        <div className={styles.cat}>
          <Image src={`/images/categories/${img}`} fluid width={150} alt="cat" />
          <p>{title}</p>
        </div>
      </Link>
    </Col>
  );
};

const ServicesSection = () => {
  const categories = SERVICE_CATEGORIES;

  return (
    <div>
      <br />
      <CustomSection
        head="Services by SK Beauty-Verse"
        bg="gold"
        caption="Explore our beauty realms! From enchanting bridal transformations to glamorous evening looks, discover the perfect makeup artistry for every occasion. Dive into elegance today!"
      >
        <CustomContainer>
          <br />
          <Row>
            {categories.map((c) => {
              return <Service key={c.id} data={c} />;
            })}
          </Row>
          <br />
        </CustomContainer>
      </CustomSection>
    </div>
  );
};

export default ServicesSection;
