import styles from "./header.module.scss";
import pagesList from "../../constants/pages";
import Link from "next/link";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Dropdown, Image } from "react-bootstrap";
import { List, Search } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import HeaderDrawer from "./header-drawer/header-drawer";

const Category = ({ category }) => {
  const [showPosts, setShowPosts] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setShowPosts(true);
      }}
      onMouseLeave={() => {
        setShowPosts(false);
      }}
    >
      <p>{category.category.toUpperCase()} </p>
      {showPosts &&
        category.services.map((service, si) => {
          return (
            <div key={`ser_${si}`}>
              <Link
                href={`/services/${service.service}/${service.id}`}
                onClick={() => {
                  setShow(false);
                }}
              >
                <div className={styles.ser}>{service.title}</div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

const Header = ({ customer, services }) => {
  const [ShowHeaer, setShowHeader] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const getIsScrolled = () => {
      setScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", getIsScrolled);
  }, []);

  const [showCategories, setShowCategories] = useState(true);

  return (
    <header className={`${styles.header} ${scrolled && styles.scrolled}`}>
      <CustomContainer className={styles.container}>
        <div className={styles.logo} data-aos="fade-left">
          <Link href="/">
            <Image
              src="/images/logo/logo1.png"
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
//               if (p.name === "Services") {
//                 return (
//                   <div
//                     key="xx"
//                     className={styles.services}
//                     onMouseEnter={() => {
//                       setShowCategories(true);
//                     }}
//                     onMouseLeave={() => {
//                       setShowCategories(true);
//                     }}
//                   >
//                     <p>{p.name}</p>
// {/* 
//                     <Dropdown>
//                       <Dropdown.Toggle>sfs</Dropdown.Toggle>
//                       <Dropdown.Menu style={{
//                         zIndex:'20000'
//                       }}>
//                         <Dropdown.Item>skfrgksnrkgnks</Dropdown.Item>
//                         <Dropdown.Item>skfrgksnrkgnks</Dropdown.Item>
//                         <Dropdown.Item>skfrgksnrkgnks</Dropdown.Item>
//                       </Dropdown.Menu>
//                     </Dropdown> */}

//                     {/* <div className={styles.abs}>
//                       {showCategories &&
//                         services.map((category, ci) => {
//                           return (
//                             <div key={`cat_${ci}`}>
//                               <Category category={category} />
//                             </div>
//                           );
//                         })}
//                     </div> */}
//                   </div>
//                 );
//               }
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
        services={services}
      />
    </header>
  );
};

export default Header;
