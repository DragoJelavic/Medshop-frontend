import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "./apiAdmin";
import moment from "moment";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const destroy = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout
      title="Manage Categories"
      description="Perform CRUD on categories"
      className="container-fluid"
    >
      <h2 className="text-center">Total {categories.length} categories</h2>
      <hr />
      <br />
      <div className="container">
        <div className="row">
          {categories.map((p, i) => (
            <div className="col-3 manageP" key={i}>
              <strong className="mr-4">{p.name}</strong>
              <br />
              <p className="text text-center mt-2">
                Created {moment(p.createdAt).fromNow()}
              </p>
              <div className="mr-3 p-2">
                <button className="btn">
                  <span
                    onClick={() => destroy(p._id)}
                    className="badge badge-danger badge-pill"
                  >
                    Delete
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ManageCategories;
