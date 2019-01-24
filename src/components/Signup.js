import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"
import axios from "axios";
import { setToken } from "../services/tokenService";
import Logo from './buttons/Logo'
import Footer from './Footer'

class Signup extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    isDone: false
  }
  
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password, name } = this.state;
    // 1. POST to /auth/signup, passing in the email and password in the body
    try {
      const res = await axios.post('/signup', { email, password, name })
      const token = res.data.token
      setToken(token)
      
      this.props.getCurrentUser()
      this.setState({ isDone: true })
    } catch(e) {
      console.error(e)
    }
    // 2. If we receive a successful response:
    //  - grab the token from the response
    //  - store it in local storage
    //  - call getCurrentUser
  };
  render() {
    if(this.state.isDone) {
    return(
      <>
      <div className="tempmain">
        <div className="App-header" ><Logo /></div> 
        <div className="homepage">
          <h1>Your account has been created. <br/>Time to forge some cubes!</h1>          
          <div className="spacer5" />
          <Link className="buttontransparent" to="/login"><a>Log in for the first time</a></Link>
        </div>        
      </div>
      <Footer />
      </>
    )
    }
    if (!this.state.isDone ) {
    return (
      <>
      <div className="tempmain">
      <div className="App-header" ><Logo /></div> 
      <div className="dashboard thinner">
      <h1 className="centerizer">Sign up</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="gateway">
            <label className="gateway-label" htmlFor="signup-email">Email </label>
            <input
              className="gateway-input"
              type="email"
              onChange={this.handleChange}
              name="email"
              id="signup-email"
            />
          
            <label className="gateway-label" htmlFor="signup-password">Password </label>
            <input
              className="gateway-input"
              type="password"
              onChange={this.handleChange}
              name="password"
              id="signup-password"
              
            />
          
            <label className="gateway-label" htmlFor="signup-password">User Name </label>
            <input
              className="gateway-input"
              type="name"
              onChange={this.handleChange}
              name="name"
              id="signup-name"
              
            />
            <div className="centerizer pushtop30">
              <input className="buttonprimary" type="submit" value="Sign Up" />
            </div>
          </div>
        </form>
        </div>
      </div>  
      <Footer />
      </>
    );
    }
  }
}

export default Signup;
