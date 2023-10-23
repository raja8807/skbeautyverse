const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
import { useEffect, useState } from "react";
import styles from "./banner.module.scss";
import SimpleImageSlider from "react-simple-image-slider";
import CustomButton from "@/components/ui/custom_button/custom_button";
import fonts from "@/components/fonts/fonts";
import { Image } from "react-bootstrap";
import { GeoAlt, GeoAltFill } from "react-bootstrap-icons";

const Banner = ({ bannerImages = [], setShowPopup }) => {
  const images = bannerImages
    .map((image) => ({
      ...image,
      url: image.url.replace("upload", "upload/w_500,f_auto"),
    }))
    .sort((a, b) => {
      return a.index - b.index;
    });

  const [width, setShowWidth] = useState(400);
  useEffect(() => {
    if (window) {
      if (window.innerWidth < 420) {
        setShowWidth(300);
      } else {
        setShowWidth(400);
      }
      window.addEventListener("resize", () => {
        if (window.innerWidth < 420) {
          setShowWidth(300);
        } else {
          setShowWidth(400);
        }
      });
    }
  }, []);

  return (
    <CustomContainer className={styles.banner}>
      <div className={styles.left}>
        <div className={styles.head}>
          <h1 className={fonts.head} data-aos="fade-left">
            SUSHMITHA KARTHIK
          </h1>
          <h3 className={fonts.petit} data-aos="fade-right">
            Makeup Artist & Cosmotologist
          </h3>
          <hr />
        </div>
        <div data-aos="zoom-in" className={styles.text}>
          <p>
            Welcome to SK Beautyverse, where Sushmitha Karthik crafts a{" "}
            <b>universe of beauty! </b> Immerse yourself in a world where
            artistry meets elegance. With a passion for perfection, we
            specialize in creating enchanting bridal makeup experiences. Our
            brushes weave dreams, enhancing your natural beauty for your special
            day. Trust us to make you look and feel like a celestial bride.
            Enter our Beautyverse, where dreams blend seamlessly with reality.
          </p>
          <br />
          <div className={styles.bottom}>
            <div>
              <p>Certified By</p>
              <Image fluid alt="lakme" src="/images/logo/Lakme-Logo.png" />
            </div>
            <CustomButton
              clickHandler={() => {
                setShowPopup(true);
              }}
              type='gold'
            >
              Book Now
            </CustomButton>
          </div>
          <div className={styles.x}>
            <GeoAltFill /> All Over Tamilnadu
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.image}>
          {/* <Image src={src} fluid alt="img" /> */}
          <SimpleImageSlider
            autoPlay
            autoPlayDelay={5}
            navStyle={1}
            width={width}
            height={550}
            images={images}
            showBullets={true}
            showNavs={true}
            navSize={25}
            navMargin={10}
          />
        </div>
      </div>
    </CustomContainer>
  );
};

export default Banner;
