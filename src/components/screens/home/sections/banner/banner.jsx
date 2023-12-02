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
import { useRouter } from "next/router";
import EnquirePopup from "@/components/enquire_popup/enquire_popup";

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

  // const [showPopup,setShowPopup]=useState('')

  return (
    <CustomContainer className={styles.banner}>
      {/* <EnquirePopup show={!!showPopup} setShow={setShowPopup} initialMessage={showPopup}/> */}

      <div className={styles.left}>
        <div className={styles.head}>
          <h1 className={fonts.head}>SUSHMITHA KARTHIK</h1>
          <h3
            className={fonts.petit}
            data-aos="fade-right"
            style={{ color: "#d8b74b" }}
          >
            Makeup Artist & Cosmotologist
          </h3>
          <hr />
        </div>
        <div data-aos="zoom-in" className={styles.text}>
          <p style={{ color: "#d8b74b" }}>
            Welcome to SK Beauty-Verse, where Sushmitha Karthik crafts a{" "}
            <b>universe of beauty! </b> Immerse yourself in a world where
            artistry meets elegance. With a passion for perfection, we
            specialize in creating enchanting bridal makeup experiences. Our
            brushes weave dreams, enhancing your natural beauty for your special
            day. Trust us to make you look and feel like a celestial bride.
            Enter our Beauty-Verse, where dreams blend seamlessly with reality.
          </p>
          <br />
          <div className={styles.bottom}>
            <div>
              <p style={{ color: "#d8b74b" }}>Certified By</p>
              <Image fluid alt="lakme" src="/images/logo/Lakme-Logo.png" />
            </div>
            <CustomButton
              clickHandler={() => {
                setShowPopup("Hi. I want to know more about your services..");
              }}
              type="gold"
            >
              Enquire Now
            </CustomButton>
          </div>
          <div className={styles.x} style={{ color: "#d8b74b" }}>
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
            height={width === 400 ? 500 : 380}
            images={images}
            showBullets={true}
            showNavs={true}
            navSize={25}
          />
        </div>
      </div>
    </CustomContainer>
  );
};

export default Banner;
