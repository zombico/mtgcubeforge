import React, { Component } from "react";
import {Helmet} from "react-helmet";
import axios from "axios";
import Logo from '../components/buttons/Logo'
import Footer from '../components/Footer'


class Forgot extends Component {
  state = {    
    email: "",
    password: "",
    submitted: false,
  }
  
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email} = this.state;
    try {
      this.setState({ submitted: true })
      const res = await axios.post(`/forgotpw`, { email })
      const data = res.json()
      
      
    } catch(e) {
      const err = e.toString()
      
    }
   
  };
  

  render() {
    const {email, submitted} = this.state    
    return (
      <>
      <Helmet><title>Forgot password</title></Helmet>
      <div className="tempmain">
        <div className="App-header" ><Logo /></div>
          <div className="dashboard thinner">
          <h1 className="centerizer">Password Reset</h1>
            <form onSubmit={this.handleSubmit}>
            <div className="gateway">
            
              <label className="gateway-label" htmlFor="login-email">Email</label>
              <input
                className="gateway-input"
                // type="email"
                onChange={this.handleChange}
                name="email"
                id="login-email"
                required          
              />
              {/* {error404 && <div className="gateway-error">No user or email found</div>} */}
            
              {/* <label className="gateway-label" htmlFor="login-user">Username </label>
              <input
                className="gateway-input"
                // type="userna"
                onChange={this.handleChange}
                name="user_id"
                id="login-user"
                required
              /> */}

              {/* {error401 && <div className="gateway-error">Incorrect password</div>} */}

              {/* <div className="pushtop30">
                <input
                  type="checkbox"
                  defaultValue="unchecked"
                  required
                /><span>I confirm that this is my user account, and not someone else's. This app does not store personal data </span>
              </div> */}

              <div className="centerizer pushtop30">
              { !submitted &&  <input 
                type="submit"
                value="Send request" 
                className="buttonprimary"
              /> }

              {
                submitted && <span>Password reset link sent to {email}</span>
              }
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

export default Forgot;
