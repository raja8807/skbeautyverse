import { Image } from "react-bootstrap";
import styles from "./profile_details.module.scss";
import { Clipboard, GeoAlt, Telephone, Whatsapp } from "react-bootstrap-icons";

const ProfileDetails = ({ profile }) => {
  return (
    <div className={styles.customerProfile}>
      <div className={styles.top}>
        <p>{profile.name}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={styles.imgHolder}>
          <Image
            src={profile.imageUrl || "/images/user.jpg"}
            alt="xx"
            fluid
            className={styles.img}
          />
        </div>

        <div>
          <label>Phone</label>
          <input placeholder="Phone" value={profile.phoneNumber} disabled />
          <Telephone
            className={styles.clip}
            onClick={() => {
              navigator.clipboard.writeText(
                `www.skbeautyverse.com/mua/${profile.userName}`
              );
            }}
          />
          <Whatsapp
            className={styles.clip}
            onClick={() => {
              navigator.clipboard.writeText(
                `www.skbeautyverse.com/mua/${profile.userName}`
              );
            }}
          />
        </div>
        <div>
          <label>Location</label>
          <input placeholder="Not assigned" value={profile.location} disabled />
          <GeoAlt className={styles.clip} />
        </div>
        <div>
          <label>User Name</label>
          <input placeholder="Phone" value={profile.userName} disabled />
          <Clipboard
            className={styles.clip}
            onClick={() => {
              navigator.clipboard.writeText(
                `www.skbeautyverse.com/mua/${profile.userName}`
              );
            }}
          />
        </div>
        <div>
          <label>Profile URL</label>
          <input
            placeholder="Phone"
            value={`www.skbeautyverse.com/profile/${profile.userName}`}
            disabled
          />
          <Clipboard
            className={styles.clip}
            onClick={() => {
              navigator.clipboard.writeText(
                `www.skbeautyverse.com/mua/${profile.userName}`
              );
            }}
          />
        </div>
        <input type="submit" value="Talk to me" />
      </form>
    </div>
  );
};

export default ProfileDetails;
