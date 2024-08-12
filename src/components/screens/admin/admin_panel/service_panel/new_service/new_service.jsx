import CustomButton from "@/components/ui/custom_button/custom_button";
import {
  addData,
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
} from "react-simple-wysiwyg";

const NewService = ({
  service,
  setShowForm,
  currentPost,
  setServices,
  setCurrentPost,
}) => {
  const [rows, setRows] = useState(currentPost?.rows || []);
  const [values, setValues] = useState({
    title: currentPost?.title || "",
    price: currentPost?.price || "",
    service: service.id,
    description: currentPost?.description || "",
  });

  const postProject = async (e) => {
    e.preventDefault();

    try {
      if (rows.some((r) => !r.isUploaded)) {
        throw new Error("upload all images before submitting");
      }
      if (currentPost) {
        const res = updateData(
          "service_post",
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
          "service_post",
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

  return (
    <div>
      <br />
      <form onSubmit={postProject}>
        <p>Category: {service.title}</p>
        <br />
        <Form.Control
          placeholder="Title"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, title: e.target.value }));
          }}
          value={values.title}
        />
        <br />
        <Form.Control
          placeholder="Price"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, price: e.target.value }));
          }}
          value={values.price}
        />
        <br />
        <textarea
          placeholder="Description"
          rows={3}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, description: e.target.value }));
          }}
          value={values.description}
        />
        <br />
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
                        console.log(error);
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
  );
};

export default NewService;
