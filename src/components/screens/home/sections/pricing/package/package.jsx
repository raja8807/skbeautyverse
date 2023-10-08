import styles from "./package.module.scss";

const Package = (props) => {
  const { head, price, body,idx } = props;

  return (
    <div className={styles.package}>
      <div className={styles.top}>{head}</div>
      <div className={`${styles.body} ${idx === 1 && styles.center}`}>
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <p className={styles.bottom}>Rs. {price}/-</p>
    </div>
  );
};

export default Package;
