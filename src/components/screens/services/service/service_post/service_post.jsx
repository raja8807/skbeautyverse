import CustomSection from "@/components/ui/custom_section/custom_section";
import React from "react";
import styles from "./service_post.module.scss";
import { Image } from "react-bootstrap";
import PageHead from "@/components/ui/page_head/page_head";
import CustomButton from "@/components/ui/custom_button/custom_button";

const ServicePostScreen = ({ service: service_post }) => {
  return (
    <div className={styles.ServicePostScreen}>
      <PageHead
        head={service_post.title}
        caption={<h2>&#8377;{service_post.price}/-</h2>}
        img={`/images/png/${service_post?.headImg}.PNG`}
        btn={
          <CustomButton href="/book" variant={2} isNew>
            Book Now
          </CustomButton>
        }
      />
      <CustomSection>
        <div className={styles.wrap}>
          {service_post.rows.map((row, idx) => {
            return (
              <div className={styles.row} key={`row_${idx}`}>
                <div className={styles.left} data-aos="fade-right">
                  <Image src={row.img} fluid alt="img.jpeg" />
                </div>
                <div
                  className={styles.right}
                  data-aos="fade-left"
                  dangerouslySetInnerHTML={{
                    __html: row.text,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </CustomSection>
    </div>
  );
};

export default ServicePostScreen;
