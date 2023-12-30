import { useEffect, useState } from "react";
import styles from "./cutomer_profile.module.scss";
import { Clipboard, PencilSquare, PersonFill } from "react-bootstrap-icons";
import { Col, Image, Row } from "react-bootstrap";
let country_state_district = require("@coffeebeanslabs/country_state_district");

const CustomerProfile = ({
  customer,
  user,
  updateCustomer,
  isLoading,
  setFile,
}) => {
  const [values, setValues] = useState({
    displayName: user.name,
    phone: customer.photoURL,
    location: user.location,
    profession: user.profession,
    designations: user.designations || [],
    instaUrl: user.instaUrl,
    isActive: user.isActive,
  });

  useEffect(() => {
    setValues({
      displayName: user.name,
      phone: customer.photoURL,
      location: user.location,
      profession: user.profession,
      designations: user.designations || [],
      instaUrl: user.instaUrl,
      isActive: user.isActive,
    });
  }, [customer, user.name]);

  console.log(values);

  const professions = ["Makeup Artist", "Photographer", "Student"];

  const desgnations = {
    "Makeup Artist": ["Makeup artist", "Assistant", "Hair Stylist", "Skin"],
    Photographer: ["Photographer", "Videographer"],
    Student: null,
  };

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
            values.location,
            values.profession,
            values.designations,
            values.instaUrl,
            values.isActive
          );
        }}
      >
        <Row>
          <Col xs={12} md={4}>
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
          </Col>

          <Col>
            <div className={styles.detRow}>
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
            <div className={styles.detRow}>
              <label>Profession</label>
              <select
                value={values.profession}
                onChange={(e) => {
                  const { value } = e.target;
                  setValues((prev) => ({
                    ...prev,
                    profession: value,
                    designations: [],
                  }));
                }}
              >
                <option value="">Select Profession</option>
                {professions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {values.profession && desgnations[values.profession] && (
              <div className={styles.detRow}>
                <label>Designation</label>
                <div className={styles.desHolder}>
                  {desgnations[values.profession].map((d) => (
                    <div className={styles.designation} key={d}>
                      <input
                        type="checkBox"
                        onChange={(e) => {
                          const { checked } = e.target;

                          setValues((prev) => {
                            if (checked) {
                              return {
                                ...prev,
                                designations: [...prev.designations, d],
                              };
                            } else {
                              return {
                                ...prev,
                                designations: prev.designations.filter(
                                  (x) => x !== d
                                ),
                              };
                            }
                          });
                        }}
                        checked={
                          values.designations && values.designations.includes(d)
                        }
                      />
                      <p>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.detRow}>
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

            <div className={styles.detRow}>
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

            <div className={styles.detRow}>
              <label>Instagram</label>
              <input
                placeholder="Phone"
                value={values.instaUrl}
                onChange={(e) => {
                  const { value } = e.target;
                  let url = value.split("?")[0];
                  if (url[url.length - 1]) {
                    url = url.slice(0, -1);
                  }
                  setValues((prev) => ({
                    ...prev,
                    instaUrl: url,
                  }));
                }}
                required
                minLength="20"
                pattern="^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_]{1,30}\/?$"
              />
            </div>

            <div className={styles.detRow}>
              <label>User Name</label>
              <input placeholder="Phone" value={user.userName} disabled />
            </div>
            <div className={styles.detRow}>
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

            <div className={styles.detRow}>
              <label>Status</label>
              <div className={styles.desHolder}>
                <div className={styles.designation}>
                  <input
                    checked={values.isActive}
                    type="checkBox"
                    onChange={(e) => {
                      const { checked } = e.target;
                      setValues((prev) => ({ ...prev, isActive: checked }));
                    }}
                  />
                  <p>Active</p>
                </div>
              </div>
            </div>

            <input type="submit" value="Update" />
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default CustomerProfile;
