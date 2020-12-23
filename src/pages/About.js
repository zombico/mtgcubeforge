import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCube, faUserCheck, faListUl, faSearch } from '@fortawesome/free-solid-svg-icons'
import Logo from '../components/buttons/Logo'
import Footer from '../components/Footer'

class About extends Component {  
  async componentDidMount() {
    document.getElementById("about").scrollIntoView()
  }
  render() {
    return (
      <>
      <Helmet><title>About</title></Helmet>
      <div className="tempmain">
      <div className="App-header" id="viewsettings"><Logo /></div>
      <div className="dashboard">
      <h1 id="about">About</h1>
      <br />
      <h2>What is MtG CubeForge?</h2>
      <p>MtG CubeForge is a free-to-use tool that lets you build and manage your Magic: the Gathering cubes online.  
        It relies on Scryfall, Magic's leading api for card data, so you have access to consistently sized, high-resolution images from various sets, and sometimes from even other languages.
      </p>
      
      <p>If you are purchasing from TCG or ebay, please consider using our affiliate link by searching for the card on MtG CubeForge. </p>
      <p>Send your questions & feedback to mtgcubeforge@gmail.com. Looking forward to hearing from you. </p>  

        <br />
        <h2>December 2020 Updates</h2>
        <ul>
          <li><p>Password reset now available for accounts with valid emails. A unique link will be sent to your email that will let you change your password. </p> </li>
        
          <li>Cubeviewer now more accessible with phones by using the Explore feature        
            <p>Viewing experience on mobile was always going to be challening because of the size and nature of cubes.  Hopefully this feature allows you to view without having to scroll
              through every single card and color.
            </p>
          </li>
        
          <li>Foil filter now available. You can now choose to display a foil printing by selecting in the modify card settings, or while searching.          
          <p>Cards that are default in foil won't get the filter, and neither will cards that did not have a foil printing.</p>
          </li>
          <li>English cards set to default when reassigning versions.  Other languages are still available, just click the toggle to enable them.</li>
        </ul>
        

      <h2>November 2020 Updates</h2>
      <ul>
        <li>Pricing and shopping support</li>
        <li>Export list to clipboard</li>
        <li>Error messages for login/signup</li>
        <li>Link to share button on cube builder</li>
      </ul>
      
      
      </div>
      <Footer />
      </div>
      
      </>
    )
  }
}

export default About