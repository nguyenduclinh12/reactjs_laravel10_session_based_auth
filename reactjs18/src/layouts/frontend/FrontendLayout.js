import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { MyContext } from "../../App";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n.ts";

const FrontendLayout = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const language = localStorage.getItem("LANGUAGE");
    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);
  const handleChangeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    console.log(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("LANGUAGE", i18n.language);
  };
  return (
    <>
      {context.loading === null ? (
        <progress className="container-fluid" value={context.loading} />
      ) : (
        ""
      )}
      <Nav />
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <div className="form-control">
              <select
                name=""
                className="select-control"
                onChange={handleChangeLanguage}
                id=""
                value={i18n.language}
              >
                <option value="en">English</option>
                <option value="vn">Viet Nam</option>
              </select>
            </div>
            <div className="form-control mb-5">
              <label htmlFor="">{t("welcome")}</label>
              <p className="text-primary">{t("description")}</p>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontendLayout;
