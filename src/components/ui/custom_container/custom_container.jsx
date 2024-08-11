const { Container } = require("react-bootstrap");
import styles from "./custom_container.module.scss";

const CustomContainer = ({ children, className, ...props }) => {
  return (
    <div className={styles.wrap} {...props}>
      <Container className={`${className} ${styles.custom_container}`}>
        {children}
      </Container>
    </div>
  );
};

export default CustomContainer;
