import styles from "./custom_section.module.scss";

const CustomSection = (props) => {
  const { children, head, bg = "trans" } = props;

  return (
    <section className={`${styles.customContainer} ${styles[bg]}`}>
      <div className={styles.head}>
        <h2>{head}</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt dolores
          vero corrupti sequi deleniti esse impedit, alias in sapiente quia,
          fugiat obcaecati maiores aliquam asperiores ipsa facilis magni
          dignissimos. Quis?
        </p>
      </div>

      {children}
    </section>
  );
};

export default CustomSection;
