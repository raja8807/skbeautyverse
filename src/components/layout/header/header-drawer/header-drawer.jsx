const { Offcanvas, Image } = require("react-bootstrap");
import pagesList from "@/components/constants/pages";
import styles from "./header-drawer.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import CustomButton from "@/components/ui/custom_button/custom_button";
import fireBaseCustomerAuth from "@/components/constants/firebase_config";
import { useState } from "react";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

const Category = ({ category, setShow }) => {
  const [showPosts, setShowPosts] = useState(false);

  return (
    <div className={styles.cat}>
      <p
        onClick={() => {
          setShowPosts((prev) => !prev);
        }}
      >
        {category.category.toUpperCase()}{" "}
        {!showPosts ? <CaretDownFill /> : <CaretUpFill />}
      </p>
      {showPosts &&
        category.services.map((service, si) => {
          return (
            <Link
              key={`ser_${si}`}
              href={`/services/${service.service}/${service.id}`}
              onClick={() => {
                setShow(false);
              }}
            >
              <div className={styles.ser}>{service.title}</div>
            </Link>
          );
        })}
    </div>
  );
};

const HeaderDrawer = (props) => {
  const { show, setShow, customer, services } = props;

  const handleClose = () => setShow(false);

  const [showCategories, setShowCategories] = useState(false);

  const router = useRouter();
  const session = useSession();

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <div className={styles.draw}>
        <Offcanvas.Header closeButton className={styles.head}>
          <Offcanvas.Title>
            <Image
              src="/images/logo/logo1.png"
              fluid
              alt="sk_beautyverse_logo"
              className={styles.logo}
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.body}>
          <ul>
            {pagesList.map((page) => {
              const getIsActive = () => {
                if (page.name !== "Gallery") {
                  return router.asPath === page.href;
                } else {
                  return router.asPath.includes("gallery");
                }
              };
              const isActive = getIsActive();

              if (page.name === "Services") {
                return (
                  <li key={page.name}>
                    <div className={styles.services}>
                      <p
                        onClick={(e) => {
                          setShowCategories((prev) => !prev);
                        }}
                      >
                        {page.name}{" "}
                        {!showCategories ? <CaretDownFill /> : <CaretUpFill />}
                      </p>

                      {showCategories &&
                        services.map((category, ci) => {
                          return (
                            <Category
                              key={`cat_${ci}`}
                              category={category}
                              router={router}
                              setShow={setShow}
                            />
                          );
                        })}
                    </div>
                  </li>
                );
              }

              return (
                <li
                  key={page.name}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <Link
                    href={page.href}
                    className={isActive ? styles.active : ""}
                  >
                    {page.name === "Login" && (session?.data || customer)
                      ? "My Account"
                      : page.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {session?.data && (
            <CustomButton
              clickHandler={() => {
                signOut();
              }}
            >
              Logout
            </CustomButton>
          )}

          {customer && (
            <CustomButton
              clickHandler={() => {
                fireBaseCustomerAuth.signOut();
              }}
            >
              Logout
            </CustomButton>
          )}
        </Offcanvas.Body>
      </div>
    </Offcanvas>
  );
};

export default HeaderDrawer;
