import React, { Component } from "react";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NavButtons from "./NavButtons";
import Secret from "./Secret";
import Auth from "../modules/Auth";

class MainContainer extends Component {
  state = {
    currentPage: "Home"
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    if (this.state.currentPage === "Home") {
      return <Home />;
    } else if (this.state.currentPage === "CreateAccount") {
      return <CreateAccount />;
    } else if (this.state.currentPage === "Login") {
      return <Login />;
    }
  };
  secretPage = () => {
    if (Auth.isUserAuthenticated()) {
      return <Secret />;
    }
  };

  render() {
    return (
      <div>
        <NavButtons
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
        />
        {this.renderPage()}
        {this.secretPage()}
      </div>
    );
  }
}

export default MainContainer;