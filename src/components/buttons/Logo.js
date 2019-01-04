import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'

class Logo extends Component {    
  render() {
    return (      
      <Link to="/">
      <h3 className="smallheader"> <FontAwesomeIcon icon={faCube} /> MtGcubeforGe </h3> 
      </Link>              
    )
  }
}

export default Logo;