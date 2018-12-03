import React, { Component } from 'react';
import axios from "axios";
import TooltipPanel from "./TooltipPanel";

class DynamicListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingToolTip: false
    }
    this.handleHoverIn = this.handleHoverIn.bind(this)
    this.handleHoverOut = this.handleHoverOut.bind(this)
    this.removeCard = this.removeCard.bind(this)
  }

  removeCard = async id => {
    try {
      await axios.delete(`/fulgrens_cube/${id}`)
      this.props.loadCube()
    } catch (e){
      console.log(e)
    }
  }
  handleHoverIn(evt) {
    this.setState({ showingToolTip: true })
  }
  handleHoverOut(evt) {
    this.setState({ showingToolTip: false })
  }
  render() {
    const showingToolTip = this.state.showingToolTip
    return (
      <>
      <span className="dynamiclistitem__entry" 
        onMouseEnter={(evt) => this.handleHoverIn(evt)}
        onMouseLeave={(evt) => this.handleHoverOut(evt)}
        >{this.props.name}
      {showingToolTip && 
        <>
        <img className="tooltipzoom onlist" 
        src={this.props.tooltip} 
        alt={this.props.name} 
        onMouseEnter={(evt) => this.handleHoverIn(evt)}
        onMouseLeave={(evt) => this.handleHoverOut(evt)}
        />
        <TooltipPanel />
        </>  
      }
      </span>
      </>
    )
  }
}

export default DynamicListItem;