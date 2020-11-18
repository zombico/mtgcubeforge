import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCube, faUserCheck, faListUl, faSearch } from '@fortawesome/free-solid-svg-icons'
import Logo from './buttons/Logo'
import Footer from './Footer'

class About extends Component {  
  async componentDidMount() {
    document.getElementById("about").scrollIntoView()
  }
  render() {
    return (
      <>
      <div className="tempmain">
      <div className="App-header" id="viewsettings"><Logo /></div>
      <div className="dashboard">
      <h1 id="about">About</h1>
      <br />
      <h2>What is MtG CubeForge?</h2>
      <p>MtG CubeForge is a free-to-use tool that lets you build and manage your Magic: the Gathering cubes online.  
        It relies on Scryfall, Magic's fastest-growing api for card data, so you have access to consistently sized, high-resolution images from various sets.
      </p>
      <p>Send your questions & feedback to mtgcubeforge@gmail.com. Looking forward to hearing from you! </p>

        <br />
      <h2>For Magic players and cube builders</h2>
      <p>I have been maintaining Magic: the Gathering cubes since Mirrodin, but it was only around Khans block that I came up with my sorting system, while staring at a pile of cards. 
        Within the chaos lies inspiration, and that's the experience I wanted to bring to this app.</p>
      
      <p>I have found that the  most helpful thing in balancing a cube is easy access to the stats of the cube. 
         I've been using a measure that counts each card as a single type to help create a feel for the cube's spread.  
         I also look at converted mana costs, and seeing how they spread out can tell you a lot about a cube's speed.</p>
      
      <Link to="/cubeviewer/5e686c3198499500243fba41" target="_blank"> Check out my modern-ish cube</Link >
      
      
      <p>Designing a cube is to continuously cycle between knowing what you want and brainstorming, since each card opens up a new potential interaction with more cards. 
        While it is impossible to bring the physical element online, I was hoping that seeing a spread of cards would be the closest thing.
      </p>

      

      
      <br />
      <h2>For developers</h2>
      <p>MtG CubeForge was originally conceived as a starter project in HackerYou's a full-stack class, and is now <a href="https://hackeryou.com/courses/full-stack-masterclass" target="_blank">featured in the course's site</a>.
      This app is built with React JS, ES6 JavaScript, and Sass front-end, running on an Express server on Node, linked to a MongoDB deployed via Heroku.  That sounds like a mouthfull, but it also happens to be my current preferred stack.  
      You can learn more about the project on <a href="https://github.com/zombico/mtgcubeforge">GitHub</a>, but if you have a specific question about the tech stack or the business logic of sorting Magic cards programmatically, send me an email at mtgcubeforge@gmail.com.
      </p>
      <p>I'm most proud about the schema for viewing cubes, and how the React Router and url props work together to create a robust viewing experience.</p>
      
      <br />
      <h2>Future Releases</h2>
      <p>
        It was a lot of work to get to this state, so the plan is to really let the people try it out and see what they think before any major changes are done.
        But here's a sneak peek at some of the enhancements I plan on looking at
        <ul>
          <li>Mock-draft and deckbuilder experience</li>          
          <li>Improving version changer UI for cards already in cube</li>
          <li>Improve mobile/phone browser experience </li>
          <li>Improve error handling</li>
          <li>Deck builder for non-cube formats (!?) </li>
        </ul>
      </p>
      <br />
      <h2>Please support MtG CubeForge!</h2>

      <p>The plan is to operate the site for the entirity of 2019 and see what kind of impact it will have.  The cube community is very passionate and I am hoping that 
        this site is worthy of the time they spent building their cubes.  
      </p>
      
      <p>You can support directly by donating via <a target="_blank" href="https://www.paypal.me/mtgcubeforge">Paypal</a></p>

      <p>Your donation will help pay for server and hosting costs, as well as a heck of a way to get my attention for feature requests.</p>

      </div>
      <Footer />
      </div>
      
      </>
    )
  }
}

export default About