import CustomButton from "@/components/ui/custom_button/custom_button";
import {
  addData,
  deleteFolder,
  deletFile,
  updateData,
  uploadFile,
} from "@/libs/firebase/firebase";
import React, { useState } from "react";
import { Form, Image } from "react-bootstrap";
import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar,
  BtnBulletList,
  BtnNumberedList,
  BtnClearFormatting,
  BtnStyles,
  HtmlButton,
} from "react-simple-wysiwyg";
import styles from "./new_service.module.scss";
import SpinnerScreen from "@/components/ui/spinner_screen/spinner_screen";
import { v4 } from "uuid";

const NewService = ({
  service,
  setShowForm,
  currentPost,
  setServices,
  setCurrentPost,
  isBlog,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState(currentPost?.rows || []);
  const [values, setValues] = useState({
    title: currentPost?.title || "",
    price: currentPost?.price || "",
    service: isBlog ? "Blogs" : service.id,
    description: currentPost?.description || "",
    headImg: currentPost?.headImg || null,
    keywords: currentPost?.keywords || "",
  });

  const postProject = async (e) => {
    e.preventDefault();

    try {
      if (rows.some((r) => !r.isUploaded) || !values?.headImg?.isUploaded) {
        throw new Error("upload all images before submitting");
      }
      if (currentPost) {
        await updateData(
          isBlog ? "blog_post" : "service_post",
          {
            ...currentPost,
            ...values,
            rows,
          },
          currentPost?.id
        );
        setServices((prev) => {
          const allPosts = [...prev];
          const postIdx = prev.findIndex((p) => p.id === currentPost.id);
          allPosts[postIdx] = {
            ...currentPost,
            ...values,
            rows,
          };
          return allPosts;
        });
      } else {
        const id = values.title.replace(" ", "-").toLowerCase();
        const res = await addData(
          isBlog ? "blog_post" : "service_post",
          {
            id,
            ...values,
            rows,
          },
          id
        );

        setServices((prev) => [...prev, res]);
      }

      alert("success");
      setCurrentPost(null);
      setShowForm(null);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const uploadHeadImage = async () => {
    setIsLoading(true);
    try {
      const res = await uploadFile(
        values?.headImg?.img,
        `service_post/${v4()}/headImg`
      );

      setValues((prev) => {
        return {
          ...prev,
          headImg: {
            img: res,
            isUploaded: true,
          },
        };
      });
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHeadImg = async () => {
    setIsLoading(true);
    try {
      if (values?.headImg?.isUploaded) {
        await deleteFolder(`service_post/${service.id}/headImg`);
      }
      setValues((prev) => ({ ...prev, headImg: null }));
    } catch (error) {
      alert("error");
      // setValues((prev) => ({ ...prev, headImg: null }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <SpinnerScreen />}
      <div>
        <br />
        <form onSubmit={postProject}>
          <p>Category: {service.title}</p>
          <br />
          <p>Head image</p>

          {values.headImg?.img ? (
            <>
              <Image
                width={300}
                src={
                  values?.headImg?.isUploaded
                    ? values?.headImg?.img
                    : URL.createObjectURL(values?.headImg?.img)
                }
                alt="img"
              />
              <div>
                {!values?.headImg?.isUploaded && (
                  <CustomButton clickHandler={uploadHeadImage}>
                    Upload
                  </CustomButton>
                )}
                <CustomButton clickHandler={deleteHeadImg}>Delete</CustomButton>
              </div>
            </>
          ) : (
            <Form.Control
              type="file"
              max={1}
              accept=".png"
              onChange={(e) => {
                setValues((prev) => {
                  return {
                    ...prev,
                    headImg: {
                      img: e.target.files[0],
                      isUploaded: false,
                    },
                  };
                });
              }}
            />
          )}
          {/* <div className={`${styles.headerImages}`}>
          {headImages.map((hi) => {
            return (
              <div
                key={`headImg_${hi}`}
                className={values.headImg === hi ? styles.selected : ""}
                onClick={() => {
                  setValues((prev) => ({ ...prev, headImg: hi }));
                }}
              >
                <Image src={`/images/png/${hi}.PNG`} width={80} />
              </div>
            );
          })}
        </div> */}
          <br />
          <Form.Control
            placeholder="Title"
            onChange={(e) => {
              setValues((prev) => ({ ...prev, title: e.target.value }));
            }}
            value={values.title}
          />
          <br />
          {!isBlog && (
            <>
              <Form.Control
                placeholder="Price"
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, price: e.target.value }));
                }}
                value={values.price}
              />
              <br />
            </>
          )}

          <textarea
            placeholder="Description"
            rows={3}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, description: e.target.value }));
            }}
            style={{
              width: "100%",
            }}
            value={values.description}
          />
          <br />
          <br />
          <Form.Control
            placeholder="Keywords"
            onChange={(e) => {
              setValues((prev) => ({ ...prev, keywords: e.target.value }));
            }}
            value={values.keywords}
          />
          <br />
          {rows.map((r, i) => {
            return (
              <div key={i}>
                {!r.img && (
                  <Form.Control
                    type="file"
                    max={1}
                    accept=".jpg"
                    onChange={(e) => {
                      setRows((prev) => {
                        const r = [...prev];
                        r[i].isUploaded = false;
                        r[i].img = e.target.files[0];
                        return r;
                      });
                    }}
                  />
                )}
                {r.img && r.isUploaded && (
                  <div>
                    <Image src={r.img} width={300} alt="xx" />
                    <br />
                    <CustomButton
                      clickHandler={async () => {
                        try {
                          const res = await deletFile(
                            `service_post/${service.id}`,
                            r.fileName
                          );
                          if (res) {
                            setRows((prev) => {
                              const r = [...prev];
                              r[i].isUploaded = false;
                              r[i].img = "";

                              return r;
                            });
                          }
                        } catch (error) {
                          setRows((prev) => {
                            const r = [...prev];
                            r[i].isUploaded = false;
                            r[i].img = "";
                            return r;
                          });
                        }
                      }}
                    >
                      Delete
                    </CustomButton>
                  </div>
                )}

                {r.img && !r.isUploaded && (
                  <div>
                    <Image
                      src={URL.createObjectURL(r.img)}
                      width={300}
                      alt="xx"
                    />
                    <br />
                    <CustomButton
                      clickHandler={async () => {
                        try {
                          const res = await uploadFile(
                            r.img,
                            `service_post/${service.id}`
                          );
                          setRows((prev) => {
                            const r = [...prev];
                            r[i].isUploaded = true;
                            r[i].fileName = prev[i].img.name;
                            r[i].img = res;
                            return r;
                          });
                          console.log(res);
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    >
                      Upload
                    </CustomButton>
                    &nbsp; &nbsp;
                    <CustomButton
                      clickHandler={() => {
                        setRows((prev) => {
                          const r = [...prev];
                          r[i].isUploaded = false;
                          r[i].img = "";

                          return r;
                        });
                      }}
                    >
                      Delete
                    </CustomButton>
                  </div>
                )}

                <br />
                <EditorProvider>
                  <Editor
                    value={r.text}
                    onChange={(e) => {
                      setRows((prev) => {
                        const r = [...prev];
                        r[i].text = e.target.value;
                        return r;
                      });
                    }}
                    aria-required
                  >
                    <Toolbar>
                      <BtnBold />
                      <BtnItalic />
                      <BtnBulletList />
                      <BtnNumberedList />
                      <BtnClearFormatting />
                      <BtnStyles />
                    </Toolbar>
                  </Editor>
                </EditorProvider>
                <br />
              </div>
            );
          })}
          <br />
          <CustomButton
            clickHandler={() => {
              setRows((prev) => [
                ...prev,
                {
                  img: "",
                  text: "",
                },
              ]);
            }}
          >
            Add Row
          </CustomButton>
          <br />
          <br />
          <Form.Control type="submit" />
          <br />
        </form>
      </div>
    </>
  );
};

export default NewService;
