import React, { Component } from 'react';

class TooltipZoom extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showing: false
    }
    this.handleHoverIn = this.handleHoverIn.bind(this)
    this.handleHoverOut = this.handleHoverOut.bind(this)
  }

  handleHoverIn(evt) {
    this.setState({ showing: true })
  }
  handleHoverOut(evt) {
    this.setState({ showing: false })
  }

  render() {
    const visible = this.state.showing
    return (
      // <img className="tooltipzoom" 
      //   src={card.imgsm && this.state.showing} 
      // /> 
      visible && 
      <div>banana</div>
    )
}
}


export default TooltipZoom;