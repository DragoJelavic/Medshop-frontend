import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import moment from "moment";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <h2 className="text-center">Total {products.length} products</h2>
      <hr />
      <br />
      <div className="container">
        <div className="row">
          {products.map((p, i) => (
            <div className="col-3 manageP" key={i}>
              <strong className="mr-4">{p.name}</strong>
              <br />
              <p className="text text-center mt-2">
                Created {moment(p.createdAt).fromNow()}
              </p>
              <div className="mr-3 p-2">
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill mr-1">
                    Update
                  </span>
                </Link>
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

export default ManageProducts;
