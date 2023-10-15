const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
import { useEffect, useState } from "react";
import styles from "./banner.module.scss";
import SimpleImageSlider from "react-simple-image-slider";
import CustomButton from "@/components/ui/custom_button/custom_button";
import fonts from "@/components/fonts/fonts";
import { Image } from "react-bootstrap";

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
          <h1 className={fonts.lora} data-aos="fade-left">
            SUSHMITHA KARTHIK
          </h1>
          <h3 className={fonts.petit} data-aos="fade-right">
            Makeup Artist & Cosmotologist
          </h3>
          <hr />
        </div>
        <div data-aos="zoom-in" className={styles.text}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id eum
            sed, natus accusantium dicta alias. Consequatur cum magni assumenda
            soluta laborum quibusdam voluptatum reiciendis maxime sunt! Eius non
            quis aut. Ullam quaerat eligendi error sint possimus adipisci,
            temporibus ea suscipit id unde consequuntur vero impedit nihil
            distinctio quam repellat harum.
          </p>
          <br />
          <div className={styles.bottom}>
            <div>
              <p>Trained By</p>
              <Image fluid alt="lakme" src="/images/logo/Lakme-Logo.png" />
            </div>
            <CustomButton
              clickHandler={() => {
                setShowPopup(true);
              }}
            >
              Book Now
            </CustomButton>
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
