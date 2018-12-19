import React, { Component } from 'react';

class BuildControls extends Component {
  render() {
    return (
      <div className="searchbar__buildcontrols">
        <div className="searchbar__buildcontrols__container">
          <form onSubmit={this.props.handleAdd}>
            
            {this.props.stateReqstCard && <button className="addtocube" id="addtocube">Add to Cube</button> }
            {!this.props.stateReqstCard && <button className="searchbar__buildcontrols-shim">hi</button>}
            {!this.props.stateReqstCard && <button disabled className="addtocube disabled">Add to Cube</button> }
          </form>
        </div>
      </div>
    )
  }
} 

export default BuildControls;