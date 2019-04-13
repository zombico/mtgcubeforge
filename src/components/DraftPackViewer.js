import React, { Component } from 'react';
import DynamicCard from './DynamicCard'

class DraftPackViewer extends Component {
  

  render() {
  
    return (
      <div className="draft__currentpack">
        {this.props.draftPack.length > 0 && this.props.draftPack.map((card => 
          <div onClick={() => this.props.draftCard(card, this.props.packNumber)}>{card.name}</div>
        ))}
      </div>
    )
  }
}

export default DraftPackViewer