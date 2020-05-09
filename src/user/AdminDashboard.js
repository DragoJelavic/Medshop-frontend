import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import avatar from "../default-avatar.jpg";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              View Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/users">
              List users
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="col-4 mt-4">
        <div className="card-header userProf">User Information</div>
        <div className="imgContainer">
          <img src={avatar} alt="" className="avatar"></img>
        </div>
        <div className="card-body">
          <ul className="list-group mb-2">
            <li className="list-group-item">
              <b className="mr-1">Name</b>
              {name}
            </li>
            <li className="list-group-item">
              <b className="mr-1">Email</b>
              {email}
            </li>
            <li className="list-group-item">
              <b className="mr-1">Role</b>
              {role === 1 ? "Admin" : "Registered User"}
            </li>
          </ul>
        </div>
      </div>
    );
  };
  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
