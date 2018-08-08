import React from "react";
import Auth from "../modules/Auth";

const NavButtons = props => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <button
        onClick={() => props.handlePageChange("Home")}
        className={
          props.currentPage === "Home" ? "nav-link active" : "nav-link"
        }
      >
        Home
      </button>
    </li>
    <li className="nav-item">
      <button
        onClick={() => props.handlePageChange("CreateAccount")}
        className={
          props.currentPage === "CreateAccount" ? "nav-link active" : "nav-link"
        }
      >
        CreateAccount
      </button>
    </li>
    <li className="nav-item">
      <button
        onClick={() => props.handlePageChange("Login")}
        className={
          props.currentPage === "Login" ? "nav-link active" : "nav-link"
        }
      >
        Login
      </button>
    </li>
    <li className="nav-item">
      <button
        onClick={() => Auth.deauthenticateUser()}
        className={
          props.currentPage === "Home" ? "nav-link active" : "nav-link"
        }
      >
        Logout
      </button>
    </li>
  </ul>
);

export default NavButtons;