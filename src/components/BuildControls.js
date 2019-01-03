import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
class BuildControls extends Component {
  colorShortcut(color, e) {
    e.preventDefault()
    document.getElementById(`${color}section`).scrollIntoView();
  }
  
  render() {
    return (
      <div className="searchbar__buildcontrols">
        <div className="searchbar__buildcontrols__container">
        {
          this.props.hasControls ?
            <form className="searchbar__buildcontrols__mainbutton" onSubmit={this.props.handleAdd}>            
            {this.props.stateReqstCard && <button className="addtocube" id="addtocube">Add to Cube</button> }
            {!this.props.stateReqstCard && <button className="searchbar__buildcontrols-shim">hi</button>}
            {!this.props.stateReqstCard && <button disabled className="addtocube disabled">Add to Cube</button> }          
            </form> 
            :
            <Link className="addtocube" to="/signup">Build a Cube</Link>

        }
          
          <div className="searchbar__buildcontrols__shortcut" >
            <div className="searchbar__buildcontrols__label">Jump to</div>
            <a href="/#" onClick={(e) => this.colorShortcut('Multicolor', e)}>Multicolor</a>
            <a href="/#" onClick={(e) => this.colorShortcut('Blue', e)}>Blue</a>
            <a href="/#" onClick={(e) => this.colorShortcut('Black', e)}>Black</a>
            <a href="/#" onClick={(e) => this.colorShortcut('White', e)}>White</a>
            <a href="/#" onClick={(e) => this.colorShortcut('Red', e)}>Red</a>
            <a href="/#" onClick={(e) => this.colorShortcut('Green', e)}>Green</a>
            <a href="/#" onClick={(e) => this.colorShortcut('Colorless', e)}>Colorless</a>
            <a href="/#" onClick={(e) => this.colorShortcut('Land', e)}>Land</a>
          </div>  
        </div>
        
      </div>
    )
  }
} 

export default BuildControls;