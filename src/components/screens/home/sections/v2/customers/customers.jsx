import React, { useEffect, useRef, useState } from "react";
import styles from "./customers.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Row } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { useIntersection } from "@/libs/custom_hooks/custom_hooks";

const Box = ({ data }) => {
  const { title, number, id } = data;

  const [count, setCount] = useState(0);

  const triggerRef = useRef(null);
  const isVisible = useIntersection(triggerRef, "0px");

  function calculateX(variableValue) {
    const constantValue = 1000;
    let x = constantValue / variableValue;
    return x;
  }

  const startCounter = () => {
    let int = null;
    int = setInterval(() => {
      if (count < number) {
        setCount((prev) => {
          if (prev < number) {
            return prev + 1;
          } else {
            return prev;
          }
        });
      } else {
        clearInterval(int);
      }
    }, calculateX(number));
  };

  useEffect(() => {
    if (isVisible) {
      startCounter(); // Trigger a function when the div is visible on view port
    }
  }, [isVisible]);

  return (
    <Col xs={12} lg={4}>
      <div className={styles.Box} id={`box_${id}`} ref={triggerRef}>
        <div className={styles.right}>
          <h3>{count}+</h3>
          <p>{title}</p>
        </div>
      </div>
    </Col>
  );
};

const CustomersSection = () => {
  const data = [
    {
      id: "ex",
      title: "Years of Experience",
      number: 10,
    },
    {
      id: "cl",
      title: "Clients",
      number: 340,
    },
    {
      id: "aw",
      title: "Awards",
      number: 37,
    },
  ];

  return (
    <div className={styles.CustomersSection}>
      <CustomContainer>
        <div className={styles.wrap}>
          <Row>
            {data.map((d) => {
              return <Box key={d.title} data={d} />;
            })}
          </Row>
        </div>
      </CustomContainer>
    </div>
  );
};

export default CustomersSection;
