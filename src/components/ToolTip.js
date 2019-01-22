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
      <span
        onMouseEnter={(evt) => this.handleHoverIn(evt)}
        onMouseLeave={(evt) => this.handleHoverOut(evt)}
      >
        {this.props.icon}
        {this.props.string}
        {this.props.symbol && 
          <div className="manasymbol noimg">
            {this.props.symbol}
          </div>
        }
        {this.state.showing && 
          <div className="tooltip">{this.props.text}
          </div>
          }
        
      </span>
    )
  }
}

export default ToolTip 