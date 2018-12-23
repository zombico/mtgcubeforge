import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
class HomePage extends Component {
  render() {
    return (
      <div className="homepage">
      <div className="App-header"></div>
        <h1 className="splashheader">MTG CubeForge</h1>
        <h2>Build and manage your Magic: the Gathering cubes</h2>
        <img src="/heroimg.svg" className="heromid" />
        <div className="vertical-buttonpanel">          
          <Link className="buttonblue" to="/signup">Create an account</Link>
          <Link className="buttonblue" to="/login">Log In</Link>          
        </div>
        <p>Built with React JS, Node, Express, MongoDB and the Scryfall API</p>
      </div>
    )
  }
}

export default HomePage