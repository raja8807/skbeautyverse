import { Image } from "react-bootstrap";
import styles from "./customer_gallery.module.scss";
import { Eye } from "react-bootstrap-icons";
import { useState } from "react";
import axios from "axios";

const CustomerGallery = ({ profile, images, readOnly }) => {
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const [imageData, setImagesData] = useState(images);
  const [isLoading, setILoading] = useState(false);

  // console.log();

  const handleUpload = async () => {
    setILoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "user_gallery_image");
        const uploadRes = await fetch(
          "https://api.cloudinary.com/v1_1/dm0mza7qt/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadData = await uploadRes.json();
        const newUrl = uploadData.url;
        const newImg = {
          url: newUrl,
          customerId: profile.customerId,
          userName: profile.userName,
        };

        const res = await axios.post("/api/muaImage", newImg);
        setImagesData((prev) => [{ ...newImg, _id: Math.random() }, ...prev]);
        document.getElementById("img").value = "";
        setFile(null);
        setImgUrl(null);
      }
    } catch (err) {
      console.log(err);
    }
    setILoading(false);
  };

  return (
    <div className={styles.customerGalley}>
      {!readOnly && (
        <div className={styles.upload}>
          <input
            type="file"
            max="1"
            maxLength="1"
            id="img"
            onChange={(e) => {
              const newImg = e.target.files[0];
              if (newImg.type.includes("image") && newImg.size < 512000 * 10) {
                setImgUrl(URL.createObjectURL(newImg));
                setFile(newImg);
              } else {
                document.getElementById("img").value = "";
              }
            }}
          />
          {imgUrl && (
            <div className={styles.preview}>
              <Image src={imgUrl} alt="xx" width={300} />
              <input type="Submit" onClick={handleUpload} />
              {isLoading && <p>Loading...</p>}
            </div>
          )}
        </div>
      )}
      <div className={styles.wrapper}>
        {imageData.map((img) => (
          <div className={styles.img} key={img._id}>
            <div className={styles.overlay}>
              <Eye />
            </div>
            <Image fluid src={img.url} alt="xx" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerGallery;
