import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">
          SB Admin <sup>2</sup>
        </div>
      </Link>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <Link className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      {/* <div className="sidebar-heading">Interface</div> */}

      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-fw fa-cog"></i>
          <span>Categories</span>
        </Link>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Components:</h6>
            <Link className="collapse-item" to="/admin/category">
              LIST
            </Link>
            <Link className="collapse-item" to="/admin/category/create">
              NEW
            </Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseProduct"
          aria-expanded="true"
          aria-controls="collapseProduct"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>Products</span>
        </Link>
        <div
          id="collapseProduct"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to={"/admin/product"}>
              List
            </Link>
            <Link className="collapse-item" to={"/admin/product/create"}>
              Create
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseTag"
          aria-expanded="true"
          aria-controls="collapseTag"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>Tags</span>
        </Link>
        <div
          id="collapseTag"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to={"/admin/tag"}>
              List
            </Link>
            <Link className="collapse-item" to={"/admin/tag/create"}>
              Create
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapsePost"
          aria-expanded="true"
          aria-controls="collapsePost"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>Posts</span>
        </Link>
        <div
          id="collapsePost"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to={"/admin/post"}>
              List
            </Link>
            <Link className="collapse-item" to={"/admin/post/create"}>
              Create
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseComment"
          aria-expanded="true"
          aria-controls="collapseComment"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>comments</span>
        </Link>
        <div
          id="collapseComment"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to={"/admin/comment"}>
              List
            </Link>
            <Link className="collapse-item" to={"/admin/comment/create"}>
              Create
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseOrder"
          aria-expanded="true"
          aria-controls="collapseOrder"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>Orders</span>
        </Link>
        <div
          id="collapseOrder"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to={"/admin/order"}>
              List
            </Link>
            <Link className="collapse-item" to={"/admin/order/create"}>
              Create
            </Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUser"
          aria-expanded="true"
          aria-controls="collapseUser"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>Users</span>
        </Link>
        <div
          id="collapseUser"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to={"/admin/user"}>
              List
            </Link>
            <Link className="collapse-item" to={"/admin/user/create"}>
              Create
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseHistory"
          aria-expanded="true"
          aria-controls="collapseHistory"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>History</span>
        </Link>
        <div
          id="collapseHistory"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to={"/admin/history"}>
              List
            </Link>
            <Link className="collapse-item" to={"/admin/history/create"}>
              Create
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseRole"
          aria-expanded="true"
          aria-controls="collapseRole"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>Roles</span>
        </Link>
        <div
          id="collapseRole"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to={"/admin/role"}>
              List
            </Link>
            <Link className="collapse-item" to={"/admin/role/create"}>
              Create
            </Link>
          </div>
        </div>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Addons</div>

      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="true"
          aria-controls="collapsePages"
        >
          <i className="fas fa-fw fa-folder"></i>
          <span>Settings</span>
        </Link>
        <div
          id="collapsePages"
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Login Screens:</h6>
            <Link className="collapse-item" href="login.html">
              Login
            </Link>
            <Link className="collapse-item" href="register.html">
              Register
            </Link>
            <Link className="collapse-item" href="forgot-password.html">
              Forgot Password
            </Link>
            <div className="collapse-divider"></div>
            <h6 className="collapse-header">Other Pages:</h6>
            <Link className="collapse-item" href="404.html">
              404 Page
            </Link>
            <Link className="collapse-item" href="blank.html">
              Blank Page
            </Link>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Sidebar;
