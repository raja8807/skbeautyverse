const {
  default: CustomSection,
} = require("@/components/ui/custom_section/custom_section");

import {
  EnvelopeAtFill,
  GeoAltFill,
  TelephoneFill,
  Whatsapp,
} from "react-bootstrap-icons";
import styles from "./contact.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import ContactForm from "./contact_form";
import contactDetails from "@/components/constants/contact";

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
            head="Location"
            text={
              <p>
                Chennai, <br />
                Tamilnadu <br />
            
              </p>
            }
            icon={<GeoAltFill />}
          />
          <Info
            head="Phone"
            text={<p>{contactDetails.whatsapp}</p>}
            icon={<TelephoneFill />}
          />
          <Info
            head="Phone"
            text={<p>{contactDetails.mobile}</p>}
            icon={<Whatsapp />}
          />
          <Info
            head="Email"
            text={<p>{contactDetails.email}</p>}
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
