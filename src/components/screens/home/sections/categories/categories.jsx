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

     
    </>
  );
};

export default Categories;
