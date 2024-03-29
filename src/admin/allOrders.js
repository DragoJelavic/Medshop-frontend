import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getStatusValues, updateOrderStatus, listAllOrders } from "./apiAdmin";
import moment from "moment";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-up";

const AllOrders = () => {
  const [ordersAll, setOrdersAll] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listAllOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrdersAll(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (ordersAll.length > 0) {
      return (
        <h2 className="text-danger">There are {ordersAll.length} orders</h2>
      );
    } else {
      return <h2 className="text-danger">No orders</h2>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  const goBack = () => (
    <div className="mt-2 ml-1">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Orders"
      description={`G'day ${user.name}, you can manage all the orders here`}
      className="container-fluid"
    >
      <ScrollToTop showUnder={300}>
        <i
          class="far fa-arrow-alt-circle-up arrow"
          style={{ color: "limegreen", fontSize: "48px" }}
        ></i>
      </ScrollToTop>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {goBack()}
          {ordersAll.map((o, oIndex) => {
            return (
              <div
                className="mt-5 p-3"
                key={oIndex}
                style={{ border: "1px solid navy" }}
              >
                <div
                  className={
                    o.status == "Delivered" || (o.status = "Shipped")
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                >
                  <h2 className="mb-5">
                    <span>Order ID: {o._id}</span>
                  </h2>

                  <ul className="list-group mb-2">
                    <li className="list-group-item">{showStatus(o)}</li>
                    <li className="list-group-item">
                      Transaction ID: {o.transaction_id}
                    </li>
                    <li className="list-group-item">Amount: ${o.amount}</li>
                    <li className="list-group-item">
                      Ordered by: {o.user.name}
                    </li>
                    <li className="list-group-item">
                      Ordered on: {moment(o.createdAt).format("LLL")}
                    </li>
                    <li className="list-group-item">
                      Delivery address: {o.address}
                    </li>
                  </ul>
                </div>
                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order: {o.products.length}
                </h3>

                {o.products.map((p, pIndex) => (
                  <div
                    className="mb-4"
                    key={pIndex}
                    style={{
                      padding: "20px",
                      border: "1px solid rgb(202, 24, 24)",
                    }}
                  >
                    {showInput("Product name", p.name)}
                    {showInput("Product price", p.price)}
                    {showInput("Product total", p.count)}
                    {showInput("Product Id", p._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AllOrders;
