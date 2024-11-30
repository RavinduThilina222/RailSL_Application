
import React, { Component } from 'react';
import axios from 'axios';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: ''
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    try {
      const response = await axios.post("http://localhost:8080/api/admin/login", { username, password });
      console.log("Login response:", response.data); // Log response data
      // ...existing code to handle successful login...
    } catch (error) {
      console.error("Login error:", error); // Log error details
      this.setState({ errorMessage: error.response ? error.response.data.message : "Login failed" });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>
          <button type="submit">Login</button>
        </form>
        {this.state.errorMessage && <p className="error">{this.state.errorMessage}</p>}
      </div>
    );
  }
}

export default LoginPage;