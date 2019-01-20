import React, { Component } from 'react';
// import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCube, faUserCheck, faListUl, faSearch } from '@fortawesome/free-solid-svg-icons'
import Logo from './buttons/Logo'
import Footer from './Footer'

class About extends Component {
  render() {
    return (
      <>
      <div className="homepage">
      <div className="App-header"><Logo /></div>
      
      </div>
      
      <Footer />
      </>
    )
  }
}

export default About