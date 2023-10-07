const { Col, Image } = require("react-bootstrap");
import { Eye } from "react-bootstrap-icons";
import styles from "./category.module.scss";

const Category = (props) => {
  const { data, index } = props;

  return (
    <Col xs={12} sm={6} lg={3} data-aos={index % 2 === 0 ? "fade-right" : 'fade-left'}>
      <div className={styles.category_box}>
        <div className={styles.overlay}>
          <div>
            <Eye />
          </div>
          <div>
            <Eye />
          </div>
          <div>
            <Eye />
          </div>
        </div>
        <Image src={data.imgSrc} alt="xx" fluid />
        <p>{data.name}</p>
      </div>
    </Col>
  );
};

export default Category;
