import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
class HomePage extends Component {
  render() {
    return (
      <div className="homepage">
      <div className="App-header"></div>
        <h1>MtG CubeForge</h1>
        <h2>Build and manage your Magic: the Gathering cubes</h2>
        <div className="vertical-buttonpanel">
          <div className="buttonblue">
            <Link to="/signup">Create an account</Link>
          </div>
          <div className="buttonblue">
            <Link to="/login">Log In</Link>
          </div>
        </div>
        <div class="spacer300" />
        <p>Built with React JS, Node, Express, MongoDB and the Scryfall API</p>
      </div>
    )
  }
}

export default HomePage