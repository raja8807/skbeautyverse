import { useRef, useEffect, useState, useLayoutEffect } from "react";
import Card from "./Card.js";
import styles from "./styles.module.scss";
// import "./styles.scss";

let data = [{
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
  {
    id: "4",
  },
  {
    id: "5",
  },
  {
    id: "6",
  },{
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
  {
    id: "4",
  },
  {
    id: "5",
  },
  {
    id: "6",
  },
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
  {
    id: "4",
  },
  {
    id: "5",
  },
  {
    id: "6",
  },
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
  {
    id: "4",
  },
  {
    id: "5",
  },
  {
    id: "6",
  },]

export default function Certificates() {
  const ref = useRef(null);
  const [containerWidth, setWidth] = useState(100 + "%");
  const [animationState, setPlay] = useState("paused");

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.scrollWidth + "px");
      setPlay("running");
    }
  }, []);

  const renderCards = data.map((el, index) => {
    return <Card key={index} id={el.id} />;
  });

  return (
    <div className={styles.App}>
      <div
        className={styles.dflex}
        onMouseEnter={() => {
          setPlay("paused");
        }}
        onMouseLeave={() => {
          setPlay("running");
        }}
        ref={ref}
        style={{
          width: `1000%`,
          animationPlayState: animationState,
        }}
      >
        {renderCards}
      </div>
    </div>
  );
}
