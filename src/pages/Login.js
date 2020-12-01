import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom"
import axios from "axios";
import { setToken, getToken } from "../services/tokenService";
import Logo from '../components/buttons/Logo'
import Footer from '../components/Footer'

class Login extends Component {
  state = {
    email: "",
    password: "",
    submitted: false,
    error401: false,
    error404: false,
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
      this.props.getCurrentUser()      
      
    } catch(e) {
      const err = e.toString()
      if (err.includes('401')) this.setState({ error401: true, error404: false })
      if (err.includes('404')) this.setState({ error404: true })
      
    }
    // 2. If we receive a successful response:
    //  - grab the token from the response
    //  - store it in local storage
    //  - call getCurrentUser
  };
  

  render() {
    const {error401, error404} = this.state
    if(!this.state.submitted) {
      return (
        <>
        <div className="tempmain">
          <div className="App-header" ><Logo /></div>
            <div className="dashboard thinner">
            <h1 className="centerizer">Log in</h1>
              <form onSubmit={this.handleSubmit}>
              <div className="gateway">
              
                <label className="gateway-label" htmlFor="login-email">Email: </label>
                <input
                  className="gateway-input"
                  type="email"
                  onChange={this.handleChange}
                  name="email"
                  id="login-email"
                  required          
                />
                {error404 && <div className="gateway-error">No user name found</div>}
              
                <label className="gateway-label" htmlFor="login-password">Password: </label>
                <input
                  className="gateway-input"
                  type="password"
                  onChange={this.handleChange}
                  name="password"
                  id="login-password"
                  required
                />

                {error401 && <div className="gateway-error">Incorrect password</div>}
              
                <div className="centerizer pushtop30">
                <input 
                  type="submit"
                  value="Log In" 
                  className="buttonprimary"
                />
                </div>                      
              </div>
            </form>  
          </div>
          
        </div>
        <Footer />
        </>
      );
    } else if(this.state.submitted) {
      return (
        <Redirect to="/dashboard" />
      )
    }
    
  }
}

export default Login;
