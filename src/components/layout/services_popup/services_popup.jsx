import React, { useEffect, useState } from "react";
import styles from "./services_popup.module.scss";
import { ChevronRight } from "react-bootstrap-icons";
import Link from "next/link";

const Category = ({ category ,setShowPopup}) => {
  const [showServices, setShowServices] = useState(false);
  return (
    <div
      className={styles.category}
      onMouseEnter={() => {
        setShowServices(true);
      }}
      onMouseLeave={() => {
        setShowServices(false);
      }}
    >
      <Link href={`/services/${category.category}`}>
        <p>{category.category.toUpperCase()} &nbsp;</p>
        <ChevronRight />
      </Link>
      {showServices && (
        <div
          className={styles.service}
          onMouseLeave={() => {
            setShowServices(false);
          }}
        >
          {category.services.map((service, i) => {
            return (
              <Link
                href={`/services/${service.service}/${service.id}`}
                key={`ser_${i}`}
                onClick={() => {
                  setShowPopup(false);
                }}
              >
                {service.title.toUpperCase()}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ServicesPopup = ({ servicesRef, setShowPopup, services = [] }) => {
  const getPosition = () => {
    if (servicesRef?.current) {
      const rect = servicesRef.current.getBoundingClientRect();

      return {
        left: rect.left,
        top: rect.top,
      };
    }

    return {
      left: 0,
      top: 0,
    };
  };

  const [position, setPosition] = useState(getPosition());

  return (
    <div
      className={styles.ServicesPopup}
      style={{
        left: `${position.left}px`,
        top: `${position.top + 30}px`,
      }}
      onMouseLeave={() => {
        setShowPopup(false);
      }}
    >
      {services.map((cat) => {
        return (
          <Category
            key={cat.category}
            category={cat}
            setShowPopup={setShowPopup}
          />
        );
      })}
    </div>
  );
};

export default ServicesPopup;
