import { useEffect, useState } from "react";
import styles from "./cutomer_profile.module.scss";
import { Clipboard, PencilSquare, PersonFill } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";
let country_state_district = require("@coffeebeanslabs/country_state_district");

const CustomerProfile = ({
  customer,
  user,
  updateCustomer,
  isLoading,
  error,
  setFile,
}) => {
  const [values, setValues] = useState({
    displayName: user.name,
    phone: customer.photoURL,
    location: user.location,
  });

  useEffect(() => {
    setValues({
      displayName: user.name,
      phone: customer.photoURL,
      location: user.location,
    });
  }, [customer, user.name]);

  const [imageUrl, setImageUrl] = useState(user.imageUrl);
  const [editImageMode, setEditImageMode] = useState(false);
  let districts = country_state_district.getDistrictsByStateId(32);
  return (
    <div className={styles.customerProfile}>
      <div className={styles.top}>
        <p>My Profile</p>
        <p>{isLoading && "loading"}</p>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await updateCustomer(
            values.displayName,
            values.phone,
            imageUrl,
            undefined,
            values.location
          );
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
          <label>Location</label>
          <select
            value={values.location}
            onChange={(e) => {
              const { value } = e.target;
              setValues((prev) => ({ ...prev, location: value }));
            }}
          >
            <option value="">Select location</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
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
