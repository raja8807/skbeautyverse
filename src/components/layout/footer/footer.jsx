import CustomContainer from "@/components/ui/custom_container/custom_container";
import styles from "./footer.module.scss";
import { Col, Image, Row } from "react-bootstrap";
import SocialLinks from "@/components/ui/social_links/social_links";
import fonts from "@/components/fonts/fonts";
import {
  Envelope,
  EnvelopeAt,
  Geo,
  Telephone,
  Whatsapp,
} from "react-bootstrap-icons";
import Link from "next/link";
import pagesList from "@/components/constants/pages";
import contactDetails from "@/components/constants/contact";
import categories from "@/components/constants/categories";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <CustomContainer>
        <Row>
          <Col lg={5}>
            <div className={styles.img}>
              <Image src="/images/categories/bg.jpeg" alt="bg" fluid />
              <div className={styles.overlay}>
                <Image src="/images/logo/logo.png" fluid alt="logo" />
                <p>
                  I am <span className={styles.name}>SUSHMITHA KARTHIK</span>, your dedicated makeup artist,
                  Certified by <span className={styles.name}>&quot;Lakme Academy&quot;</span> specializing in hair,
                  skin, and bridal makeup. Discover personalized beauty
                  experiences crafted with premium products, which does not
                  cause damage to skin & hair. &quot;Make your beautyful day,
                  More Beutiful with our Makup Services!&quot;
                </p>
                <SocialLinks />
              </div>
            </div>
          </Col>
          <Col lg={7}>
            <div className={styles.right}>
              <Row>
                <Col xs={12} md={6} className={styles.box}>
                  <h2 className={fonts.lora}>Contact US</h2>
                  <div>
                    <Geo />
                    <p>{contactDetails.address}</p>
                  </div>

                  <div>
                    <Telephone />
                    <p>{contactDetails.whatsapp}</p>
                  </div>
                  <div>
                    <Whatsapp />
                    <p>{contactDetails.mobile}</p>
                  </div>
                  <div>
                    <EnvelopeAt />
                    <p>{contactDetails.email}</p>
                  </div>
                </Col>

                <Col xs={12} md={6} className={styles.box}>
                  <h2 className={fonts.lora}>Quick Links</h2>
                  <div className={styles.links}>
                    {pagesList.map((l) => (
                      <Link key={l.name} href={l.href}>
                        {l.name}
                      </Link>
                    ))}
                  </div>
                </Col>

                <Col xs={12} md={4} className={styles.box}>
                  <h2 className={fonts.lora}>Categories</h2>
                  <div className={styles.links}>
                    {categories.map((c) => {
                      return (
                        <Link key={c.id} href={`/gallery/${c.id}`}>
                          {c.name}
                        </Link>
                      );
                    })}
                  </div>
                </Col>

                <Col xs={12} md={8} className={styles.box}>
                  <h2 className={fonts.lora}>Locate Us</h2>
                  <div className="google-map-code">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      frameborder="0"
                      style={{ border: 0 }}
                      allowfullscreen=""
                      aria-hidden="false"
                      tabindex="0"
                    ></iframe>
                  </div>
                </Col>
                {/* <hr /> */}
                <div className={styles.bar}>
                  <p>GST : 33LEVPS8977N1ZR</p>
                  <p>
                    UDYAM-TN-02-0245303
                    <br />
                    <span>(Government Registered)</span>
                  </p>
                </div>
                <small style={{ textAlign: "center" }}>
                  Developed And Maintianed By{" "}
                  <Link href="https://www.nammaoorudev.online" target="_blank">
                    www.nammoorudev.online
                  </Link>{" "}
                </small>
              </Row>
            </div>
          </Col>
        </Row>
      </CustomContainer>
    </footer>
  );
};

export default Footer;
