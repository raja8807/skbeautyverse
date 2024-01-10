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
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", getIsScrolled);
  }, []);

  const session = useSession();

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className={`${styles.header} ${scrolled && styles.scrolled}`}>
      <CustomContainer className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/images/logo/logo1.png"
              fluid
              alt="logo"
              className={styles.sk}
            />
          </Link>
        
        </div>

        {router.pathname !== "/search" && (
          <div className={styles.search}>
            <input
              type="search"
              placeholder="Search here.."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.replace(`/search?q=${searchTerm}`);
                }
              }}
            />
            <Search
              onClick={() => {
                router.replace(`/search?q=${searchTerm}`);
              }}
            />
          </div>
        )}

        <List
          className={styles.menu}
          onClick={() => {
            setShowHeader(true);
          }}
        />
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
