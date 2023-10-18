const { default: Link } = require("next/link");
const { WhatsappIcon,InstapaperIcon } = require("react-share");
import contactDetails from "@/components/constants/contact";
import styles from "./whatsapp_button.module.scss";
import { Image } from "react-bootstrap";

const WhatsappButton = () => {
  return (
    <div className={styles.quick}>
      <Link href={contactDetails.whatsappLink} className={styles.whatsapp_btn}>
        <WhatsappIcon round className={styles.icon} />
      </Link>
      <br/>
      <Link href={contactDetails.instagram} className={styles.insta}>
        <Image src="/images/logo/insta.png" width={40} fluid alt="insta"/>
      </Link>
    </div>
  );
};

export default WhatsappButton;
