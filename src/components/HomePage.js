import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to MtG CubeForge</h1>
        <h2></h2>
        <p>Built witih React JS, Node, Express, MongoDB and the Scryfall API</p>
        <Link to="/signup">Create an account</Link>
        <Link to="/login">Log In</Link>
      </div>
    )
  }
}

export default HomePage