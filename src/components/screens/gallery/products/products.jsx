import { useState } from "react";
import styles from "./products.module.scss";
import { Eye } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";
const Products = (props) => {
  // Jewels, makeup, Skin, hair

  const { images, SetCurrentFullViewImageIndex } = props;
  

  const tabs = [
    {
      name: "Jewels",
    },
    {
      name: "Makeup",
    },
    {
      name: "Skin",
    },
    {
      name: "Hair",
    },
  ];


  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div>
      <div>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <div
              key={tab.name}
              className={`${styles.tab} ${
                currentTab.name === tab.name && styles.active
              }`}
              onClick={() => {
                setCurrentTab(tab);
              }}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <div>
        <div className={styles.wrapper}>
          {images
            ?.filter((i) => i.subCategory === currentTab.name)
            ?.sort((a, b) => {
              return a.index - b.index;
            })
            ?.map((img, i) => (
              <div key={i} className={styles.img_holder}>
                <div
                  onClick={() => {
                    SetCurrentFullViewImageIndex(img);
                  }}
                >
                  <Eye />
                </div>
                <Image
                  src={img.url.replace("upload", "upload/w_400,f_auto")}
                  alt="a"
                  fluid
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
