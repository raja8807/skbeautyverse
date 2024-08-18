import CustomContainer from "@/components/ui/custom_container/custom_container";
import React from "react";
import styles from "./about.module.scss";
import { Col, Image, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { customFont1, oswald } from "@/styles/fonts/fonts";

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
                <h2 data-aos="fade-left" className={oswald}>
                  Who Am I ?
                </h2>
                <p data-aos="fade-right" className={customFont1}>
                  I am a dedicated makeup artist with a deep passion for skin,
                  hair, aesthetics, and SPMU (Semi-Permanent Makeup). As the
                  creative force behind SK Beauty-Verse, my work is centered
                  around the art of transformation, where I see every face as a
                  unique canvas. My expertise lies in revitalizing skin and
                  hair, and I specialize in bridal makeup, ensuring that every
                  detail aligns perfectly with the client&apos;s vision. With a
                  meticulous approach and years of experience, I focus on
                  enhancing natural beauty, bringing out the best in each person
                  I work with.
                </p>
                <br />
                <p data-aos="fade-right" className={customFont1}>
                  At SK Beauty-Verse, my goal is to make your most cherished
                  moments truly unforgettable. I understand that beauty is not
                  just about appearance, but also about confidence and
                  self-expression. Whether it’s your wedding day or another
                  special occasion, I’m here to ensure you look and feel
                  radiant. My commitment to excellence is reflected in every
                  brushstroke, and I take pride in delivering a look that not
                  only complements your features but also elevates your spirit.
                  Let me help you shine, with beauty that lasts far beyond the
                  moment.
                </p>
                {/* <Image
                  data-aos="fade-left"
                  src="/images/logo/1Lakme-Logo.png"
                  alt="lakme-logo"
                /> */}
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
