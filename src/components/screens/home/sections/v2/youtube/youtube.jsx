import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./youtube.module.scss";
import Script from "next/script";

const YoutubeSection = () => {
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    if (isRemoved !== 0) {
      const yt = document.querySelector("#yt");
      const widget = yt.querySelector(".yottie-container");
      if (widget) {
        const a = widget.getElementsByTagName("a");
        if (a) {
          for (let i = 0; i < a.length; i++) {
            if (a[i].rel === "noreferrer") {
              a[i].remove();
              setIsRemoved(0);
            }
          }
        }
      } else {
        setIsRemoved(Math.random());
      }
    }
  }, [isRemoved]);

  return (
    <div className={styles.YoutubeSection} id="x">
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        // src="./x.js"
        defer
        async
      ></Script>

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
                  allowTransparency="true"
                  allow="encrypted-media"
                  title="Instagram Profile"
                ></iframe>
              </div>
            </Col>
          </Row>
        </CustomSection>

        <CustomSection head="Subscribe to our channel">
          <div id="yt">
            <div
              class="elfsight-app-634ef4ce-2e09-48d4-b6ce-e4457745c3ad"
              data-elfsight-app-lazy
            ></div>
          </div>
          {/* <div
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
              src="https://www.youtube.com/embed?listType=user_uploads&list=UC4cjlhqZl4ujPawXS_P05vQ"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Channel"
            ></iframe>
          </div> */}
        </CustomSection>
      </CustomContainer>
    </div>
  );
};

export default YoutubeSection;
