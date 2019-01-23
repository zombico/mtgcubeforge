import React, { Component } from 'react';
// import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCube, faUserCheck, faListUl, faSearch } from '@fortawesome/free-solid-svg-icons'
import Logo from './buttons/Logo'
import Footer from './Footer'

class About extends Component {
  async componentDidMount() {
    document.getElementById("abouttop").scrollIntoView()
  }
  render() {
    return (
      <>
      <div className="tempmain">
      <div className="App-header" id="viewsettings"><Logo /></div>
      <div className="dashboard">
      <h1 id="abouttop">About</h1>
      <br />
      <h2>What is MtG CubeForge?</h2>
      <p>MtG CubeForge is a free-to-use tool that lets you build and manage your Magic: the Gathering cubes online.  It relies on the Scryfall database for card data.  
        Started in fall 2018, it was originally conceived as a started project a full-stack class, and is now <a href="https://hackeryou.com/courses/full-stack-masterclass" target="_blank">featured in the course's site</a>.
        I am looking for ways to improve the experience and research ideas for new features, so please send your feedback to mtgcubeforge@gmail.com.  
        </p>

      
      <h2>For Magic players and cube builders</h2>
      <p>I have found that the  most helpful thing in balancing a cube is an easy access to the stats of the cube. 
         I've been using a measure that counts each card as a single type to help create a feel for the cube's spread.  
         I also look at converted mana costs, and seeing how they spread out can tell you a lot about a cube's speed.</p>
      
      <p>As a player who has been maintaining a Magic: the Gathering cubes for over a decade, and the reason I keep coming back to it is I love seeing all the different cards in a pile.  
        Within the chaos lies inspiration, and that's the experience I wanted to bring to this app.</p>
      
      <p>Designing a cube is to continuously cycle between knowing what you want and brainstorming, since each card opens up a new potential interaction with more cards. 
        While it is impossible to bring the physical element online, I was hoping that seeing a spread of cards would be the closest thing.
      </p>

      

      

      <h2>For developers</h2>
      <p>This app is built with React JS, ES6 JavaScript, and Sass front-end, running on an Express server on Node, linked to a MongoDB deployed via Heroku.  That sounds like a mouthfull, but it also happens to be my current preferred stack.  
      You can learn more about the project on <a href="https://github.com/zombico/mtgcubeforge">GitHub</a>, but if you have a specific question about the tech stack or the business logic of sorting Magic cards programmatically, send me an email at mtgcubeforge@gmail.com.
      </p>
      <p>I'm most proud about the schema for viewing cubes, and how the React Router and url props work together to create a robust viewing experience.</p>
      
      

      <h2>MtG CubeForge could use your support!</h2>

      <p>The plan is to operate the site for the entirity of 2019 and see what kind of impact it will have.  The cube community is very passionate and I am hoping that 
        this site is worthy of the time they spent building their cubes.  
      </p>
      <p>Your donation will help pay for server and hosting costs, as well as a heck of a way to get my attention for feature requests.</p>

      </div>
      <Footer />
      </div>
      
      </>
    )
  }
}

export default About