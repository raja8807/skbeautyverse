const { Image } = require("react-bootstrap");
import { ChevronLeft, ChevronRight, X } from "react-bootstrap-icons";
import styles from "./full_view.module.scss";

const FullViewImage = ({
  currentFullViewImageIndex,
  SetCurrentFullViewImageIndex,
  allImages,
}) => {
  return (
    <div className={styles.fullView}>
      {/* <CustomContainer> */}
      <div className={styles.top}>
        <X onClick={() => SetCurrentFullViewImageIndex(null)} />
      </div>
      <div className={styles.img}>
        {
            currentFullViewImageIndex != 0 && <ChevronLeft
            className={styles.left}
            onClick={() => {
              if (currentFullViewImageIndex != 0) {
                SetCurrentFullViewImageIndex((prev) => prev - 1);
              }
            }}
          />
        }
        <Image src={allImages[currentFullViewImageIndex]} alt="xx" fluid />
        {
            currentFullViewImageIndex !== allImages.length - 1 && <ChevronRight
            className={styles.right}
            onClick={() => {
              if (currentFullViewImageIndex !== allImages.length -1) {
                SetCurrentFullViewImageIndex((prev) => prev + 1);
              }
            }}
          />
        }
      </div>
      {/* </CustomContainer> */}
    </div>
  );
};

export default FullViewImage;
