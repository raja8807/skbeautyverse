import { useState } from "react";
import styles from "./gallery_form.module.scss";
import { Col, Image, Row, Spinner } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { ChevronLeft, ChevronRight, Trash3 } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import CustomSelect from "@/components/ui/custom_select/custom_select";
import categories from "@/components/constants/categories";

const BannerForm = ({ galleryImages = [] }) => {
  const [images, setImages] = useState(galleryImages);
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState();
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [initialImages, setInitialImages] = useState(galleryImages);

  const router = useRouter();
  const deleteImage = (id) => {
    setImages((prev) => {
      const newImages = prev.filter((i) => i._id !== id);
      return newImages.map((img, i) => ({ ...img, index: i }));
    });
  };

  const getModified = (initialArray, newArray) => {
    if (newArray.length !== initialArray.length) {
      return newArray;
    } else {
      const modified = [];
      for (let i = 0; i < initialArray.length; i++) {
        for (let key in initialArray[i]) {
          if (initialArray[i][key] !== newArray[i][key]) {
            modified.push(newArray[i]);
            break;
          }
        }
      }
      for (let i = 0; i < newArray.length; i++) {
        for (let key in newArray[i]) {
          if (initialArray[i][key] !== newArray[i][key]) {
            modified.push(newArray[i]);
            break;
          }
        }
      }

      const listOfTags = [...modified],
        keys = ["_id", "index", "url"],
        filtered = listOfTags.filter(
          (
            (s) => (o) =>
              ((k) => !s.has(k) && s.add(k))(keys.map((k) => o[k]).join("|"))
          )(new Set())
        );
      return filtered;
    }
  };

  const saveImages = async (imagesData) => {
    const isModified = getModified(initialImages, imagesData).length > 0;
    if (isModified) {
      setIsSaveLoading(true);
      try {
        const saveRes = await fetch(
          `/api/galleryImage?q=${router?.query?.category}`,
          {
            method: "POST",
            body: JSON.stringify(imagesData),
          }
        );
        await saveRes.json();
        setImages(imagesData);
        setInitialImages(imagesData);
      } catch (error) {
        console.log(error);
      }
      setIsSaveLoading(false);
    }
  };

  const uploadImage = async (file) => {
    setIsSaveLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gallery_image");
      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dm0mza7qt/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadData = await uploadRes.json();
      const newImgs = images.map((i) => ({ ...i, index: i.index + 1 }));
      const toSave = [
        { url: uploadData.url, index: 0, category: router.query.category },
        ...newImgs,
      ];
      await saveImages(toSave);
      setNewImage(null);
    } catch (err) {
      console.log(err);
    }
    setIsSaveLoading(false);
  };

  const maxImages = 100;

  const allCategories = [
    ...categories.map((c) => ({ text: c.name, value: c.id })),
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    router?.query?.category || allCategories[0].text
  );

  return (
    <div className={styles.bannerForm}>
      <CustomSelect
        value={selectedCategory}
        options={allCategories}
        onChange={(v) => {
          router.push(`/admin/g/${v}`);
          setSelectedCategory(v);
        }}
      />
      {isSaveLoading && (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}
      {error}
      {images?.length < maxImages && (
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
          {newImage && (
            <Image
              src={URL.createObjectURL(newImage)}
              fluid
              alt="new"
              style={{ width: "300px" }}
            />
          )}
          {newImage && (
            <CustomButton
              clickHandler={() => {
                uploadImage(newImage);
              }}
            >
              Upload
            </CustomButton>
          )}
        </div>
      )}
      <br />
      <div className={styles.imageWrapper}>
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
                  src={image.url.replace("upload", "upload/w_145,f_auto")}
                  alt="xx"
                  fluid
                />
              </div>
            ))}
        <br />
      </div>
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
  );
};

export default BannerForm;
