import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faUserCheck, faListUl, faSearch } from '@fortawesome/free-solid-svg-icons'
import Logo from './buttons/Logo'

class HomePage extends Component {
  render() {
    return (
      <>
      <div className="homepage">
      <div className="App-header"><Logo /></div>
      <h1 className="splashheader"><FontAwesomeIcon icon={faCube} /> MtGcubeforGe</h1> 
      <h2>The best tool to view and build your Magic cubes. </h2>   
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
        <h3>First time here?  <Link to="/cubeviewer/5c2a6f9d7e19a100246a38e4"> Check out my cube!</Link> </h3>   
        <a href="https://magic.wizards.com/en/articles/archive/how-build/building-your-first-cube-2016-05-19" target="_blank">
        <h3>Learn how to build a cube!</h3>
        </a>
        <div className="vertical-buttonpanel">          
          <Link className="buttontransparent home" to="/login">Log In</Link>   
          <Link className="buttonprimary" to="/signup">Create account</Link>                 
        </div>
        <div>
          <p>Built with React JS, Node, Express, and MongoDB</p>
          <p>
            View project on <a className="homepage__link" href="https://github.com/zombico/mtgcubeforge">Github</a>.
            Card data sourced from the <a className="homepage__link" href="https://scryfall.com/">Scryfall API</a>.
          </p>
        
        </div>
      
      </div>
      
      <footer className="footer">
        <div className="footer-nav">
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <a target="_blank" href="https://www.paypal.me/mtgcubeforge">Donate</a>
        </div>
        <p>This site is not affiliated nor produced nor endorsed by Wizards of the Coast.  All card images, mana symbols, expansions and art related to Magic the Gathering is a property of Wizards of the Coast/Hasbro.</p>
        <p>This site is not affiliated nor endorsed by Scryfall LLC.  This site endeavours to adhere to the Scryfall data guidelines.</p>
        <p>All other content 2018-2019 Franz Ombico</p>
      </footer>    
      </>
    )
  }
}

export default HomePage