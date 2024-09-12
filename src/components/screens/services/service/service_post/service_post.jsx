import CustomSection from "@/components/ui/custom_section/custom_section";
import React from "react";
import styles from "./service_post.module.scss";
import { Image } from "react-bootstrap";
import PageHead from "@/components/ui/page_head/page_head";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomContainer from "@/components/ui/custom_container/custom_container";

const ServicePostScreen = ({ service: service_post }) => {
  const getVariant = () => {
    if (service_post.service === "skin") {
      return 2;
    }
    if (service_post.service === "courses") {
      return 3;
    }
    if (service_post.service === "hair") {
      return 4;
    }
    if (service_post.service === "makeup") {
      return 5;
    }

    return 1;
  };

  return (
    <div className={styles.ServicePostScreen}>
      <PageHead
        head={service_post.title}
        bottom={`${service_post.price}/-`}
        img={service_post?.headImg?.img}
        btn={
          <CustomButton href="/book" variant={2} isNew>
            Book Now
          </CustomButton>
        }
        variant={getVariant()}
        key={service_post?.id}
      />
      <CustomSection>
        <CustomContainer>
          <p className={styles.description}>{service_post?.description}</p>
        </CustomContainer>
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
        <CustomContainer>
          <p
            style={{
              opacity: 0,
            }}
          >
            {service_post?.keywords}
          </p>
        </CustomContainer>
      </CustomSection>
    </div>
  );
};

export default ServicePostScreen;
