import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Image } from "react-bootstrap";
import styles from "./gallery.module.scss";
import FullViewImage from "./full_view/full_view";
import { useState } from "react";
import CustomSection from "@/components/ui/custom_section/custom_section";
import { Eye } from "react-bootstrap-icons";
import CustomSelect from "@/components/ui/custom_select/custom_select";
import categories from "@/components/constants/categories";
import { useRouter } from "next/router";
import { useEffect } from "react";

const GalleryScreen = (props) => {
  const { images } = props;
  const [allImages, setAllImages] = useState([]);
  // const [isLoading,setIsLoading] = useState(false)
  
  
  useEffect(() => {
    setAllImages(images.map((img) => img.download_url));
  }, [images]);
  
  const router = useRouter();

  const [currentFullViewImageIndex, SetCurrentFullViewImageIndex] =
    useState(null);

  const allCategories = [
    { text: "All", value: "all" },
    ...categories.map((c) => ({ text: c.name, value: c.id })),
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    router?.query?.category || allCategories[0].text
  );

  return (
    <>
      <CustomContainer>
        <br />
        <CustomSection head="Our Gallery" noPadding />
        <CustomSelect
          value={selectedCategory}
          options={allCategories}
          onChange={(v) => {
            router.push(`/gallery/${v}`);
            setSelectedCategory(v);
          }}
        />
        <br />
        <br />
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
