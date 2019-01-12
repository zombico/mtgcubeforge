import React, { Component } from 'react';
import ScryfallLogo from './buttons/ScryfallLogo'

class SamplePackCard extends Component {
  state={
    showingToolTip: false
  }
  handleHoverIn(evt) {
    this.setState({ showingToolTip: true })
  }
  handleHoverOut(evt) {
    if(!this.state.pinned) {
      this.setState({ showingToolTip: false })
    }    
  }
  render() {
    const showingToolTip = this.state.showingToolTip
    return (
    <div className="samplehand-element-container">
      <img 
        className="samplehand-img" 
        src={this.props.card.imgsm} 
        onMouseEnter={(evt) => this.handleHoverIn(evt)}
        onMouseLeave={(evt) => this.handleHoverOut(evt)}
      />
      { showingToolTip &&
      <>
        <img className="dynamiccard__tooltip samplehand" src={this.props.card.imgmd} 
        onMouseEnter={(evt) => this.handleHoverIn(evt)}
        onMouseLeave={(evt) => this.handleHoverOut(evt)}
        />
        <div className="dynamiccard__buttonpanel samplehand"
          onMouseEnter={(evt) => this.handleHoverIn(evt)}
          onMouseLeave={(evt) => this.handleHoverOut(evt)}
        > <ScryfallLogo id={this.props.card.id}/> </div>
      </>
      }
    </div>
    )
    
  }
}

export default SamplePackCard;