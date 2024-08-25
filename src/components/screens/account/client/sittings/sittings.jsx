import CustomSection from "@/components/ui/custom_section/custom_section";
import { getDataByQuery } from "@/libs/firebase/firebase";
import { settings } from "nprogress";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { ImageGallery } from "react-image-grid-gallery";
import styles from './sittings.module.scss'

const Sittings = ({ client }) => {
  const [sittings, setSittings] = useState(null);

  const fetchSittings = async () => {
    try {
      const res = await getDataByQuery("sitting", [
        "clientId",
        "==",
        client?.id,
      ]);
      setSittings(res || []);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchSittings();
  }, []);

  const [showSittingFor, setShowSittingFor] = useState(null);

  return (
    <div className={styles.Sittings}>
      {showSittingFor && (
        <Modal
          show={!!showSittingFor}
          centered
          size="xl"
          onHide={() => {
            setShowSittingFor(null);
          }}
        >
          <Modal.Header closeButton>{showSittingFor?.title}</Modal.Header>
          <Modal.Body>
            <p>Procedure : {showSittingFor?.procedure}</p>
            <br/>
            {showSittingFor?.images?.[0] && (
              <ImageGallery
                imagesInfoArray={showSittingFor.images.map((gi) => {
                  return {
                    src: gi.src,
                    alt: "img",
                  };
                })}
                columnCount={"4"}
                columnWidth={125}
                gapSize={24}
              />
            )}
          </Modal.Body>
        </Modal>
      )}
      <CustomSection head="Sittings">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Pending Amount</th>
              <th>Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {sittings &&
              sittings.map((sitting, i) => {
                return (
                  <tr
                    key={sitting?.id}
                    onClick={() => {
                      setShowSittingFor(sitting);
                    }}
                  >
                    <td>{i + 1}</td>
                    <td>{sitting.title}</td>
                    <td>{sitting.date}</td>
                    <td>{sitting.paymentStatus}</td>
                    <td>
                      {sitting.receivedPayment === "Partially Paid"
                        ? sitting.receivedPayment
                        : 0}
                    </td>
                    <td>{sitting.pendingPayment}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </CustomSection>
    </div>
  );
};

export default Sittings;
