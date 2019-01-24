import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"

class Footer extends Component {
  render() {
    return (
      <>      
      <footer className="footer">
        <div className="footer-nav">
          <Link to="/dashboard">Home</Link>
          <Link to="/about">About</Link>
          
          <a target="_blank" href="https://www.paypal.me/mtgcubeforge">Donate</a>
          <a target="_blank" href="https://www.patreon.com/mtgcubeforge">Patreon</a>
        </div>
        <p>This site is not affiliated nor produced nor endorsed by Wizards of the Coast.  All card images, mana symbols, expansions and art related to Magic the Gathering is a property of Wizards of the Coast/Hasbro.</p>
        <p>This site is not affiliated nor endorsed by Scryfall LLC.  This site endeavours to adhere to the Scryfall data guidelines.</p>
        <p>All other content 2018-2019 MtG CubeForge</p>
      </footer>    
      </>
    )
  }
}

export default Footer