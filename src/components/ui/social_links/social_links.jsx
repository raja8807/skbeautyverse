const {
  Facebook,
  Instagram,
  Youtube,
  Whatsapp,
  Linkedin,
} = require("react-bootstrap-icons");
import styles from "./social_links.module.scss";

const SocialLinks = () => {
  return (
    <div className={styles.social}>
      <div>
        <Facebook />
      </div>
      <div>
        <Instagram />
      </div>
      <div>
        <Youtube />
      </div>
      <div>
        <Whatsapp />
      </div>
      <div>
        <Linkedin />
      </div>
    </div>
  );
};

export default SocialLinks;
