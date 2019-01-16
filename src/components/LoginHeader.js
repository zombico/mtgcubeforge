import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom"
import axios from "axios";
import { setToken, getToken } from "../services/tokenService";
import Logo from './buttons/Logo'

class LoginHeader extends Component {
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
    // 1. POST to /auth/LoginHeader, passing in the email and password in the body
    try {
      const res = await axios.post('/LoginHeader', { email, password })
      const token = res.data.token
      await setToken(token)
      this.props.getCurrentUser()      
      
    } catch(e) {
      console.error(e)
    }
    // 2. If we receive a successful response:
    //  - grab the token from the response
    //  - store it in local storage
    //  - call getCurrentUser
  };
  

  render() {
    if(!this.state.submitted) {
      return (
        <div className="tempmain">
          <div className="App-header" ><Logo /></div>
          
            <form onSubmit={this.handleSubmit}>
            <div className="">
              <label className="" htmlFor="LoginHeader-email">Email: </label>
              <input
                className=""
                type="email"
                onChange={this.handleChange}
                name="email"
                id="LoginHeader-email"          
              />
            
              <label className="" htmlFor="LoginHeader-password">Password: </label>
              <input
                className=""
                type="password"
                onChange={this.handleChange}
                name="password"
                id="LoginHeader-password"
              />
            
              <div className="">
              <input 
                type="submit"
                value="Log In" 
                className="buttonprimary"
              />
              </div>                      
            </div>
          </form>  
        </div>
      );
    } else if(this.state.submitted) {
      return (
        <Redirect to="/dashboard" />
      )
    }
    
  }
}

export default LoginHeader;
