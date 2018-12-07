import React, { Component } from 'react';

class BuildControls extends Component {
  constructor() {
    super()
    this.state = {
      showAddButton: true
    }

  }
  render() {
    const controls = this.state
    return (
      <div className="searchbar__buildcontrols">
        <div className="searchbar__buildcontrols__container">
          <form onSubmit={this.props.handleAdd}>
            {controls.showAddButton && <button id="addtocube">Add to Cube</button> }
          </form>
        </div>
      </div>
    )
  }
} 

export default BuildControls;