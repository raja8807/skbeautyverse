const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
import CustomSection from "@/components/ui/custom_section/custom_section";
import styles from "./categories.module.scss";
import { Col, Row } from "react-bootstrap";
import Category from "./category/category";
import CustomButton from "@/components/ui/custom_button/custom_button";

const Categories = () => {
  return (
    <CustomSection head="Categories" bg="gold">
      <CustomContainer>
        <Row>
          <Category />
          <Category />
          <Category />
          <Category />
        </Row>
        <div className={styles.btn}>
          <CustomButton type="black">View Our Gallery</CustomButton>
        </div>
      </CustomContainer>
    </CustomSection>
  );
};

export default Categories;
