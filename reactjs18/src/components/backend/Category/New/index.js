import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../../../../lib/axios";
import { MyContext } from "../../../../App";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { Button, CircularProgress, Rating } from "@mui/material";
import "./../Category.css";
import { useNavigate } from "react-router-dom";
// import quill editor
// import ReactQuill from "react-quill";
// import EditorToolbar, { modules, formats } from "./../../../EditorToolbar";
// import "react-quill/dist/quill.snow.css";
import QuillEditor from "../../../QuillEditor";

const CategoryCreate = () => {
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [imgFiles, setImgFiles] = useState([]);
  const [previews, setPreviews] = useState();
  const [files, setFiles] = useState();

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    name: "",
    slug: "",
    description: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    image: "",
    status: 0,
  });

  useEffect(() => {
    setErrors(validateForm(formFields));
  }, [formFields]);

  useEffect(() => {
    if (!imgFiles) return;
    let tmp = [];
    for (let i = 0; i < imgFiles.length; i++) {
      tmp.push({
        imgPreview: URL.createObjectURL(imgFiles[i]),
        imgOriginal: imgFiles[i].name,
      });
    }
    const objectUrls = tmp;
    setPreviews(objectUrls);
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imgFiles]);

  const handleFileSelect = (event) => {
    const fileArray = Array.from(event.target.files); // chuyen filelist thanh array
    setImgFiles((prevImgFiles) => [...prevImgFiles, ...fileArray]);
  };
  // delete image preview
  const handelDeleteProductImagePreview = (fileName, event) => {
    try {
      setImgFiles((prevImgFiles) =>
        prevImgFiles.filter((img) => img.name !== fileName)
      );
    } catch (error) {}
  };

  const validateForm = (inputValues) => {
    let errors = {};
    if (inputValues.name.length === 0) {
      errors.name = "Email is empty";
    }

    if (inputValues.slug.length === 0) {
      errors.slug = "Slug is empty";
    }

    if (inputValues.meta_title.length === 0) {
      errors.meta_title = "Meta Title is empty";
    }
    if (inputValues.meta_keyword.length === 0) {
      errors.meta_keyword = "Meta Keyword is empty";
    }
    // if (inputValues.image.length === 0) {
    //   errors.image = "Images is empty";
    // }
    return errors;
  };
  const handleChange = (e) => {
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      [e.target.name]: e.target.value,
    }));
  };

  const onEditorChange = (value) => {
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      description: value,
    }));
  };
  const onFilesChange = (files) => {
    setFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Object.keys(errors).length);
    if (Object.keys(errors).length > 0) {
      context.toast.error("Validate Form Data has error");
    } else {
      const formData = new FormData();
      for (let i = 0; i < imgFiles.length; i++) {
        formData.append("images[]", imgFiles[i]);
      }

      formData.append("name", formFields.name);
      formData.append("slug", formFields.slug);
      formData.append("description", formFields.description);
      formData.append("meta_title", formFields.meta_title);
      formData.append("meta_keyword", formFields.meta_keyword);
      formData.append("meta_description", formFields.meta_description);
      formData.append("status", formFields.status);
      console.log(formData);
      axios
        .post("/api/v1/category", formData)
        .then((res) => {
          if (res.status === 200) {
            context.toast.success("Create Category Success !");
            navigate("/admin/category");
          }
          context.toast.error(res.error);
        })
        .catch((err) => {
          console.log(err);
          context.toast.error();
        });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                value={formFields.name}
                onChange={handleChange}
              />
            </div>
            {errors?.name ? (
              <span className="text-danger">*{errors.name}</span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Slug
              </label>
              <input
                type="text"
                className="form-control"
                name="slug"
                value={formFields.slug}
                onChange={handleChange}
              />
            </div>
            {errors?.slug ? (
              <span className="text-danger">*{errors.slug}</span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Description
              </label>

              <QuillEditor
                placeholder={"Write something awesome..."}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
              />
              {/* <textarea
                name="description"
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={handleChange}
                defaultValue={formFields.description}
              ></textarea> */}
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="status"
                value={formFields.status}
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Show
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Meta Title
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                name="meta_title"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            {errors?.meta_title ? (
              <span className="text-danger">*{errors.meta_title}</span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Meta Keyword
              </label>
              <input
                type="text"
                className="form-control"
                name="meta_keyword"
                onChange={handleChange}
              />
            </div>
            {errors?.meta_keyword ? (
              <span className="text-danger">*{errors.meta_keyword}</span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Meta Description
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                defaultValue={formFields.meta_description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card p-4 mt-0">
            <div className="imagesUploadSec">
              <h5 className="mb-4">Media And Published</h5>
              <div className="imgUploadBox d-flex align-items-center">
                {previews?.length !== 0 &&
                  previews?.map((img, index) => (
                    <div className="uploadBox" key={index}>
                      <span
                        className="remove"
                        onClick={(event) =>
                          handelDeleteProductImagePreview(
                            img.imgOriginal,
                            event
                          )
                        }
                      >
                        <IoCloseSharp />
                      </span>
                      <div className="box">
                        <LazyLoadImage
                          alt={"image"}
                          effect="blur"
                          name="image[]"
                          src={img.imgPreview}
                        ></LazyLoadImage>
                      </div>
                    </div>
                  ))}

                <div className="uploadBox">
                  <input
                    type="file"
                    multiple="multiple"
                    name="image"
                    onChange={handleFileSelect}
                  />

                  <div className="info">
                    <FaRegImages></FaRegImages>
                    <h5>image upload</h5>
                  </div>
                </div>
              </div>

              <br />

              <Button className="btn-blue btn-lg btn-big w-100" type="submit">
                {isLoading === true ? (
                  <CircularProgress color="inherit" className="loader" />
                ) : (
                  <>
                    <FaCloudUploadAlt></FaCloudUploadAlt> &nbsp; PUBLISH AND
                    VIEW
                  </>
                )}
              </Button>
            </div>
          </div>
          {errors?.image ? (
            <span className="text-danger">*{errors.image}</span>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CategoryCreate;
