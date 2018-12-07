import React, { Component } from 'react';

class TooltipPanel extends Component {
  constructor() {
    super()
    this.state = {
      showButtons: true
    }

  }
  render() {
    // const controls = this.state
    return (
      <div className="searchbar__buildcontrols">
        <div className="searchbar__buildcontrols__container">
          <form onSubmit={this.props.handleAdd}>
          <button className="btn-onlist" 
          onClick={() => this.props.removeCard(this.props.id)}
          onMouseEnter={(evt) => this.props.handleHoverIn(evt)}
          onMouseLeave={(evt) => this.props.handleHoverOut(evt)}
        > wat </button>
          </form>
        </div>
      </div>
    )
  }
} 

export default TooltipPanel;