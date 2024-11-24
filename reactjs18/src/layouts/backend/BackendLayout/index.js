import React, { useContext } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import $ from "jquery";
import "../../../assets/admin/vendor/fontawesome-free/css/all.min.css";
import "../../../assets/admin/css/sb-admin-2.min.css";

import "../../../assets/admin/vendor/bootstrap/js/bootstrap.bundle.min.js";
import "../../../assets/admin/vendor/jquery-easing/jquery.easing.min.js";
import "../../../assets/admin/vendor/datatables/jquery.dataTables.min.js";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Outlet } from "react-router-dom";
import { MyContext } from "../../../App.js";

const BackendLayout = () => {
  const context = useContext(MyContext);

  return (
    <div id="wrapper">
      {/* Sidebar */}
      <Sidebar />
      {/* Content */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />

          <div className="container-fluid">
            <Outlet />
            {/* <Home /> */}
          </div>
          {/* <!-- /.container-fluid --> */}
        </div>
        <Footer />
      </div>
      <context.ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default BackendLayout;
