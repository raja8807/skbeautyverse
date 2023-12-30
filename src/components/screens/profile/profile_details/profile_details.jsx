import { Col, Image, Row } from "react-bootstrap";
import styles from "./profile_details.module.scss";
import {
  Clipboard,
  EnvelopeAt,
  GeoAlt,
  Telephone,
  Whatsapp,
} from "react-bootstrap-icons";
import Link from "next/link";

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
        <Row>
          <Col xs={12} md={4}>
            <div className={styles.imgHolder}>
              <Image
                src={profile.imageUrl || "/images/user.jpg"}
                alt="xx"
                fluid
                className={styles.img}
              />
            </div>
          </Col>

          <Col>
            <div className={styles.detRow}>
              <label>Phone</label>
              <input placeholder="Phone" value={profile.phoneNumber} disabled />
              <Link href={`tel:+91${profile.phoneNumber}`} target="_blank">
                <Telephone className={styles.clip} />
              </Link>

              <Link
                href={`https://wa.me/91${profile.phoneNumber}`}
                target="_blank"
              >
                <Whatsapp className={styles.clip} />
              </Link>
            </div>
            <div className={styles.detRow}>
              <label>Profession</label>
              <input
                placeholder="Not assigned"
                value={profile.profession}
                disabled
              />
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <GeoAlt className={styles.clip} />
              </Link>
            </div>
            {profile.designations && profile.designations[0] && (
              <div className={styles.detRow}>
                <label>Designation</label>
                <ul className={styles.list}>
                  {profile.designations.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className={styles.detRow}>
              <label>Location</label>
              <input
                placeholder="Not assigned"
                value={profile.location}
                disabled
              />
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <GeoAlt className={styles.clip} />
              </Link>
            </div>
            <div className={styles.detRow}>
              <label>Email</label>
              <input placeholder="Phone" value={profile.email} disabled />
              <Link href={`mailto:${profile.email}`} target="_blank">
                <EnvelopeAt className={styles.clip} />
              </Link>
            </div>
            <div className={styles.detRow}>
              <label>Profile URL</label>
              <input
                placeholder="Phone"
                value={`www.skbeautyverse.com/profile/${profile.userName}`}
                disabled
              />
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(
                    `www.skbeautyverse.com/mua/${profile.userName}`
                  );
                }}
              >
                <Clipboard className={styles.clip} />
              </Link>
            </div>
            {/* <input type="submit" value="Talk to me" /> */}
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default ProfileDetails;
