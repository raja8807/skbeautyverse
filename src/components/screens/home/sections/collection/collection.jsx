import { Image } from "react-bootstrap";
import styles from "./collection.module.scss";
import fonts from "@/components/fonts/fonts";
import CustomButton from "@/components/ui/custom_button/custom_button";

const Collection = ({setShowPopup}) => {
  return (
    <div className={styles.about_section}>
      <div className={styles.left}>
        <div>
          <div>
            <p className={`${styles.head} ${fonts.lora}`}>
              LOOKING FOR THE LATEST
            </p>
            <h5 className={fonts.petit}>Bridal Makeover</h5>
            <p>
              Your wedding day is as unique as you are. Trust us to make you
              look and feel like royalty on your special day. Our bridal
              packages are tailored to match your dreams.
            </p>
            <CustomButton type="black"
            clickHandler={()=>{
              setShowPopup('adin')
            }}
            >Enquire Now</CustomButton>
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
