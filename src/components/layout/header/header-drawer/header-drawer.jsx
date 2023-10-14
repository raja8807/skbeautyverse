const { Offcanvas, Image } = require("react-bootstrap");
import pagesList from "@/components/constants/pages";
import styles from "./header-drawer.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const HeaderDrawer = (props) => {
  const { show, setShow } = props;

  const handleClose = () => setShow(false);

  const router = useRouter();

  //   console.log();

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
                  <Link href={page.href}>{page.name}</Link>
                </li>
              );
            })}
          </ul>
        </Offcanvas.Body>
      </div>
    </Offcanvas>
  );
};

export default HeaderDrawer;
