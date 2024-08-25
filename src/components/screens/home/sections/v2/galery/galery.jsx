"use client";

import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";
import React from "react";
import { ImageGallery } from "react-image-grid-gallery";
import styles from "./galery.module.scss";

const GallerySection = ({ galleryImages = [] }) => {
  return (
    <div className={styles.GallerySection}>
      <CustomSection head="Our Gallery">
        <div data-aos="fade-up" className={styles.cont}>
          <CustomContainer>
            <div className={styles.x}>
              <div className={styles.wrap}>
                <ImageGallery
                  imagesInfoArray={galleryImages.map((gi) => {
                    return {
                      src: gi.url,
                      alt: "img",
                    };
                  })}
                  columnCount={"4"}
                  columnWidth={125}
                  gapSize={24}
                />
              </div>
            </div>
          </CustomContainer>
        </div>
      </CustomSection>
    </div>
  );
};

export default GallerySection;
