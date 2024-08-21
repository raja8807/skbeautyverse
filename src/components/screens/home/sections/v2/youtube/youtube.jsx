import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";
import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./youtube.module.scss";

const YoutubeSection = () => {
  return (
    <div className={styles.YoutubeSection}>
      <CustomContainer>
        <CustomSection head="Follow Us on">
          <Row>
            <Col xs={12} md={6}>
              <div
                className={styles.insta}
                style={{
                  position: "relative",
                  // paddingBottom: "56.25%",
                  overflow: "hidden",
                  maxWidth: "100%",
                  marginTop: "30px",
                }}
                data-aos="fade-right"
              >
                <iframe
                  src="https://www.instagram.com/skbeautyverse/embed"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  allow="encrypted-media"
                  title="Instagram Profile"
                ></iframe>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div
                className={styles.insta}
                style={{
                  position: "relative",
                  // paddingBottom: "56.25%",
                  overflow: "hidden",
                  maxWidth: "100%",
                  marginTop: "30px",
                }}
                data-aos="fade-left"
              >
                <iframe
                  src="https://www.instagram.com/skbeautyverseacademy/embed"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  allow="encrypted-media"
                  title="Instagram Profile"
                ></iframe>
              </div>
            </Col>
          </Row>
        </CustomSection>

        <CustomSection head="Subscribe to our channel">
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              maxWidth: "100%",
              background: "#000",
              marginTop: "30px",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed?listType=user_uploads&list=UCXgGY0wkgOzynnHvSEVmE3A"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Channel"
            ></iframe>
          </div>
        </CustomSection>
      </CustomContainer>
    </div>
  );
};

export default YoutubeSection;
