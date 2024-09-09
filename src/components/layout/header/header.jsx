import styles from "./header.module.scss";
import pagesList from "../../constants/pages";
import Link from "next/link";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Image } from "react-bootstrap";
import { ChevronDown, List, Search } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import HeaderDrawer from "./header-drawer/header-drawer";

const Header = ({ customer, services, servicesRef, setShowPopup }) => {
  const [ShowHeaer, setShowHeader] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const getIsScrolled = () => {
      setScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", getIsScrolled);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled && styles.scrolled}`}>
      <CustomContainer className={styles.container}>
        <div className={styles.logo} data-aos="fade-left">
          <Link href="/">
            <Image
              src="/images/logo/logo.png"
              fluid
              alt="sk_beautyverse_logo"
              className={styles.sk}
            />
          </Link>
          <Image
            src="/images/logo/name.png"
            fluid
            alt="sk_beautyverse_logo"
            className={styles.name}
          />
        </div>

        <nav data-aos="fade-right">
          <div className={styles.navItems}>
            {pagesList.map((p) => {
              if (p.name === "Services") {
                return (
                  <Link
                    key={p.href}
                    href={p.href}
                    id={`item_${p.name}`}
                    ref={servicesRef}
                    onMouseEnter={() => {
                      setShowPopup(true);
                    }}
                  >
                    {p.name}
                    &nbsp;
                    <ChevronDown />
                  </Link>
                );
              }

              return (
                <Link key={p.href} href={p.href} id={`item_${p.name}`}>
                  {p.name}
                </Link>
              );
            })}
          </div>
          <List
            className={styles.menu}
            onClick={() => {
              setShowHeader(true);
            }}
          />
        </nav>
      </CustomContainer>

      <HeaderDrawer
        show={ShowHeaer}
        setShow={setShowHeader}
        customer={customer}
        services={services}
      />
    </header>
  );
};

export default Header;
