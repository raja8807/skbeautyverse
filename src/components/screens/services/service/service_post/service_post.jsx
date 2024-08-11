import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";
import React from "react";
import styles from "./service_post.module.scss";
import { Col, Image, Row } from "react-bootstrap";
import PageHead from "@/components/ui/page_head/page_head";

const ServicePostScreen = ({ service: service_post }) => {
  // console.log(service);

  // const service_post = {
  //   id: "skin-fairness-treatment",
  //   title: "Skin Fairness Treatment",
  //   service: "hair",
  //   rows: [
  //     {
  //       img: "/images/categories/hair.jpg",
  //       text: (
  //         <p>
  //           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique,
  //           quam repellat tempore voluptates nobis sequi voluptatem suscipit
  //           ipsam nostrum expedita? Aut tempora alias explicabo aliquam
  //           voluptatum soluta tempore blanditiis. Omnis velit harum dolorem
  //           dolore ad facere fugit fugiat debitis asperiores blanditiis! Est
  //           eius minima assumenda quisquam ipsa. Quam rerum in, id eius
  //           voluptatibus repudiandae optio modi. Quis reprehenderit temporibus
  //           voluptate fugiat asperiores animi laudantium officia fuga itaque, et
  //           vel, facilis, porro voluptates quaerat praesentium. Corrupti magnam
  //           similique mollitia culpa nisi magni minima quia cum, nobis commodi
  //           fuga corporis necessitatibus consectetur aliquam excepturi expedita
  //           molestias numquam saepe provident esse rem iusto facilis? Expedita
  //           quisquam ut, obcaecati fugit, aspernatur dolore quae eos tenetur
  //           ipsa adipisci at omnis debitis repudiandae aut soluta quo optio est.
  //           Fugit, iusto nihil expedita omnis eos nisi molestias. Neque nobis
  //           quia autem fugiat vero consequuntur esse dicta blanditiis magnam
  //           rerum modi rem perspiciatis, illum nemo laborum minima eos quaerat
  //           ipsum! Inventore illum sunt nam velit dolorum maxime asperiores eos,
  //           porro obcaecati eum eius rerum exercitationem. Beatae quam
  //           temporibus, adipisci molestiae corporis vero quibusdam incidunt sunt
  //           maxime, at commodi esse quidem neque aperiam aliquid quos eveniet
  //           unde. Sint perferendis nam quod perspiciatis veniam aspernatur
  //           distinctio iure vitae accusamus ea.
  //         </p>
  //       ),
  //     },
  //     {
  //              img: "/images/categories/hair.jpg",

  //       text: (
  //         <p>
  //           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique,
  //           quam repellat tempore voluptates nobis sequi voluptatem suscipit
  //           ipsam nostrum expedita? Aut tempora alias explicabo aliquam
  //           voluptatum soluta tempore blanditiis. Omnis velit harum dolorem
  //           dolore ad facere fugit fugiat debitis asperiores blanditiis! Est
  //           eius minima assumenda quisquam ipsa. Quam rerum in, id eius
  //           voluptatibus repudiandae optio modi. Quis reprehenderit temporibus
  //           voluptate fugiat asperiores animi laudantium officia fuga itaque, et
  //           vel, facilis, porro voluptates quaerat praesentium. Corrupti magnam
  //           similique mollitia culpa nisi magni minima quia cum, nobis commodi
  //           fuga corporis necessitatibus consectetur aliquam excepturi expedita
  //           molestias numquam saepe provident esse rem iusto facilis? Expedita
  //           quisquam ut, obcaecati fugit, aspernatur dolore quae eos tenetur
  //           ipsa adipisci at omnis debitis repudiandae aut soluta quo optio est.
  //           Fugit, iusto nihil expedita omnis eos nisi molestias. Neque nobis
  //           quia autem fugiat vero consequuntur esse dicta blanditiis magnam
  //           rerum modi rem perspiciatis, illum nemo laborum minima eos quaerat
  //           ipsum! Inventore illum sunt nam velit dolorum maxime asperiores eos,
  //           porro obcaecati eum eius rerum exercitationem. Beatae quam
  //           temporibus, adipisci molestiae corporis vero quibusdam incidunt sunt
  //           maxime, at commodi esse quidem neque aperiam aliquid quos eveniet
  //           unde. Sint perferendis nam quod perspiciatis veniam aspernatur
  //           distinctio iure vitae accusamus ea.
  //         </p>
  //       ),
  //     },
  //     {
  //       img: "/images/categories/hair.jpg",
  //       text: (
  //         <p>
  //           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique,
  //           quam repellat tempore voluptates nobis sequi voluptatem suscipit
  //           ipsam nostrum expedita? Aut tempora alias explicabo aliquam
  //           voluptatum soluta tempore blanditiis. Omnis velit harum dolorem
  //           dolore ad facere fugit fugiat debitis asperiores blanditiis! Est
  //           eius minima assumenda quisquam ipsa. Quam rerum in, id eius
  //           voluptatibus repudiandae optio modi. Quis reprehenderit temporibus
  //           voluptate fugiat asperiores animi laudantium officia fuga itaque, et
  //           vel, facilis, porro voluptates quaerat praesentium. Corrupti magnam
  //           similique mollitia culpa nisi magni minima quia cum, nobis commodi
  //           fuga corporis necessitatibus consectetur aliquam excepturi expedita
  //           molestias numquam saepe provident esse rem iusto facilis? Expedita
  //           quisquam ut, obcaecati fugit, aspernatur dolore quae eos tenetur
  //           ipsa adipisci at omnis debitis repudiandae aut soluta quo optio est.
  //           Fugit, iusto nihil expedita omnis eos nisi molestias. Neque nobis
  //           quia autem fugiat vero consequuntur esse dicta blanditiis magnam
  //           rerum modi rem perspiciatis, illum nemo laborum minima eos quaerat
  //           ipsum! Inventore illum sunt nam velit dolorum maxime asperiores eos,
  //           porro obcaecati eum eius rerum exercitationem. Beatae quam
  //           temporibus, adipisci molestiae corporis vero quibusdam incidunt sunt
  //           maxime, at commodi esse quidem neque aperiam aliquid quos eveniet
  //           unde. Sint perferendis nam quod perspiciatis veniam aspernatur
  //           distinctio iure vitae accusamus ea.
  //         </p>
  //       ),
  //     },
  //   ],
  // };

  return (
    <div className={styles.ServicePostScreen}>
      <PageHead
        head={service_post.title}
        caption={<h2>&#8377;{service_post.price}/-</h2>}
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
