const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
import { customFont1 } from "@/styles/fonts/fonts";
import styles from "./banner.module.scss";
import { useRouter } from "next/router";

import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import CustomButton from "@/components/ui/custom_button/custom_button";

const Slideshow = () => {
  const images = [
    {
      _id: "adsdv",
      url: "url(/bg1.jpg)",
    },
    {
      _id: "divms",
      url: "url(/bg2.jpg)",
    },
    {
      _id: "aplpa",
      url: "url(/bg3.jpg)",
    },
  ];

  return (
    <div className="slide-container">
      <Fade arrows={false} canSwipe={false}>
        {images.map((fadeImage, index) => (
          <div key={fadeImage._id}>
            <div
              className={styles.bgImg}
              style={{
                backgroundImage: fadeImage.url,
              }}
            >
              <div className={styles.wrap}>
                <h1 className={customFont1} data-aos='fade-up'>
                  Immerse yourself in a world where artistry meets elegance.{" "}
                </h1>
                <CustomButton variant={2}>Book Now</CustomButton>
              </div>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

const Banner = ({ bannerImages = [], setShowPopup }) => {
  const router = useRouter();
  const images = bannerImages
    .map((image) => ({
      ...image,
      url: image.url.replace("upload", "upload"),
    }))
    .sort((a, b) => {
      return a.index - b.index;
    });

  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <Slideshow images={images} />
      </div>

      <CustomContainer className={styles.banner}>
        {/* ------------------------------------------------------------------------------------- */}
      </CustomContainer>
    </>
  );
};

export default Banner;
