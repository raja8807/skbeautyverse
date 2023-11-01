import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Image } from "react-bootstrap";
import styles from "./gallery.module.scss";
import FullViewImage from "./full_view/full_view";
import { useState } from "react";
import CustomSection from "@/components/ui/custom_section/custom_section";
import { Eye} from "react-bootstrap-icons";
import CustomSelect from "@/components/ui/custom_select/custom_select";
import categories from "@/components/constants/categories";
import { useRouter } from "next/router";

const GalleryScreen = (props) => {
  const { images=[] } = props;
  const router = useRouter();

  const [currentFullViewImageIndex, SetCurrentFullViewImageIndex] =
    useState(null);

  const allCategories = [
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
          {images
            ?.sort((a, b) => {
              return a.index - b.index;
            })
            ?.map((img, i) => (
              <div key={i} className={styles.img_holder}>
                <div
                  onClick={() => {
                    SetCurrentFullViewImageIndex(i);
                  }}
                >
                  <Eye />
                </div>
                <Image src={img.url.replace("upload", "upload/w_400,f_auto")} alt="a" fluid />
              </div>
            ))}
        </div>
      </CustomContainer>
      {currentFullViewImageIndex !== null && (
        <FullViewImage
          currentFullViewImageIndex={currentFullViewImageIndex}
          SetCurrentFullViewImageIndex={SetCurrentFullViewImageIndex}
          allImages={images}
        />
      )}
    </>
  );
};

export default GalleryScreen;
