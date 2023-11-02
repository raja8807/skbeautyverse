const { Offcanvas, Image } = require("react-bootstrap");
import pagesList from "@/components/constants/pages";
import styles from "./header-drawer.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import CustomButton from "@/components/ui/custom_button/custom_button";
import fireBaseCustomerAuth from "@/components/constants/firebase_config";

const HeaderDrawer = (props) => {
  const { show, setShow, customer } = props;

  const handleClose = () => setShow(false);

  const router = useRouter();
  const session = useSession();

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <div className={styles.draw}>
        <Offcanvas.Header closeButton className={styles.head}>
          <Offcanvas.Title>
            <Image
              src="/images/logo/logo.png"
              fluid
              alt="logo"
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
              return (
                <li
                  key={page.name}
                  className={isActive ? styles.active : ""}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <Link href={page.href}>
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
