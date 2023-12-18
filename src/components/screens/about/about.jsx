const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
const {
  default: CustomSection,
} = require("@/components/ui/custom_section/custom_section");

import { Col, Image, Row } from "react-bootstrap";
import styles from "./about.module.scss";

import fonts from "@/components/fonts/fonts";
import CustomButton from "@/components/ui/custom_button/custom_button";
import Certificates from "./certificates/certificates";
import { useRouter } from "next/router";

// const team = ()=>{
//   return (
//     <div className={styles.content} data-aos="fade-up">
//           {/* <div className={styles.img} data-aos="fade-up">
//             <Image src="/images/logo/Lakme-Logo.png" alt="logo" />
//           </div> */}
//           <div className={styles.text}>
//             <h2 data-aos="fade-up">Our Team</h2>
//             <hr data-aos="fade-up" />
//             <div className={styles.teamItem}>
//               <Row>
//                 <Col xs={12} md={4}>
//                   <Image
//                     style={{ borderRadius: "10px" }}
//                     src="/images/categories/team1.jpeg"
//                     alt="logo"
//                     fluid
//                   />
//                 </Col>
//                 <Col xs={12} style={{ padding: "10px" }} md={8}>
//                   <div className={styles.detail}>
//                     <div>
//                       <p className={styles.title}>Name : </p>
//                       <span className={styles.val}>Karthik (founder)</span>
//                     </div>
//                     <div>
//                       <p className={styles.title}>Designation : </p>
//                       <span>Digital Marketer & Cosmetologist</span>
//                     </div>
//                     <div>
//                       <p className={styles.title}>Experience : </p>
//                       <span>2 Years</span>
//                     </div>
//                     <br />
//                   </div>
//                   <p className={fonts.montserrat}>
//                     Meet Karthik, the dynamic force shaping digital marketing
//                     and cosmetology at SK Beauty-Verse. With a keen eye for
//                     market trends and a flair for beauty, I seamlessly blend
//                     expertise in online strategies with the art of cosmetology.
//                     Dedicated to enhancing your online presence and your natural
//                     charm, I transform businesses and faces with passion and
//                     precision. Let us elevate your brand and beauty to new
//                     heights.
//                   </p>
//                 </Col>
//               </Row>
//             </div>
//           </div>
//         </div>
//   )
// }

