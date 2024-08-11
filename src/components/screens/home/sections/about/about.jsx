import CustomContainer from "@/components/ui/custom_container/custom_container";
import React from "react";
import styles from "./about.module.scss";
import { Col, Image, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { customFont1 } from "@/styles/fonts/fonts";

const AboutSection = () => {
  return (
    <div className={styles.AboutSection}>
      <CustomContainer>
        <div className={styles.wrap}>
          <Row>
            <Col xs={12} lg={6}>
              <div className={styles.left}>
                <div className={styles.bg} data-aos="fade-in"></div>
                <div
                  className={styles.img}
                  data-aos="fade-right"
                  data-aos-delay={200}
                >
                  <Image src="/images/img.jpeg" fluid alt="img" />
                  <p>
                    Sushmitha Karthik, <br />
                    Proprietor & Senior Makeup Artist
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={6}>
              <div className={styles.right}>
                <h2 data-aos="fade-left" className={customFont1}>
                  Who Am I?
                </h2>
                <p data-aos="fade-right" >
                  I am a passionate Makeup artist, who specialized in Skin, Hair
                  and Bridal Makeup. I am the creative force behind SK
                  Beauty-Verse. With a passion for transforming faces, I
                  specialize in hair, skin, and bridal makeup. With years of
                  expertise and a keen eye for detail, I bring out your natural
                  beauty. Let us make your special moments truly unforgettable,
                  one brushstroke at a time.
                </p>
                <br />
                <br />
                <h2 data-aos="fade-left" className={customFont1}>Expert Training from Lakme Academy</h2>
                <p data-aos="fade-right">
                  Our expertise is not just a result of experience. it is also
                  backed by professional training. We are proud alumni of the
                  renowned Lakme Academy, a leading name in the beauty products
                  industry. Under their guidance, we mastered the techniques and
                  nuances of makeup application, ensuring that our clients
                  receive nothing but the best.
                </p>
                <Image
                  data-aos="fade-left"
                  src="/images/logo/1Lakme-Logo.png"
                  alt="lakme-logo"
                />
                <br />
                <CustomButton data-aos="fade-up" variant={2}>
                  Know More
                </CustomButton>
              </div>
            </Col>
          </Row>
        </div>
      </CustomContainer>
    </div>
  );
};

export default AboutSection;
