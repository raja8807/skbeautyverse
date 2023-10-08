const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
import { useEffect, useState } from "react";
// import { Image } from "react-bootstrap";
import styles from "./banner.module.scss";
import SimpleImageSlider from "react-simple-image-slider";
import CustomButton from "@/components/ui/custom_button/custom_button";

// import {Lora  as HeadFont } from "next/font/google";
import fonts from "@/components/fonts/fonts";


const src =
  "https://image.wedmegood.com/resized-nw/600X/wp-content/uploads/2019/03/1539960377_BBB_MG_6768_WCI_copy.jpg";

const Banner = () => {
  const images = [
    {
      url: src,
    },
    {
      url: "https://i.pinimg.com/originals/a0/39/85/a039857f6cbff84f489b14f2d2d031fb.jpg",
    },
    {
      url: src,
    },
  ];


  const [width,setShowWidth] = useState(400)
  useEffect(() => {
    // console.log(width);
    if (window) {
        if(window.innerWidth < 420){
          setShowWidth(300)
        }else{
            
            setShowWidth(400)
        }
        window.addEventListener('resize',()=>{
            // alert()
              if(window.innerWidth < 420){
                setShowWidth(300)
              }else{
            
                setShowWidth(400)
            }
        })
    }
  }, []);

  return (
    <CustomContainer className={styles.banner}>
      <div className={styles.left}>
        <div className={styles.head}>
          <h1 className={fonts.lora}  data-aos='fade-left'>SUSHMITHA KARTHIK</h1>
          <h3 className={fonts.petit} data-aos='fade-right'>Makeup Artist & Cosmotologist</h3>
        <hr/>
        </div>
        <div data-aos='zoom-in' className={styles.text}>
          <p >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id eum
            sed, natus accusantium dicta alias. Consequatur cum magni assumenda
            soluta laborum quibusdam voluptatum reiciendis maxime sunt! Eius non
            quis aut. Ullam quaerat eligendi error sint possimus adipisci,
            temporibus ea suscipit id unde consequuntur vero impedit nihil
            distinctio quam repellat harum.
          </p>
          <br/>
          <CustomButton>Book Now</CustomButton>
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
