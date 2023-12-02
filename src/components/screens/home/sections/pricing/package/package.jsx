import { useRouter } from "next/router";
import styles from "./package.module.scss";

const Package = (props) => {
  const { head, price, body, idx, setShowPopup } = props;

  const router = useRouter();

  return (
    <div className={styles.package} data-aos="flip-left">
      <div className={styles.top}>
        <p style={{ color: "#d8b74b" }}>{head}</p>
      </div>
      <div className={`${styles.body} ${idx === 1 && styles.center}`}>
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className={styles.bottom}>
        <p className={styles.price}>Rs. {price}/-</p>
        <p
          className={styles.enq}
          onClick={() => {
            router.replace("/book");
            // setShowPopup(`I want to know more about ${head}`)
          }}
        >
          Book Now
        </p>
      </div>
    </div>
  );
};

export default Package;
