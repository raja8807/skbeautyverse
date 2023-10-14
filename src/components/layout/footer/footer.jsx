import CustomContainer from "@/components/ui/custom_container/custom_container";
import styles from "./footer.module.scss";
import { Col, Image, Row } from "react-bootstrap";
import SocialLinks from "@/components/ui/social_links/social_links";
import fonts from "@/components/fonts/fonts";
import { Envelope, EnvelopeAt, Geo, Telephone } from "react-bootstrap-icons";
import Link from "next/link";
import pagesList from "@/components/constants/pages";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <CustomContainer>
        <Row>
          <Col lg={5}>
            <div className={styles.img}>
              <Image src="images/categories/1.jpg" alt="bg" fluid />
              <div className={styles.overlay}>
                <Image src="images/logo/logo.png" fluid alt="logo" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime error doloremque accusantium dolor iste ipsa quod
                  commodi rerum, culpa nemo voluptate fugit ad expedita eum esse
                  quis distinctio est totam? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Nesciunt, nobis!
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
                    <p>
                      No 30, acbded,
                      <br />
                      aeubauef aeofboae,
                      <br />
                      aeibafi, aeioafe,
                      <br />
                      338r49
                    </p>
                  </div>

                  <div>
                    <Telephone />
                    <p>+91 1234567890</p>
                  </div>
                  <div>
                    <EnvelopeAt />
                    <p>abcd@skbeautyverse.com</p>
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
                    <Link href="/">Categore name 1</Link>
                    <Link href="/">Categore name 1</Link>
                    <Link href="/">Categore name 1</Link>
                    <Link href="/">Categore name 1</Link>
                  </div>
                </Col>

                <Col xs={12} md={8} className={styles.box}>
                  <h2 className={fonts.lora}>Locate Us</h2>
                  {/* <div className="google-map-code">
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
                  </div> */}
                </Col>
                <hr />
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
