import React, { useState } from "react";
import styles from "./learn.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Col, Image, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { customFont1 } from "@/styles/fonts/fonts";

const LearnFromUsSection = ({ blogs }) => {
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const currentBlog = blogs[currentBlogIndex];

  return (
    <div className={styles.LearnFromUsSection}>
      <CustomContainer>
        <CustomSection
          bg="gold"
          head="Blogs"
          caption="Explore beauty trends, tips, and tutorials with SK Beauty-Verse. Discover your unique style and elevate your beauty routine."
        >
          <div className={styles.wrap}>
            <br />
            <Row>
              <Col xs={12} md={5}>
                <div>
                  <Carousel
                    // additionalTransfrom={0}
                    afterChange={(num, x) => {
                      if (num > blogs?.length) {
                        setCurrentBlogIndex(0);
                      } else {
                        setCurrentBlogIndex(num - 1);
                      }
                    }}
                    arrows
                    autoPlaySpeed={3000}
                    autoPlay
                    centerMode={false}
                    className=""
                    containerClass="container"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={true}
                    renderButtonGroupOutside={true}
                    renderDotsOutside={true}
                    responsive={{
                      desktop: {
                        breakpoint: {
                          max: 3000,
                          min: 1024,
                        },
                        items: 1,
                      },
                      mobile: {
                        breakpoint: {
                          max: 464,
                          min: 0,
                        },
                        items: 1,
                      },
                      tablet: {
                        breakpoint: {
                          max: 1024,
                          min: 464,
                        },
                        items: 1,
                      },
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                  >
                    {blogs.map((blog) => {
                      return (
                        <Image
                          key={blog.id}
                          src={blog?.rows[0].img}
                          alt={`${blog?.title}`}
                          fluid
                        />
                      );
                    })}
                  </Carousel>
                </div>
              </Col>
              <Col xs={12} md={7}>
                <div className={styles.right}>
                  <h1 className={customFont1}>{currentBlog?.title}</h1>
                  <p>{currentBlog?.description}</p>
                  <br />
                  <br />
                  <CustomButton variant={2} href={`/blogs/${currentBlog?.id}`}>
                    Know More
                  </CustomButton>
                </div>
              </Col>
            </Row>
          </div>
        </CustomSection>
      </CustomContainer>
    </div>
  );
};

export default LearnFromUsSection;
