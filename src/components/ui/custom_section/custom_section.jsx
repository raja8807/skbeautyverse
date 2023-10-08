import fonts from "@/components/fonts/fonts";
import styles from "./custom_section.module.scss";

const CustomSection = (props) => {
  const { children, head, bg = "trans", caption } = props;

  return (
    <section className={`${styles.customContainer} ${styles[bg]}`}>
      <div className={styles.head}>
        {head && <h2 data-aos="fade-up" className={fonts.lora}>{head.toUpperCase()}</h2>}
        <p data-aos="zoom-in">{caption}</p>
      </div>
      {children}
    </section>
  );
};

export default CustomSection;
