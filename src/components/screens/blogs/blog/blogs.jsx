import CustomSection from "@/components/ui/custom_section/custom_section";
import React from "react";
import styles from "./blog.module.scss";
import { Image } from "react-bootstrap";
import PageHead from "@/components/ui/page_head/page_head";

const BlogScreen = ({ blog }) => {
  return (
    <div className={styles.BlogScreen}>
      <PageHead head={blog.title} img={`/images/png/${blog?.headImg}.PNG`} />
      <CustomSection>
        <div className={styles.wrap}>
          {blog.rows.map((row, idx) => {
            return (
              <div className={styles.row} key={`row_${idx}`}>
                <div className={styles.left} data-aos="fade-right">
                  <Image src={row.img} fluid alt={`${blog?.title}_${idx}`} />
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

export default BlogScreen;
