import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";
import React from "react";
import styles from "./testimonials.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TestimonialsSection = ({ reviews }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  console.log(reviews);
  

  return (
    <div className={styles.TestimonialsSection}>
      <div className={styles.bg}></div>
      <CustomSection head="Testimonials">
        <CustomContainer>
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={true}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            transitionDuration={5000}
            containerClass="carousel-container"
            arrows={false}
            dotListClass="custom-dot-list-style"
          >
            {reviews.map((review) => {
              return (
                <div className={styles.item} key={review?._id}>
                  <div
                    style={{
                      backgroundImage: "url(/images/user.jpg)",
                    }}
                    className={styles.img}
                  ></div>

                  <div>
                    <h2>
                      {review.firstName} {review.lastName}
                    </h2>
                    <p>{review.comment}</p>
                  </div>
                </div>
              );
            })}
          </Carousel>
          ;
        </CustomContainer>
      </CustomSection>
    </div>
  );
};

export default TestimonialsSection;
