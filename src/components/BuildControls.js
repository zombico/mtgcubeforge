import React, { Component } from 'react';

class BuildControls extends Component {
  colorShortcut(color, e) {
    e.preventDefault()
    document.getElementById(`${color}section`).scrollIntoView();
  }
  
  render() {
    return (
      <div className="searchbar__buildcontrols">
        <div className="searchbar__buildcontrols__container">
          <form className="searchbar__buildcontrols__mainbutton" onSubmit={this.props.handleAdd}>
            
            {this.props.stateReqstCard && <button className="addtocube" id="addtocube">Add to Cube</button> }
            {!this.props.stateReqstCard && <button className="searchbar__buildcontrols-shim">hi</button>}
            {!this.props.stateReqstCard && <button disabled className="addtocube disabled">Add to Cube</button> }
            
          </form>
          <div className="searchbar__buildcontrols__shortcut" >
            <div className="searchbar__buildcontrols__label">Jump to</div>
            <a href="#" onClick={(e) => this.colorShortcut('multicolor', e)}>Multicolor</a>
            <a href="#" onClick={(e) => this.colorShortcut('blue', e)}>Blue</a>
            <a href="#" onClick={(e) => this.colorShortcut('black', e)}>Black</a>
            <a href="#" onClick={(e) => this.colorShortcut('white', e)}>White</a>
            <a href="#" onClick={(e) => this.colorShortcut('red', e)}>Red</a>
            <a href="#" onClick={(e) => this.colorShortcut('green', e)}>Green</a>
            <a href="#" onClick={(e) => this.colorShortcut('colorless', e)}>Colorless</a>
            <a href="#" onClick={(e) => this.colorShortcut('land', e)}>Land</a>
          </div>  
        </div>
        
      </div>
    )
  }
} 

export default BuildControls;