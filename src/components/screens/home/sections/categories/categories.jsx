const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
import CustomSection from "@/components/ui/custom_section/custom_section";
import styles from "./categories.module.scss";
import { Col, Row } from "react-bootstrap";
import Category from "./category/category";

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
      </CustomContainer>
    </CustomSection>
  );
};

export default Categories;
