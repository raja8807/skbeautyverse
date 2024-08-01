import styles from "./custom_button.module.scss";

const CustomButton = ({
  children,
  type = "primary",
  clickHandler = () => {},
  disabled,
  btnType = "button",
  variant,
}) => {
  return (
    <button
      type={btnType}
      className={`${styles.custom_button} ${styles[`v_${variant}`]}`}
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
