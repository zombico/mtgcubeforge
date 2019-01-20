import React, { Component } from 'react';


class StatusLight extends Component {    
  
  render() {
    // if (this.props.light === "edit") {
    //   return (      
    //     <div className="statuslight edit">
          // <div className="statuslight-light edit" />
          // {this.props.text}
    //     </div>              
    //   )
    // }
    return (
      <div className={`statuslight ${this.props.light}`}>
        <div className={`statuslight-light ${this.props.light}`} />
            {this.props.text}
      </div>
    )    
  }
}

export default StatusLight;