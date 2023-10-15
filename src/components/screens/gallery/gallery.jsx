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
  const [allImages, setAllImages] = useState(images || []);

  const router = useRouter();

  const [currentFullViewImageIndex, SetCurrentFullViewImageIndex] =
    useState(null);

  const allCategories = [
    ...categories.map((c) => ({ text: c.name, value: c.id })),
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    router?.query?.category || allCategories[0].text
  );

  // Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident culpa vel ipsum dignissimos aliquam animi quos deleniti veritatis voluptatibus beatae quas, rem dolorem quo soluta, odit at inventore ratione consequuntur labore, repudiandae eum. Eaque, minima quidem. Magnam aut architecto velit doloremque, odit alias fugiat magni eos laudantium totam deserunt error, cum rerum! Eligendi in impedit accusantium fuga adipisci distinctio incidunt nemo ea, amet rem laborum a blanditiis assumenda ut. Expedita natus amet, voluptate totam minima beatae fuga, id explicabo officia itaque odio iste adipisci perspiciatis at omnis consequuntur? Commodi saepe reiciendis odit assumenda suscipit quae! Officiis nesciunt nisi animi ipsa.

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
          {allImages
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
          allImages={allImages}
        />
      )}
    </>
  );
};

export default GalleryScreen;
