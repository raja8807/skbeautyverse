const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
const { Row, Col } = require("react-bootstrap");
import CustomButton from "@/components/ui/custom_button/custom_button";
import styles from "./profiles.module.scss";
import Link from "next/link";
const Profiles = ({ profileData }) => {
  return (
    <CustomContainer>
      <Row>
        {profileData.map((pro) => {
          if (pro.count > 0) {
            return (
              <Col
                className={styles.col}
                key={pro.profession}
                data-aos="fade-up"
              >
                {pro.profession !== 'Student' ? (
                  <Link href={`/search?p=${pro.profession}`}>
                    <div className={styles.profile}>
                      <p className={styles.number}>{pro.count}</p>
                      <p className={styles.pro}>{pro.profession}</p>
                    </div>
                  </Link>
                ) : (
                  <div className={styles.profile}>
                    <p className={styles.number}>{pro.count}</p>
                    <p className={styles.pro}>{pro.profession}</p>
                  </div>
                )}
              </Col>
            );
          }
        })}
      </Row>
    </CustomContainer>
  );
};

export default Profiles;
