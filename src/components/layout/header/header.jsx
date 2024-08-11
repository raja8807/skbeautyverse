import styles from "./header.module.scss";
import pagesList from "../../constants/pages";
import Link from "next/link";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Image } from "react-bootstrap";
import { List, Search } from "react-bootstrap-icons";
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
      setScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", getIsScrolled);
  }, []);

  const session = useSession();

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className={`${styles.header} ${scrolled && styles.scrolled}`}>
      <CustomContainer className={styles.container}>
        <div className={styles.logo} data-aos="fade-left">
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

        <nav data-aos="fade-right">
          <div className={styles.navItems}>
            {pagesList.map((p) => {
              return (
                <Link key={p.href} href={p.href}>
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
      />
    </header>
  );
};

export default Header;
