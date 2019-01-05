import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import Logo from './buttons/Logo'

class HomePage extends Component {
  render() {
    return (
      <div className="homepage">
      <div className="App-header"><Logo /></div>
        <h1 className="splashheader"><FontAwesomeIcon icon={faCube} /> MtGcubeforGe</h1> 
        <h2>Build and manage your Magic: the Gathering cubes</h2>
        
        
        <img src="/heroimg.svg" className="heromid" />
        <div className="vertical-buttonpanel">          
          <Link className="buttonprimary" to="/signup">Create account</Link>
          <Link className="buttonprimary" to="/login">Log In</Link>          
        </div>
        <p>Built with React JS, Node, Express, and MongoDB</p>
        <p>
          View project on <a className="homepage__link" href="https://github.com/zombico/mtgcubeforge">Github</a>.
          Card data sourced from the <a className="homepage__link" href="https://scryfall.com/">Scryfall API</a>.
        </p>
        <p>2018 Franz Ombico</p>
      </div>
    )
  }
}

export default HomePage