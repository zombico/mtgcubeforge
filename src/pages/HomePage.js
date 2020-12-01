import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faUserCheck, faListUl, faSearch } from '@fortawesome/free-solid-svg-icons'
import Logo from '../components/buttons/Logo'
import Footer from '../components/Footer'

class HomePage extends Component {
  render() {
    return (
      <>
      <div className="homepage">
      <div className="App-header"><Logo /></div>
      <div className="dashboard">
        <h1 className="splashheader"><FontAwesomeIcon icon={faCube} /> MtGcubeforGe</h1> 
        <h2>The simplest tool to view and build your Magic cubes. </h2>   
        
        
        <br/>
        <ul className="pitch">
        <li className="pitch__bullet">
          <FontAwesomeIcon icon={faUserCheck} className="pitch__icon" /> 
            <p>Free to sign up and use!</p>
          </li>
          <li className="pitch__bullet">
            <FontAwesomeIcon icon={faSearch} className="pitch__icon" /> 
            <p>Search all existing Magic cards, with high resolution images for available editions</p>
          </li>
          <li className="pitch__bullet">
            <FontAwesomeIcon icon={faListUl} className="pitch__icon" /> 
            <p>Easy upload, copy paste your list. (Editions will be automatically chosen).</p>
          </li>
          
        </ul>
        
          
          
          <div className="spacer5" />
          <h3>First time here?  <Link target="_blank" to="/cubeviewer/5e686c3198499500243fba41"> Check out my cube!</Link> </h3>   
          <a href="https://magic.wizards.com/en/articles/archive/how-build/building-your-first-cube-2016-05-19" target="_blank">
          <h3>Learn how to build a cube!</h3>
          </a>
          <div className="vertical-buttonpanel">          
            <Link className="buttontransparent home" to="/login">Log In</Link>
            <Link className="buttonprimary" to="/signup">Create account</Link>
          </div>
          <div>
            
            <p>
              View project on <a className="homepage__link" href="https://github.com/zombico/mtgcubeforge">Github</a>.
              Card data sourced from the <a className="homepage__link" href="https://scryfall.com/">Scryfall API</a>.
            </p>
            <p>Questions? Feedback? Reach out at mtgcubeforge@gmail.com</p>
          </div>
        
        </div>
      </div>
      <Footer />
      </>
    )
  }
}

export default HomePage