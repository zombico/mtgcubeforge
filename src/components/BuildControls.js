import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

class BuildControls extends Component {
  colorShortcut(color, e) {
    e.preventDefault()
    document.getElementById(`${color}section`).scrollIntoView();
  }
  toTop(e) {
    e.preventDefault()
    document.getElementById("viewsettings").scrollIntoView();
  }
  
  render() {
    return (
      <div className="searchbar__buildcontrols">
        <div className="searchbar__buildcontrols__container">
        <div className="searchbar__buildcontrols__filler" /> 
        {
          this.props.hasControls ?
            <div className="searchbar__buildcontrols__panel">
            <form className="searchbar__buildcontrols__mainbutton" onSubmit={this.props.handleAdd}>            
            {this.props.stateReqstCard && <button className="addtocube" id="addtocube">Add to Cube</button> }
            {!this.props.stateReqstCard && <button className="searchbar__buildcontrols-shim">hi</button>}
            {!this.props.stateReqstCard && <button disabled className="addtocube disabled">Add to Cube</button> } 
                 
            </form> 
            <button className="addtocube transparent" onClick={this.props.clearSearch}>Clear Search</button>    
            </div>
            :
            <div className="searchbar__buildcontrols__panel">
            <Link className="addtocube" to="/signup">Build a Cube</Link>
            <button className="addtocube transparent" onClick={this.props.clearSearch}>Clear Search</button>
            </div>
        }
          
          <nav className="searchbar__buildcontrols__shortcut-container">
            {/* <ol className="searchbar__buildcontrols__label"> */}
            <ol className="searchbar__buildcontrols__shortcut">
            <li><a href="/#" onClick={(e) => this.toTop(e)}><FontAwesomeIcon icon={faCog} /> </a></li>
            <li><a href="/#" onClick={(e) => this.colorShortcut('Multicolor', e)}>Multicolor</a></li>
            <li><a href="/#" onClick={(e) => this.colorShortcut('Blue', e)}>Blue</a></li>
            <li><a href="/#" onClick={(e) => this.colorShortcut('Blue', e)}>Black</a></li>
            <li><a href="/#" onClick={(e) => this.colorShortcut('Blue', e)}>White</a></li>
            <li><a href="/#" onClick={(e) => this.colorShortcut('Blue', e)}>Red</a></li>
            <li><a href="/#" onClick={(e) => this.colorShortcut('Blue', e)}>Green</a></li>
            <li><a href="/#" onClick={(e) => this.colorShortcut('Blue', e)}>Colorless</a></li>
            <li><a href="/#" onClick={(e) => this.colorShortcut('Blue', e)}>Land</a></li>
            </ol>
          </nav>  
        </div>
        
      </div>
    )
  }
} 

export default BuildControls;