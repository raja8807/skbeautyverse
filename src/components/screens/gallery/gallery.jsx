import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Image } from "react-bootstrap";
import styles from "./gallery.module.scss";
import FullViewImage from "./full_view/full_view";
import { useState } from "react";
import CustomSection from "@/components/ui/custom_section/custom_section";
import { Eye } from "react-bootstrap-icons";

const GalleryScreen = () => {
  const allImages = [];

  for (var i = 1; i <= 42; i++) {
    const img = `images/gallery/1 (${i}).jpg`;
    allImages.push(img);
  }

  const [currentFullViewImageIndex, SetCurrentFullViewImageIndex] =
    useState(null);

  // console.log(currentFullViewImageIndex);

  return (
    <>
      <CustomContainer>
        <br />
        <CustomSection head="Our Gallery" noPadding />

        <div className={styles.wrapper}>
          {allImages?.map((src, i) => (
            <div key={i} className={styles.img_holder}>
              <div
                onClick={() => {
                  SetCurrentFullViewImageIndex(i);
                }}
              >
                <Eye />
              </div>
              <Image src={src} alt="a" fluid />
            </div>
          ))}
        </div>
      </CustomContainer>
      {currentFullViewImageIndex !== null && (
        <FullViewImage
          currentFullViewImageIndex={currentFullViewImageIndex}
          SetCurrentFullViewImageIndex={SetCurrentFullViewImageIndex}
          allImages={allImages}
        />
      )}
    </>
  );
};

export default GalleryScreen;
