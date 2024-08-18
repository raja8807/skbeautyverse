import Link from "next/link";
import styles from "./custom_button.module.scss";

const CustomButton = ({
  children,
  type = "primary",
  clickHandler = () => {},
  disabled,
  btnType = "button",
  variant,
  href,
  isNew,
}) => {
  if (href) {
    return (
      <Link href={href} target={isNew ? "_blank" : ""}>
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
      </Link>
    );
  }
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
