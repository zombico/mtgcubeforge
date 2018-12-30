import React, { Component } from 'react';

class ToolTip extends Component {  
  state = {
    showing: false
  }
  handleHoverIn(evt) {
    this.setState({ showing: true })
  }
  handleHoverOut(evt) {
    this.setState({ showing: false })
  }
  render() {
    
    return (
      <div
        onMouseEnter={(evt) => this.handleHoverIn(evt)}
        onMouseLeave={(evt) => this.handleHoverOut(evt)}
      >
        {this.props.icon}
        {this.state.showing && 
          <div className="tooltip">{this.props.text}
          </div>
          }
        
      </div>
    )
  }
}

export default ToolTip 