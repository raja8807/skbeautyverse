import { Image } from "react-bootstrap";
import styles from "./about.module.scss";

const About = () => {
  return (
    <div className={styles.about_section}>
      <div className={styles.left}>
        <div>
          <div>content</div>
        </div>
      </div>
      <div className={styles.right}>
        <div>
          <Image
            src="https://image.wedmegood.com/resized-nw/600X/wp-content/uploads/2019/03/1539960377_BBB_MG_6768_WCI_copy.jpg"
            alt="xxx"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
