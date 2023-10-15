const { Col, Image } = require("react-bootstrap");
import { Eye } from "react-bootstrap-icons";
import styles from "./category.module.scss";
import { useRouter } from "next/router";
const Category = (props) => {
  const { data, index } = props;

  const router = useRouter();

  const animations = {
    a_0: "fade-down-right",
    a_1: "fade-down-left",
    a_2: "fade-up-right",
    a_3: "fade-up-left",
  };

  return (
    <Col xs={6} sm={6} lg={3} data-aos={animations[`a_${index}`]}>
      <div className={styles.category_box}>
        <div className={styles.overlay}>
          <div
            onClick={() => {
              router.push(`/gallery/${data.id}`);
            }}
          >
            <Eye />
          </div>
          {/* <div>
            <Eye />
          </div>
          <div>
            <Eye />
          </div> */}
        </div>
        <Image src={data.imgSrc} alt="xx" fluid />
        <p>{data.name}</p>
      </div>
    </Col>
  );
};

export default Category;