const AboutScreen = () => {
  const router = useRouter();

  return (
    <CustomContainer>
      <CustomSection head="About Us" noPadding bg="textGold">
        <div className={styles.top} data-aos="fade-up">
          <h2 className={fonts.lora}>
            Welcome To <span style={{ color: "#d8b74b" }}>SK Beauty-Verse</span>
          </h2>
          <p>More Than Just Makeup &quot;A Universe of Beauty&quot;</p>
        </div>
        <div className={styles.content}>
          <div className={styles.img} data-aos="fade-up">
            <Image src="/images/categories/img.jpeg" alt="logo" />
          </div>
          <div className={styles.text}>
            <h2 data-aos="fade-up">Who Am I?</h2>
            <hr data-aos="fade-up" />
            <div className={styles.detail}>
              <p data-aos="fade-up" className={styles.title}>
                Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; {" "}
                <span style={{fontWeight:'600'}}>Sushmitha Karthik</span>
              </p>
              <p className={styles.title} data-aos="fade-up">
                Designation  &nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; <span>Proprietor & Senior Makeup Artist</span>
              </p>
              <p className={styles.title} data-aos="fade-up">
                Certifed By &nbsp;&nbsp;:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Lakme Academy & Scissors</span>
              </p>
              <p className={styles.title} data-aos="fade-up">
                Experience &nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>7 Years</span>
              </p>
            </div>
            <br />
            <p className={fonts.montserrat} data-aos="fade-up">
              I am a passionate Makeup artist, who specialized in Skin, Hair and
              Bridal Makeup. I am the creative force behind SK Beauty-Verse.
              With a passion for transforming faces, I specialize in hair, skin,
              and bridal makeup. With years of expertise and a keen eye for
              detail, I bring out your natural beauty. Let us make your special
              moments truly unforgettable, one brushstroke at a time.
            </p>

            {/* <br /> */}
            {/* <div data-aos="fade-up">
              <CustomButton>View Our Customer&apos;s Reviews</CustomButton>
            </div> */}
          </div>
        </div>

        <Certificates />

        <div className={styles.content}>
          <div className={styles.img} data-aos="fade-up">
            <Image src="/images/logo/Lakme-Logo.png" alt="logo" />
          </div>
          <div className={styles.text}>
            <h2 data-aos="fade-up">Expert Training from Lakme Academy</h2>
            <hr data-aos="fade-up" />
            <p className={fonts.montserrat} data-aos="fade-up">
              Our expertise is not just a result of experience. it is also
              backed by professional training. We are proud alumni of the
              renowned Lakme Academy, a leading name in the beauty products
              industry. Under their guidance, we mastered the techniques and
              nuances of makeup application, ensuring that our clients receive
              nothing but the best.
            </p>
            <br />
            <div data-aos="fade-up">
              <CustomButton
                clickHandler={() => {
                  router.replace("reviews");
                }}
              >
                View Our Customer&apos;s Reviews
              </CustomButton>
            </div>
          </div>
        </div>

        

        <div className={`${styles.content} ${styles.left}`}>
          <div className={styles.img} data-aos="fade-up">
            <Image src="/images/about/prod.jpg" alt="image" />
          </div>
          <div className={styles.text} data-aos="fade-up">
            <h2>Premium Quality Products</h2>
            <hr />
            <p className={fonts.montserrat}>
              At SK Beauty-Verse, quality is our top priority. We understand
              that makeup is an art, and just like any artist needs high-quality
              paints, we rely on branded and top-tier products to create our
              masterpieces. We use only the finest makeup products that are
              gentle on the skin, ensuring a flawless finish that lasts
              throughout the day and night.
            </p>
            <br />
            <CustomButton
              clickHandler={() => {
                router.replace("reviews");
              }}
            >
              View Our Customer&apos;s Reviews
            </CustomButton>
          </div>
        </div>
        <div className={`${styles.content} `} data-aos="fade-up">
          <div className={styles.img}>
            <Image src="/images/gallery/1 (1).jpg" alt="image" />
          </div>
          <div className={styles.text}>
            <h2>Your Special Day, Our Expertise</h2>
            <hr />
            <p className={fonts.montserrat}>
              We specialize in <span className={fonts.petit}>bridal</span>
              makeup and have the expertise to bring out the natural beauty of
              brides. Our goal is to make you feel confident, radiant, and
              absolutely stunning on your wedding day. We understand the
              importance of this day, and we work closely with our clients to
              understand their preferences, ensuring that the final look
              complements their personality and style.
            </p>
            <br />
            <CustomButton
              clickHandler={() => {
                router.replace("gallery/bridal");
              }}
            >
              View Our Gallery
            </CustomButton>
            <br />
            <br />
            <h2>More Than Just Makeup - A Universe of Beauty</h2>
            <hr />
            <p className={fonts.montserrat}>
              SK Beauty-Verse is not just a makeup service; it is an experience.
              We believe in the power of makeup to enhance confidence and bring
              out the best in everyone. Our dedication to our craft and our
              clients has earned us the reputation of being a universe of
              beauty. It is not just about makeup for us. it is about creating a
              universe where every individual feels beautiful, inside and out.
              Our slogan,{" "}
              <span className={fonts.petit}>
                &quot;Your Universe of Beauty&quot;
              </span>
              , embodies this philosophy.
            </p>
            <br />
            <CustomButton
              clickHandler={() => {
                router.replace("contact");
              }}
            >
              Contact Us Now
            </CustomButton>
          </div>
        </div>
      </CustomSection>
    </CustomContainer>
  );
};

export default AboutScreen;



