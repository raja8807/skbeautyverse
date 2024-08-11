import React, { useState } from "react";
import styles from "./learn.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Col, Image, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { customFont1 } from "@/styles/fonts/fonts";

const LearnFromUsSection = () => {
  const courses = [
    {
      id: "basic",
      title: "Basic Beautician course",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae iusto repellendus ratione fugit! Adipisci, architecto?",
    },
    {
      id: "advanced",
      title: "Advance Beautician course",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae iusto repellendus ratione fugit! Adipisci, architecto?",
    },
    {
      id: "clinical",
      title: "Clinical Cosmetology course",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae iusto repellendus ratione fugit! Adipisci, architecto?",
    },
    {
      id: "aesthetics",
      title: "Aesthetics course",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae iusto repellendus ratione fugit! Adipisci, architecto?",
    },
    {
      id: "semi",
      title: "Semi permanent makeup course",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae iusto repellendus ratione fugit! Adipisci, architecto?",
    },
    {
      id: "master",
      title: "Master Makeup course",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae iusto repellendus ratione fugit! Adipisci, architecto?",
    },
  ];

  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const currentCourse = courses[currentCourseIndex];

  return (
    <div className={styles.LearnFromUsSection}>
      <CustomContainer>
        <CustomSection
          bg="gold"
          head="Learn With Us"
          caption="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae iusto repellendus ratione fugit! Adipisci, architecto? Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae iusto repellendus ratione fugit! Adipisci, architecto?"
        >
          <div className={styles.wrap}>
            <br />
            <Row>
              <Col xs={12} md={5}>
                <div>
                  <Carousel
                    // additionalTransfrom={0}
                    afterChange={(num, x) => {
                      if (num > courses?.length) {
                        setCurrentCourseIndex(0);
                      } else {
                        setCurrentCourseIndex(num - 1);
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
                    {courses.map((course) => {
                      return (
                        <Image
                          key={course.id}
                          src="/course.jpg"
                          alt={course.id}
                          fluid
                        />
                      );
                    })}
                  </Carousel>
                </div>
              </Col>
              <Col xs={12} md={7}>
                <div className={styles.right}>
                  <h1 className={customFont1}>{currentCourse?.title}</h1>
                  <p>
                    {currentCourse?.text}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Minus porro saepe sint, temporibus qui ipsum dolorum magnam
                    cumque officia voluptatem dolore neque. Ad asperiores
                    dolorem sapiente minus reiciendis excepturi officia, enim
                    alias perspiciatis corporis quidem soluta temporibus.
                    Dignissimos obcaecati, iste laudantium molestias quo magnam
                    esse, nesciunt tenetur maxime impedit repudiandae eligendi
                    amet, at cupiditate deleniti ea aspernatur iusto in aut
                    vitae labore mollitia adipisci earum. Asperiores nihil
                    consectetur, esse itaque expedita quidem cupiditate, facilis
                    consequuntur reprehenderit tempora reiciendis dolor sint non
                    iure sed quod facere voluptates fugit amet! Laborum enim
                  </p>
                  <br />
                  <br />
                  <CustomButton variant={2}>Know More</CustomButton>
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
