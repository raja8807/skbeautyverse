import { useEffect, useState } from "react";
import styles from "./cutomer_profile.module.scss";
import axios from "axios";
import firebase from "firebase/compat/app";
import { useRouter } from "next/router";
import { Clipboard, PencilSquare, PersonFill } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";

const CustomerProfile = ({ customer, user }) => {
  const [values, setValues] = useState({
    displayName: user.name,
    phone: customer.photoURL,
  });

  useEffect(() => {
    setValues({
      displayName: user.name,
      phone: customer.photoURL,
    });
  }, [customer, user.name]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState(user.imageUrl);
  const [editImageMode, setEditImageMode] = useState(false);
  const [file, setFile] = useState(null);
  const router = useRouter();

  const updateCustomer = async (displayName, phoneNumber) => {
    setIsLoading(true);
    setError(false);
    try {
      if (customer.uid) {
        let newUrl = imageUrl;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "user_image");
          const uploadRes = await fetch(
            "https://api.cloudinary.com/v1_1/dm0mza7qt/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const uploadData = await uploadRes.json();
          newUrl = uploadData.url;
        }

        await axios.put("/api/customer", {
          name: displayName,
          phoneNumber,
          email: customer.email,
          customerId: customer.uid,
          imageUrl: newUrl,
        });

        if (user.phoneNumber !== phoneNumber) {
          await firebase.auth().currentUser.updateProfile({
            photoURL: phoneNumber,
          });
        }
      }
      setError(false);
      setIsLoading(false);
      router.reload();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <div className={styles.customerProfile}>
      <div className={styles.top}>
        <p>My Profile</p>
        <p>{isLoading && "loading"}</p>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await updateCustomer(values.displayName, values.phone);
        }}
      >
        <div className={styles.imgHolder}>
          {imageUrl ? (
            <Image src={imageUrl} alt="xx" fluid className={styles.img} />
          ) : (
            <PersonFill className={styles.placeholder} />
          )}
          <PencilSquare
            className={styles.edit}
            onClick={() => {
              setEditImageMode(true);
            }}
          />
        </div>

        {editImageMode && (
          <div>
            <input
              type="file"
              max="1"
              maxLength="1"
              id="img"
              onChange={(e) => {
                const newImg = e.target.files[0];
                if (newImg.type.includes("image")) {
                  setImageUrl(URL.createObjectURL(newImg));
                  setFile(newImg);
                } else {
                  document.getElementById("img").value = "";
                }
              }}
            />
            <input
              type="button"
              value="Cancel"
              onClick={() => {
                setImageUrl(user.photoUrl);
                setEditImageMode(false);
              }}
            />
          </div>
        )}

        <div>
          <label>Name</label>
          <input
            placeholder="Name"
            value={values.displayName}
            onChange={(e) => {
              const { value } = e.target;
              setValues((prev) => ({ ...prev, displayName: value }));
            }}
            required
            minLength="5"
            maxLength="100"
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            placeholder="Phone"
            value={values.phone}
            onChange={(e) => {
              const { value } = e.target;
              setValues((prev) => ({ ...prev, phone: value }));
            }}
            required
            minLength="10"
            maxLength="10"
          />
        </div>
        <div>
          <label>User Name</label>
          <input placeholder="Phone" value={user.userName} disabled />
        </div>
        <div>
          <label>Profile URL</label>
          <input
            placeholder="Phone"
            value={`www.skbeautyverse.com/profile/${user.userName}`}
            disabled
          />
          <Clipboard
            className={styles.clip}
            onClick={() => {
              navigator.clipboard.writeText(
                `www.skbeautyverse.com/mua/${user.userName}`
              );
            }}
          />
        </div>
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default CustomerProfile;
