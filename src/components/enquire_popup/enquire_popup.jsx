const { Modal } = require("react-bootstrap");
import { X } from "react-bootstrap-icons";
import ContactForm from "../screens/contact/contact_form";
import styles from "./enquire_popup.module.scss";

const EnquirePopup = (props) => {
  const { show, setShow,initialMessage='"Hi, I want to Book.."' } = props;

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      centered
      className={styles.popup}
      animation
    >
      <div className={styles.box}>
        <X
          className={styles.close}
          onClick={() => {
            setShow(false);
          }}
        />
        <ContactForm type="gold" initialMessage={initialMessage} />
      </div>
    </Modal>
  );
};

export default EnquirePopup;
