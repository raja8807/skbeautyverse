const { Container } = require("react-bootstrap");
import styles from './custom_container.module.scss'

const CustomContainer = (props) => {
  const { children, className } = props;

  return (
  <div className={styles.wrap}>
      <Container className={`${className} ${styles.custom_container}`}>
      {children}
    </Container>
  </div>
  );
};

export default CustomContainer;
