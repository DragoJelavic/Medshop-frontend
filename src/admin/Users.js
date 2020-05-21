import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listUsers } from "./apiAdmin";
import moment from "moment";
import avatar from "../default-avatar.jpg";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user, token } = isAuthenticated();

  const loadUsers = () => {
    listUsers(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const showUsersLength = () => {
    if (users.length > 0) {
      return <h1>Number of users: {users.length}</h1>;
    } else {
      return <h1 className="text-danger">No users</h1>;
    }
  };
  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="List of users"
      className="container-fluid"
      description={`Hello ${user.name}, these are all the users in the database`}
    >
      {showUsersLength()}
      <br />
      {goBack()}
      <div className="container">
        <div className="row mt-8">
          {users.map((x, userIndex) => {
            return (
              <div className="col-4 mt-4" key={x.userIndex}>
                <div className="card-header name">{x.name}</div>
                <div className="imgContainer">
                  <img src={avatar} alt="avatar-image" className="avatar"></img>
                </div>
                <div className="card-body">
                  <ul className="list-group mb-2">
                    <p className="black-10">
                      <b className="mr-1">Email:</b> {x.email}
                    </p>
                    <p className="black-10">
                      <b className="mr-1">ID:</b> {x._id}
                    </p>
                    <p className="black-9">
                      <b className="mr-1">Joined: </b>
                      {moment(x.createdAt).fromNow()}
                    </p>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Users;
