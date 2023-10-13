import { useState } from "react";
import styles from "./banner_form.module.scss";
import { Col, Image, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { ChevronLeft, ChevronRight, Trash3 } from "react-bootstrap-icons";
import PackageForm from "./package_form/package_form";

const BannerForm = () => {
  const src =
    "https://image.wedmegood.com/resized-nw/600X/wp-content/uploads/2019/03/1539960377_BBB_MG_6768_WCI_copy.jpg";

  const [images, setImages] = useState([
    {
      _id: "1",
      url: src,
      index: 0,
    },
    {
      _id: "2",
      url: "https://i.pinimg.com/originals/a0/39/85/a039857f6cbff84f489b14f2d2d031fb.jpg",
      index: 1,
    },
    {
      _id: "3",
      url: src,
      index: 2,
    },
    {
      _id: "4",
      url: "https://i.pinimg.com/originals/a0/39/85/a039857f6cbff84f489b14f2d2d031fb.jpg",
      index: 3,
    },
  ]);

  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState();

  const deleteImage = (id) => {
    setImages((prev) => {
      const newImages = prev.filter((i) => i._id !== id);
      return newImages.map((img, i) => ({ ...img, index: i }));
    });
  };

  const uploadImage = (file) => {
    setImages((prev) => {
      const imgs = [...prev];
      const newImgs = imgs.map((i) => ({ ...i, index: i.index + 1 }));
      return [
        { _id: Math.random(), url: URL.createObjectURL(file), index: 0 },
        ...newImgs,
      ];
    });
    setNewImage(null);
  };

  const maxImages = 4;

  return (
    <div className={styles.bannerForm}>
      {error}
      {images.length < maxImages && (
        <div className={styles.upload}>
          <input
            type="file"
            max="1"
            onChange={(e) => {
              setError(null);
              setNewImage(null);
              const file = e.target.files[0];
              if (file) {
                if (!file.type.includes("image")) {
                  setError("Not Valid File");
                  return;
                }
                if (file.size > 512000) {
                  setError("File Size More Than 500kb");
                  return;
                }
                setNewImage(file);
              }
            }}
          />
          <br />
          {newImage && (
            <Image
              src={URL.createObjectURL(newImage)}
              fluid
              alt="new"
              style={{ width: "300px" }}
            />
          )}
          <br />
          <br />
          {newImage && (
            <CustomButton
              clickHandler={() => {
                uploadImage(newImage);
              }}
            >
              Upload
            </CustomButton>
          )}
          <br />
        </div>
      )}
      <br />
      <div className={styles}>
        <Row key={images}>
          {images &&
            images
              .sort((a, b) => {
                return a.index - b.index;
              })
              .map((image, i) => (
                <Col key={image.id} xs={6} md={3} className={styles.imgWrap}>
                  {/* {image.index} */}
                  <Trash3
                    className={styles.trash}
                    onClick={() => {
                      deleteImage(image._id);
                    }}
                  />
                  {i !== 0 && (
                    <ChevronLeft
                      className={styles.left}
                      onClick={() => {
                        setImages((prev) => {
                          const prevImgs = [...prev];
                          prevImgs[i].index = i - 1;
                          prevImgs[i - 1].index = i;
                          return prevImgs;
                        });
                      }}
                    />
                  )}

                  {i !== images.length - 1 && (
                    <ChevronRight
                      className={styles.right}
                      onClick={() => {
                        setImages((prev) => {
                          const prevImgs = [...prev];
                          prevImgs[i].index = i + 1;
                          prevImgs[i + 1].index = i;
                          return prevImgs;
                        });
                      }}
                    />
                  )}
                  <Image src={image.url} alt="xx" fluid />
                </Col>
              ))}
        </Row>
        <br />
        <CustomButton>Save</CustomButton>
        <br />
        <br />
      </div>
      <hr/>
      <PackageForm/>
    </div>
  );
};

export default BannerForm;
