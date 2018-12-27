import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom"
import axios from "axios";
import { setToken } from "../services/tokenService";

class Login extends Component {
  state = {
    email: "",
    password: "",
    submitted: false
  }
  
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    // 1. POST to /auth/login, passing in the email and password in the body
    try {
      const res = await axios.post('/login', { email, password })
      const token = res.data.token
      await setToken(token)
      this.setState({ submitted: true })
      
    } catch(e) {
      console.error(e)
    }
    // 2. If we receive a successful response:
    //  - grab the token from the response
    //  - store it in local storage
    //  - call getCurrentUser
  };
  render() {
    return (
      <div className="tempmain">
        <div className="App-header"/> 
        { !this.state.submitted &&
          <form onSubmit={this.handleSubmit}>
          <div className="gateway">
            <label className="gateway-label" htmlFor="login-email">Email: </label>
            <input
              className="gateway-input"
              type="email"
              onChange={this.handleChange}
              name="email"
              id="login-email"          
            />
          
            <label className="gateway-label" htmlFor="login-password">Password: </label>
            <input
              className="gateway-input"
              type="password"
              onChange={this.handleChange}
              name="password"
              id="login-password"
            />
          
            <div className="centerizer pushtop30">
            <input 
              type="submit"
              value="Log In" 
              className="buttonprimary"
            />
            </div>                      
          </div>
        </form>
        }  
        {
          this.state.submitted && 
          <Redirect to="/dashboard"/>
        }
        
      </div>
    );
  }
}

export default Login;
