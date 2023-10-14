import { useState } from "react";
import styles from "./banner_form.module.scss";
import { Col, Image, Row, Spinner } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { ChevronLeft, ChevronRight, Trash3 } from "react-bootstrap-icons";

const BannerForm = ({ bannerImages }) => {
  const [images, setImages] = useState(bannerImages);
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState();
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  // ===============================================
  const initialArray = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Bob", age: 40 },
  ];

  const modifiedArray = [
    { id: 1, name: "Joh", age: 30 },
    { id: 2, name: "Jane", age: 26 },
    { id: 3, name: "Bob", age: 40 },
  ];

  // Define a function to check if objects have changed values
  function hasObjectChanged(initialObj, modifiedObj) {
    for (const key in initialObj) {
      if (initialObj[key] !== modifiedObj[key]) {
        return true;
      }
    }
    return false;
  }

  // Use the filter method to get objects with changed values
  const changedObjects = modifiedArray.filter((modifiedObj) => {
    const correspondingInitialObj = initialArray.find(
      (initialObj) => initialObj.id === modifiedObj.id
    );
    return hasObjectChanged(correspondingInitialObj, modifiedObj);
  });

  console.log(changedObjects);

  // ===============================================

  const deleteImage = (id) => {
    setImages((prev) => {
      const newImages = prev.filter((i) => i._id !== id);
      return newImages.map((img, i) => ({ ...img, index: i }));
    });
  };

  const saveImages = async (imagesData) => {
    setIsSaveLoading(true);
    try {
      const saveRes = await fetch("/api/bannerImage", {
        method: "POST",
        body: JSON.stringify(imagesData),
      });
      await saveRes.json();
      setImages(imagesData);
      // console.log(saveData);
      // return saveDa;
    } catch (error) {
      console.log(error);
    }
    setIsSaveLoading(false);
  };

  const uploadImage = async (file) => {
    setIsSaveLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "banner_image");
      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dm0mza7qt/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadData = await uploadRes.json();
      const newImgs = images.map((i) => ({ ...i, index: i.index + 1 }));
      const toSave = [{ url: uploadData.url, index: 0 }, ...newImgs];
      await saveImages(toSave);
      setNewImage(null);
    } catch (err) {
      console.log(err);
    }
    setIsSaveLoading(false);
  };

  const maxImages = 5;

  return (
    <div className={styles.bannerForm}>
      {isSaveLoading && (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}
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
                if (file.size > 512000 * 4) {
                  setError("File Size More Than 2MB");
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
                <div key={image.id} xs={6} md={3} className={styles.imgWrap}>
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
                  <Image
                    src={image.url.replace("upload", "upload/w_200,f_auto")}
                    alt="xx"
                    fluid
                  />
                </div>
              ))}
        </Row>
        <br />
        <CustomButton
          type="gold"
          clickHandler={async () => {
            await saveImages(images);
          }}
        >
          Save
        </CustomButton>
        <br />
        <br />
      </div>
      <hr />
    </div>
  );
};

export default BannerForm;
