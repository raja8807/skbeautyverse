import React, { useEffect, useState } from "react";
import { Col, Form, Image, Modal, Row } from "react-bootstrap";
import styles from "./client_profile.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomSection from "@/components/ui/custom_section/custom_section";
import { ImageGallery } from "react-image-grid-gallery";
import {
  addData,
  auth,
  deletData,
  deleteFolder,
  deletFile,
  getDataByQuery,
  updateData,
  uploadFile,
} from "@/libs/firebase/firebase";
import { v4 } from "uuid";
import { X } from "react-bootstrap-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SittingFormModal = ({
  show,
  setShow,
  profile,
  setSittings,
  setIsLoading,
}) => {
  const isUpdate = !!show?.id;
  const sittingId = isUpdate ? show?.id : show?.newId;
  const [images, setImages] = useState(show?.images || []);
  const [newImg, setNewImg] = useState(null);
  const [values, setValues] = useState({
    title: show?.title || "",
    date: show?.date || "",
    paymentStatus: show?.paymentStatus || "Partially Paid",
    receivedPayment: show?.receivedPayment || 0,
    pendingPayment: show?.pendingPayment || 0,
    procedure: show?.procedure || "",
  });

  const uploadImage = async () => {
    try {
      setIsLoading(true);
      const src = await uploadFile(newImg, `sitting_images/${sittingId}`);
      setImages((prev) => [
        ...prev,
        {
          fileName: newImg.name,
          src,
        },
      ]);
      setNewImg(null);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const saveSitting = async (isSave) => {
    try {
      setIsLoading(true);
      if (isUpdate || isSave) {
        const res = await updateData(
          "sitting",
          {
            ...show,
            ...values,
            images,
          },
          sittingId
        );

        setSittings((prev) => {
          const ps = [...prev];
          const idx = prev.findIndex((p) => p.id === sittingId);
          ps[idx] = res;
          return ps;
        });
      } else {
        const id = sittingId;
        const res = await addData(
          "sitting",
          {
            id: sittingId,
            clientId: profile.id,
            ...values,
            images,
          },
          id
        );
        setSittings((prev) => [...prev, res]);
        setShow(false);
      }
      alert("Success");
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteImage = async (image, idx) => {
    try {
      setIsLoading(true);

      await deletFile(`sitting_images/${sittingId}`, image?.fileName);

      if (isUpdate) {
        const res = await updateData(
          "sitting",
          {
            ...show,
            ...values,
            images: images.filter((p, i) => {
              return i !== idx;
            }),
          },
          sittingId
        );

        setSittings((prev) => {
          const ps = [...prev];
          const idx = prev.findIndex((p) => p.id === sittingId);
          ps[idx] = res;
          return ps;
        });
      }

      setImages((prev) => prev.filter((p, i) => i !== idx));
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      centered
    >
      <Modal.Header closeButton>New</Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div className={styles.images}>
          {images.map((img, i) => {
            return (
              <div key={`img-${i}`} className={styles.sittingImg}>
                <div className={styles.delete}>
                  <X
                    onClick={async () => {
                      await deleteImage(img, i);
                    }}
                  />
                </div>
                <Image src={img.src} alt="img" width={120} />
              </div>
            );
          })}
        </div>
        <br />
        <br />

        {newImg ? (
          <>
            <Image src={URL.createObjectURL(newImg)} fluid alt="newImg" />
            <br />
            <br />
            <CustomButton clickHandler={uploadImage}>Upload</CustomButton>
            <CustomButton
              clickHandler={() => {
                setNewImg(null);
              }}
            >
              Delete
            </CustomButton>
            <br />
          </>
        ) : (
          <div>
            <Form.Control
              type="file"
              accept=".jpg, .jpeg, .png"
              max={1}
              onChange={(e) => {
                setNewImg(e.target.files[0]);
              }}
            />
          </div>
        )}
        <br />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await saveSitting();
          }}
        >
          <Form.Control
            placeholder="Title"
            onChange={(e) => {
              setValues((prev) => ({ ...prev, title: e.target.value }));
            }}
            value={values.title}
            required
          />
          <br />
          <Form.Control
            placeholder="Procedure"
            onChange={(e) => {
              setValues((prev) => ({ ...prev, procedure: e.target.value }));
            }}
            value={values.procedure}
            required
          />
          <br />
          <Form.Control
            placeholder="Date"
            type="date"
            onChange={(e) => {
              setValues((prev) => ({ ...prev, date: e.target.value }));
            }}
            value={values.date}
            required
          />
          <br />
          <Form.Select
            placeholder="Payment Status"
            type="date"
            value={values.paymentStatus}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, paymentStatus: e.target.value }));
            }}
          >
            <option value="Partially Paid">Partially Paid</option>
            <option value="Fully Paid">Fully Paid</option>
          </Form.Select>
          <br />
          <Row>
            <Col xs={6}>
              <Form.Label>
                Received Payment
                <Form.Control
                  placeholder="Received Payment"
                  type="number"
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      receivedPayment: e.target.value,
                    }));
                  }}
                  value={values.receivedPayment}
                />
              </Form.Label>
            </Col>
            <Col xs={6}>
              {values?.paymentStatus === "Partially Paid" && (
                <Form.Label>
                  Pending Payment
                  <Form.Control
                    placeholder="Pending  Payment"
                    type="number"
                    onChange={(e) => {
                      setValues((prev) => ({
                        ...prev,
                        pendingPayment: e.target.value,
                      }));
                    }}
                    value={values.pendingPayment}
                  />
                </Form.Label>
              )}
            </Col>
          </Row>

          <hr />
          <Form.Control value={"Save"} type="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

