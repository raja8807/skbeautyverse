import styles from "./header.module.scss";
import pagesList from "../../constants/pages";
import Link from "next/link";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Image } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import HeaderDrawer from "./header-drawer/header-drawer";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import CustomButton from "@/components/ui/custom_button/custom_button";
// import Image from "next/image";

const Header = ({ customer }) => {
  const [ShowHeaer, setShowHeader] = useState(false);

  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const getIsScrolled = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", getIsScrolled);
  }, []);

  const session = useSession();

  return (
    <header className={`${styles.header} ${scrolled && styles.scrolled}`}>
      <CustomContainer className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/images/logo/logo.png"
              fluid
              alt="logo"
              className={styles.sk}
            />
          </Link>
          <Image
            src="/images/logo/name.png"
            fluid
            alt="logo"
            className={styles.name}
          />
        </div>
        <nav>
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
                <li key={page.name}>
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
            {/* {session?.data && (
              <li>
                <CustomButton
                  clickHandler={() => {
                    signOut();
                  }}
                >
                  Logout
                </CustomButton>
              </li>
            )} */}
          </ul>
        </nav>

        <List
          className={styles.menu}
          onClick={() => {
            setShowHeader(true);
          }}
        />
      </CustomContainer>

      <HeaderDrawer show={ShowHeaer} setShow={setShowHeader} customer={customer}/>
    </header>
  );
};

export default Header;
