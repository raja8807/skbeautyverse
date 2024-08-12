import fonts from "@/components/fonts/fonts";
import styles from "./custom_section.module.scss";

const CustomSection = ({
  children,
  head,
  bg = "trans",
  caption,
  noPadding,
}) => {
  return (
    <section className={`${styles.customContainer} ${styles[bg]}`}>
      <div className={`${styles.head} ${noPadding && styles.noPadding}`}>
        {head && <h2 data-aos="fade-up">{head.toUpperCase()}</h2>}
        <p data-aos="zoom-in">{caption}</p>
      </div>
      {children}
    </section>
  );
};

export default CustomSection;
