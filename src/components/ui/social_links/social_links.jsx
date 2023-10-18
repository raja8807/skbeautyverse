const {
  Facebook,
  Instagram,
  Youtube,
  Whatsapp,
  Linkedin,
} = require("react-bootstrap-icons");
import Link from "next/link";
import styles from "./social_links.module.scss";
import contactDetails from "@/components/constants/contact";

const SocialLinks = () => {
  return (
    <div className={styles.social}>
      <Link href={contactDetails.facabook}>
        <div className={styles.item}>
          <Facebook />
        </div>
      </Link>
      <Link href={contactDetails.instagram}>
        <div className={styles.item}>
          <Instagram />
        </div>
      </Link>
      <Link href={contactDetails.youtube}>
        <div className={styles.item}>
          <Youtube />
        </div>
      </Link>
      <Link href={contactDetails.whatsapp}>
        <div className={styles.item}>
          <Whatsapp />
        </div>
      </Link>
      <Link href={contactDetails.whatsapp}>
        <div className={styles.item}>
          <Linkedin />
        </div>
      </Link>
    </div>
  );
};

export default SocialLinks;
