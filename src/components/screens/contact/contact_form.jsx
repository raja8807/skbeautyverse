import CustomButton from "@/components/ui/custom_button/custom_button";
import styles from "./contact_form.module.scss";
import fonts from "@/components/fonts/fonts";

const ContactForm = () => {
  return (
    <form className={styles.contactForm}>
      <p className={fonts.lora}>Get In Touch</p>
      <input placeholder="Your Name" />
      <input placeholder="Your Phone Number" />
      <input placeholder="Your Email" />
      <textarea placeholder="Your Message" rows="5" />
      <CustomButton
        type="gold"
        clickHandler={(e) => {
          e.preventDefault();
        }}
        disabled
      >
        Send Message
      </CustomButton>
    </form>
  );
};

export default ContactForm;
