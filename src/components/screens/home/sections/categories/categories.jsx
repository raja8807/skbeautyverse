const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
import CustomSection from "@/components/ui/custom_section/custom_section";
import styles from "./categories.module.scss";
import { Col, Row } from "react-bootstrap";
import Category from "./category/category";
import CustomButton from "@/components/ui/custom_button/custom_button";
import categories from "@/components/constants/categories";
import { useRouter } from "next/router";
import Script from "next/script";

const Categories = () => {
  const router = useRouter();

  return (
    <>
      <CustomSection
        head="Categories"
        bg="gold"
        caption="Explore our beauty realms! From enchanting bridal transformations to glamorous evening looks, discover the perfect makeup artistry for every occasion. Dive into elegance today!"
      >
        <CustomContainer>
          <Row>
            {categories.map((c, i) => (
              <Category key={c.name} data={c} index={i} />
            ))}
          </Row>
          <div className={styles.btn}>
            <CustomButton
              type="black"
              clickHandler={() => {
                router.push("/gallery/bridal");
              }}
            >
              View Our Gallery
            </CustomButton>
          </div>
        </CustomContainer>
      </CustomSection>

      <CustomContainer>
        <iframe
          src="https://www.instagram.com/skbeautyverse/embed"
          // width="2000"
          style={{ width: "100%" , padding:'50px 0',height:'600px',overflow:'auto'}}
          // height="700"
          frameborder="0"
          scrolling="no"
          allowtransparency="true"
        ></iframe>
      </CustomContainer>
      {/* <div class="iframely-embed">
        <div
          class="iframely-responsive"
          
          style={{height: '140px', paddingBottom: 0}}
        >
          <a
            href="https://www.instagram.com/skbeautyverse/"
            data-iframely-url="//iframely.net/5zpb8nW"
          ></a>
        </div>
      <Script async defer src="//iframely.net/embed.js"></Script>

      </div> */}
    </>
  );
};

export default Categories;
