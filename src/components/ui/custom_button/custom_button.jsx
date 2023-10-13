import styles from "./custom_button.module.scss";

const CustomButton = (props) => {
  const { children, type = "primary", clickHandler = () => {} } = props;

  return (
    <button
      className={`${styles.custom_button} ${styles[type]}`}
      onClick={(e) => {
        clickHandler(e);
      }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
