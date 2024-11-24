import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../lib/axios";
import { removeStorage, fromStore } from "../../../lib/functions";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(fromStore("username"));
  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/logout")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          // remove token
          removeStorage("auth_token");
          navigate("/login");
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>

      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow">
          <Link
            className="nav-link dropdown-toggle"
            to="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
             {username}
            </span>
            <img
              className="img-profile rounded-circle"
              src="img/undraw_profile.svg"
              alt=""
            />
          </Link>
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <Link className="dropdown-item" to="#">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              Settings
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
              Activity Log
            </Link>
            <div className="dropdown-divider"></div>
            <button
              className="dropdown-item"
              onClick={handleLogout}
              data-toggle="modal"
              data-target="#logoutModal"
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
