import React, { Component } from 'react';


class StatusLight extends Component {    
  render() {
    return (      
      <div className="statuslight">
        <div className="statuslight-light" />
        {this.props.text}
      </div>              
    )
  }
}

export default StatusLight;