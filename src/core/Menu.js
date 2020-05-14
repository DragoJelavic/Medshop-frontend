import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import icon from "../icon.png";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <nav className="navbar navbar-expand-md navbar-dark bg-primary">
    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home <i class="fas fa-home ml-1"></i>
          </Link>
        </li>

        <li className="nav-item mr-1">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Shop <i class="fas fa-money-bill ml-1"></i>
          </Link>
        </li>

        <li className="nav-item mr-1">
          <Link
            className="nav-link"
            style={isActive(history, "/cart")}
            to="/cart"
          >
            Cart <i className="fas fa-shopping-basket ml-1"></i>
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
          </Link>
        </li>
      </ul>
    </div>
    <div className="mx-auto order-0">
      <a className="navbar-brand mx-auto" href="/">
        <img src={icon} alt="home-icon" height="40px"></img>
      </a>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ml-auto">
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item mr-1">
            <Link
              className="nav-link"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              {isAuthenticated().user.name}
              <i class="fas fa-user-circle ml-1"></i>
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item mr-1">
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              {isAuthenticated().user.name}
              <i class="fas fa-user-circle ml-1"></i>
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Signin
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              Signout <i class="fas fa-sign-out-alt"></i>
            </span>
          </li>
        )}
      </ul>
    </div>
  </nav>
);

export default withRouter(Menu);
