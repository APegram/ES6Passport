import React, { Component } from "react";
import API from "../../utils/API"
import Auth from "../../modules/Auth"


class Login extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    email: "",
    password: ""
  };

  // handle any changes to the input fields
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, prevent the default event and alert the username and password
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password){
      API.verifyUser({
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        Auth.authenticateUser(res.data.token)
        this.setState({email: "", password: "" })
    })
      .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <form>
        <p>email: {this.state.email}</p>
        <p>Password: {this.state.password}</p>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleFormSubmit}>Login</button>
      </form>
    );
  }
}

export default Login;