const Sitting = ({
  data,
  setShowSittingForm,
  setSittings,
  index,
  setIsLoading,
}) => {
  const deleteSitting = async () => {
    try {
      setIsLoading(true);
      await deleteFolder(`sitting_images/${data?.id}`);
      await deletData("sitting", data?.id);
      setSittings((prev) => prev.filter((p, i) => i !== index));
    } catch (error) {
      console.log(error);

      alert("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Col xs={12} md={6} lg={4}>
      <div className={styles.Sitting}>
        <h4>{data?.title}</h4>
        <p>{data?.date}</p>
        <div>
          {data?.images?.[0] && (
            <ImageGallery
              imagesInfoArray={
                data?.images?.[0]
                  ? data.images.map((i) => ({ ...i, alt: "sitting img" }))
                  : []
              }
              columnCount={"3"}
              columnWidth={130}
              gapSize={24}
            />
          )}
        </div>
        <div>
          <CustomButton
            clickHandler={() => {
              setShowSittingForm(data);
            }}
          >
            Update
          </CustomButton>
          &nbsp; &nbsp;
          <CustomButton clickHandler={deleteSitting}>Delete</CustomButton>
        </div>
      </div>
    </Col>
  );
};

const ClientProfile = ({
  profile,
  setShowProfileFor,
  setProfiles,
  setIsLoading,
}) => {
  const isNew = profile === "new";

  const [values, setValues] = useState(
    isNew
      ? {
          name: "",
          location: "",
          phone: "",
          email: "",
        }
      : profile
  );

  const [profileImg, setProfileImage] = useState(profile?.profileImg || "");

  const [sittings, setSittings] = useState([]);

  const [showSittingForm, setShowSittingForm] = useState(false);

  const [password, setPassword] = useState("");

  const fetchSitting = async () => {
    try {
      setIsLoading(true);
      const res = await getDataByQuery("sitting", [
        "clientId",
        "==",
        profile?.id,
      ]);
      setSittings(res);
    } catch (err) {
      console.log(err);
      alert("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isNew) {
      fetchSitting();
    }
  }, []);

  const [newImg, setImg] = useState(null);

  const saveProfile = async () => {
    try {
      setIsLoading(true);
      if (isNew) {
        const userData = await createUserWithEmailAndPassword(
          auth,
          values.email,
          password
        );

        console.log(userData);

        const id = v4();
        let profileImgUrl = "";

        if (newImg) {
          profileImgUrl = await uploadFile(newImg, `profileImg/${id}`);
        }
        const res = await addData(
          "client_profile",
          {
            id,
            ...values,
            profileImg: profileImgUrl,
            uid: userData?.user?.uid,
          },
          id
        );
        setProfiles((prev) => [res, ...prev]);
        setShowProfileFor(null);
      } else {
        const res = await updateData(
          "client_profile",
          {
            ...profile,
            ...values,
            profileImg: profileImg,
          },
          profile?.id
        );
        setProfiles((prev) => {
          const ps = [...prev];
          const idx = prev.findIndex((p) => p.id === profile.id);
          ps[idx] = res;
          return ps;
        });
        alert("Success");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProfileImage = async () => {
    try {
      setIsLoading(true);

      await deleteFolder(`profileImg/${profile?.id}`);
      const res = await updateData(
        "client_profile",
        {
          ...profile,
          profileImg: "",
        },
        profile?.id
      );
      setProfiles((prev) => {
        const ps = [...prev];
        const idx = prev.findIndex((p) => p.id === profile.id);
        ps[idx] = res;
        return ps;
      });
      setProfileImage("");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProfileImage = async () => {
    try {
      setIsLoading(true);

      const profileImgUrl = await uploadFile(
        newImg,
        `profileImg/${profile?.id}`
      );

      const res = await updateData(
        "client_profile",
        {
          ...profile,
          profileImg: profileImgUrl,
        },
        profile?.id
      );
      setProfiles((prev) => {
        const ps = [...prev];
        const idx = prev.findIndex((p) => p.id === profile.id);
        ps[idx] = res;
        return ps;
      });
      setProfileImage(profileImgUrl);
      setImg(null);
      alert("success");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.ClientProfile}>
      <CustomButton
        clickHandler={() => {
          setShowProfileFor(null);
        }}
      >
        Back
      </CustomButton>
      &nbsp; &nbsp;
      <CustomButton
        clickHandler={() => {
          if (profileImg || sittings?.[0]) {
            alert("Please Delete Profile Picture and Sittings Before deleting");
          }
        }}
      >
        Delete Client
      </CustomButton>
      <hr />
      <br />
      <Row>
        <Col xs={12} md={6}>
          <div className={styles.img}>
            {isNew ? (
              <>
                {newImg ? (
                  <Image
                    src={URL.createObjectURL(newImg)}
                    alt="profileImg"
                    width={300}
                  />
                ) : (
                  <div className="">
                    <h4>Profile Picture</h4>
                    <Form.Control
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => {
                        setImg(e.target.files[0]);
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className={styles.profileImg}>
                {profileImg && <X onClick={deleteProfileImage} />}
                {!newImg && (
                  <Image
                    src={profileImg || "/images/user.jpg"}
                    alt="profileImg"
                    fluid
                  />
                )}
                {!profileImg && (
                  <>
                    {newImg ? (
                      <>
                        <Image
                          src={URL.createObjectURL(newImg)}
                          alt="profileImg"
                          width={300}
                        />
                        <br />
                        <br />
                        <CustomButton clickHandler={uploadProfileImage}>
                          Upload
                        </CustomButton>
                        &nbsp;
                        <CustomButton
                          clickHandler={() => {
                            setImg(null);
                          }}
                        >
                          Delete
                        </CustomButton>
                      </>
                    ) : (
                      <Form.Control
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => {
                          setImg(e.target.files[0]);
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className={styles.form}>
            <br />
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveProfile();
              }}
            >
              <Form.Control
                placeholder="Name"
                value={values?.name}
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, name: e.target.value }));
                }}
                required
              />
              <br />
              <Form.Control
                placeholder="Location"
                value={values?.location}
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, location: e.target.value }));
                }}
                required
              />
              <br />
              <Form.Control
                placeholder="Phone"
                value={values?.phone}
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, phone: e.target.value }));
                }}
                required
              />
              <br />
              <Form.Control
                placeholder="Email"
                value={values?.email}
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, email: e.target.value }));
                }}
                type="email"
                required
                disabled={!isNew}
              />
              {isNew && (
                <>
                  <br />
                  <Form.Control
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </>
              )}
              <br />
              <Form.Control value="Save" type="submit" />
            </form>
          </div>
        </Col>
      </Row>
      <br />
      <hr />
      {!isNew && (
        <CustomSection head="Sittings">
          {showSittingForm && (
            <SittingFormModal
              show={showSittingForm}
              setShow={setShowSittingForm}
              profile={profile}
              setSittings={setSittings}
              setIsLoading={setIsLoading}
            />
          )}
          <CustomButton
            clickHandler={() => {
              const newId = v4();
              setShowSittingForm({
                isNew: true,
                newId,
              });
            }}
          >
            Add Sitting
          </CustomButton>
          <Row>
            {sittings.map((sitting, idx) => {
              return (
                <Sitting
                  key={sitting.id}
                  data={sitting}
                  setShowSittingForm={setShowSittingForm}
                  setSittings={setSittings}
                  index={idx}
                  setIsLoading={setIsLoading}
                />
              );
            })}
          </Row>
        </CustomSection>
      )}
    </div>
  );
};

export default ClientProfile;
