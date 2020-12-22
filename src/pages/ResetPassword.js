import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"
import axios from "axios";
import Logo from '../components/buttons/Logo'
import Footer from '../components/Footer'
import {Helmet} from "react-helmet";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: '',
      isDone: false,
      error404: false,
    }
  }

  async componentDidMount() {
    let request = this.props.location.search
    let request_id = request.replace('?', '')
    this.setState({ request_id: request_id })    
    const res = await axios.get(`/resetpw/${request_id}`)
    
    try {
      const email = res.data.data[0].email
      this.setState({ email: email})
    } catch(e) {
      this.setState({ error404: true })
    }
  }
  
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { password,email,request_id } = this.state;
    // 1. POST to /auth/signup, passing in the email and password in the body
    try {
      const res = await axios.patch(`/users/${email}/${password}`)
      const res2 = await axios.delete(`/forgotpw/${request_id}`)
      // const token = res.data.token
      // setToken(token)
      
      // this.props.getCurrentUser()
      this.setState({ isDone: true })
    } catch(e) {
      console.error(e)
      const err = e.toString()
      // if (err.includes('409')) this.setState({ error409: true })
    }
    
  };
  render() {
    const {error404} = this.state
    if(error404) {
      return (
        <div className="tempmain">
          <div className="App-header" ><Logo /></div> 
          <div className="dashboard thinner">
            <h3 className="centerizer">Password reset token expired</h3>
            <div style={{textAlign: "center", margin: 30}}><a className="buttonprimary" href="/forgot">Request new token</a></div>
          </div>
        </div>
      )
    }
    
    if(this.state.isDone) {
    return(
      <>
      <div className="tempmain">
        <div className="App-header" ><Logo /></div> 
        <div className="homepage">
          <h1>Your password has been updated </h1>          
          <div className="spacer5" />
          <Link className="buttontransparent" to="/login"><a>Log in</a></Link>
        </div>        
      </div>
      <Footer />
      </>
    )
    }
    if (!this.state.isDone ) {
    return (
      <>
      <Helmet><title>Reset password</title></Helmet>
      <div className="tempmain">
        <div className="App-header" ><Logo /></div> 
        <div className="dashboard thinner">
          <h1 className="centerizer">Change password</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="gateway">
            
              <label className="gateway-label" htmlFor="signup-password">Password </label>
              <input
                className="gateway-input"
                type="password"
                onChange={this.handleChange}
                name="password"
                id="signup-password"
                required
              />
            
              <div className="centerizer pushtop30">
                <input className="buttonprimary" type="submit" value="Submit" />
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

export default ResetPassword;
