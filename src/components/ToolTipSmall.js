import React, { Component } from 'react';

class ToolTipSmall extends Component {  
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
        className="tooltip-small-container"
        onMouseEnter={(evt) => this.handleHoverIn(evt)}
        onMouseLeave={(evt) => this.handleHoverOut(evt)}
      >
        {this.props.contents}
        {this.state.showing && 
          <div className="tooltip-small">{this.props.text}
          </div>
          }
        
      </div>
    )
  }
}

export default ToolTipSmall 