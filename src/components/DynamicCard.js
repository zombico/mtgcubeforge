import React, { Component } from 'react';
import axios from "axios";

class DynamicCard extends Component {
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
      <img className="mixedspread-view__img" 
        src={this.props.src} alt={this.props.name} 
        onMouseEnter={(evt) => this.handleHoverIn(evt)}
        onMouseLeave={(evt) => this.handleHoverOut(evt)}
        />
      {showingToolTip && 
        <>
        <img className="tooltipzoom" 
        src={this.props.tooltip} 
        alt={this.props.name} 
        onMouseEnter={(evt) => this.handleHoverIn(evt)}
        onMouseLeave={(evt) => this.handleHoverOut(evt)}
        />
        <button className="btn-overlay" 
          onClick={() => this.removeCard(this.props.id)}
          onMouseEnter={(evt) => this.handleHoverIn(evt)}
          onMouseLeave={(evt) => this.handleHoverOut(evt)}
        > wat </button>
        </>  
      }
      </>
    )
  }
}

export default DynamicCard;