import { Image } from "react-bootstrap";
import styles from "./collection.module.scss";
import fonts from "@/components/fonts/fonts";
import CustomButton from "@/components/ui/custom_button/custom_button";

const Collection = () => {
  return (
    <div className={styles.about_section}>
      <div className={styles.left}>
        <div>
          <div>
            <p className={`${styles.head} ${fonts.lora}`}>LOOKING FOR THE LATEST</p>
            <h5 className={fonts.petit}>Trending Collection</h5>
            <p>
              Earring ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
<CustomButton type='black'>Enquire Now</CustomButton>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div>
          <Image
            src="https://image.wedmegood.com/resized-nw/600X/wp-content/uploads/2019/03/1539960377_BBB_MG_6768_WCI_copy.jpg"
            alt="xxx"
          />
        </div>
      </div>
    </div>
  );
};

export default Collection;
