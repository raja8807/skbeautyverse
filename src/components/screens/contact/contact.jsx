const {
  default: CustomSection,
} = require("@/components/ui/custom_section/custom_section");

import {
  EnvelopeAtFill,
  GeoAltFill,
  TelephoneFill,
} from "react-bootstrap-icons";
import styles from "./contact.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import ContactForm from "./contact_form";

const Info = (props) => {
  const { icon, text, head } = props;
  return (
    <div className={styles.info}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>
        <h4>{head}</h4>
        {text}
      </div>
    </div>
  );
};

const ContactScreen = () => {
  return (
    <CustomContainer>
      <CustomSection head="Contact Us">
        <div className={styles.top}>
          <Info
            head="Address"
            text={
              <p>
                address line 1, <br />
                address line 2, <br />
                address line 3, <br />
                address line 4
              </p>
            }
            icon={<GeoAltFill />}
          />
          <Info
            head="Phone"
            text={<p>+91 98765 41230</p>}
            icon={<TelephoneFill />}
          />
          <Info
            head="Email"
            text={<p>admin@skbeautyvers.com</p>}
            icon={<EnvelopeAtFill />}
          />
        </div>
        <br/>
        <ContactForm/>
      </CustomSection>
    </CustomContainer>
  );
};

export default ContactScreen;
