const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
import CustomSection from "@/components/ui/custom_section/custom_section";
import styles from "./categories.module.scss";
import { Col, Row } from "react-bootstrap";
import Category from "./category/category";
import CustomButton from "@/components/ui/custom_button/custom_button";

const Categories = () => {
  const categories = [
    {
      name: "Category Name 1",
      imgSrc: "/images/categories/1.jpg",
    },
    {
      name: "Category Name 2",
      imgSrc: "/images/categories/1.jpg",
    },
    {
      name: "Category Name 3",
      imgSrc: "/images/categories/1.jpg",
    },
    {
      name: "Category Name 4",
      imgSrc: "/images/categories/1.jpg",
    },
  ];

  return (
    <CustomSection
      head="Categories"
      bg="gold"
      caption="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt dolores
    vero corrupti sequi deleniti esse impedit, alias in sapiente quia,
    fugiat obcaecati maiores aliquam asperiores ipsa facilis magni
    dignissimos. Quis?"
    >
      <CustomContainer>
        <Row>
          {categories.map((c, i) => (
            <Category key={c.name} data={c} index={i} />
          ))}
        </Row>
        <div className={styles.btn}>
          <CustomButton type="black">View Our Gallery</CustomButton>
        </div>
      </CustomContainer>
    </CustomSection>
  );
};

export default Categories;
