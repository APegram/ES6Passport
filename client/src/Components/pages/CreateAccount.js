import React, { Component } from "react";
import API from "../../utils/API"


class CreateAccount extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    firstName: "",
    lastName: "",
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
    if (this.state.firstName && this.state.lastName && this.state.email && this.state.password){
      API.createUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {        
        this.setState({ firstName: "", lastName: "", email: "", password: "" })        
      })
      .catch(err => {
        console.log("this is an error " + err);  
      });
      
    }
  };

  render() {
    return (
      <form>
        <p>FirstName: {this.state.firstName}</p>
        <p>LastName: {this.state.lastName}</p>
        <p>email: {this.state.email}</p>
        <p>Password: {this.state.password}</p>
        <input
          type="text"
          placeholder="FirstName"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          placeholder="LastName"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleInputChange}
        />
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
        <button onClick={this.handleFormSubmit}>Submit</button>
      </form>
    );
  }
}

export default CreateAccount;