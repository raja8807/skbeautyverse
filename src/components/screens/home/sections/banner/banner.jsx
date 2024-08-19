const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
import { customFont1, oswald } from "@/styles/fonts/fonts";
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
      url: "url(/banner/t1.jpeg)",
      color: "black",
    },
    {
      _id: "divms",
      url: "url(/banner/2.png)",

      color: "black",
    },
    {
      _id: "aplpa",
      url: "url(/banner/3.png)",
      color: "black",
    },
    {
      _id: "advmamldv",
      url: "url(/banner/4.png)",
      color: "black",
    },
    {
      _id: "ladvml",
      url: "url(/banner/5.png)",
      color: "black",
    },
    {
      _id: "ladmlvad",
      url: "url(/banner/6.png)",
      color: "black",
    },
    {
      _id: "ladmla",
      url: "url(/banner/7.png)",
      color: "black",
    },
    {
      _id: "alvda",
      url: "url(/banner/8.png)",
      color: "black",
    },
    {
      _id: "sfkpgpvs",
      url: "url(/banner/9.png)",
      color: "black",
    },
  ];

  return (
    <div className="slide-container">
      <Fade arrows={false} canSwipe={false} indicators={false} duration={1000}>
        {images.map((fadeImage, index) => (
          <div key={fadeImage._id}>
            <div
              className={styles.bgImg}
              style={{
                backgroundImage: fadeImage.url,
              }}
            >
              <CustomContainer>
                <div className={styles.wrap}>
                  <h1
                    className={oswald}
                    data-aos="fade-up"
                    style={{
                      color: fadeImage.color,
                    }}
                  >
                    One solution for all your Skin, Hair, Courses and Makeup
                    concerns - <br />
                    SK Beauty-Verse
                  </h1>
                  <CustomButton variant={2} href="/book">
                    Book Now
                  </CustomButton>
                </div>
              </CustomContainer>
            </div>
          </div>
        ))}
      </Fade>
      <div className={styles.btmWrap}>
        <CustomContainer>
          <h1 className={oswald} data-aos="fade-up">
            One solution for all your Skin, Hair, Courses and Makeup concerns -
            SK Beauty-Verse
          </h1>
          <CustomButton variant={2} href="/book">
            Book Now
          </CustomButton>
        </CustomContainer>
      </div>
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
