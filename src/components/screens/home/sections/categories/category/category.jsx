const { Col, Image } = require("react-bootstrap");
import { Eye } from "react-bootstrap-icons";
import styles from "./category.module.scss";

const Category = () => {
  return (
    <Col xs={12} sm={6} lg={3}>
      <div className={styles.category_box}>
        <div className={styles.overlay}>
          <div>
            <Eye/>
          </div>
          <div>
            <Eye/>
          </div>
          <div>
            <Eye/>
          </div>
        </div>
        <Image src="/images/categories/1.jpg" alt="xx" fluid />
        <p>Category Name</p>
      </div>
    </Col>
  );
};

export default Category;
