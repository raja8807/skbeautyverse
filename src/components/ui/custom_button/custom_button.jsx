import styles from "./custom_button.module.scss";

const CustomButton = ({
  children,
  type = "primary",
  clickHandler = () => {},
  disabled,
  btnType = "button",
}) => {
  return (
    <button
      type={btnType}
      className={`${styles.custom_button} ${styles[type]}`}
      onClick={(e) => {
        clickHandler(e);
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;
