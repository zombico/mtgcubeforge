import React, { Component } from 'react';
import axios from "axios";

class DynamicList extends Component {
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
      <div className="dynamiclist" 
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
        <button className="btn-onlist" 
          onClick={() => this.removeCard(this.props.id)}
          onMouseEnter={(evt) => this.handleHoverIn(evt)}
          onMouseLeave={(evt) => this.handleHoverOut(evt)}
        > wat </button>
        </>  
      }
      </div>
      </>
    )
  }
}

export default DynamicList;