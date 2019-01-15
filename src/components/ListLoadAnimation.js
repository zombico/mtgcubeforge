import React, { Component } from 'react';

class ListLoadAnimation extends Component {
  state={
    finishedLoading: false,
  }

  waitingToFinish = () => {
    const length = this.props.length
    const lengthvar = length * 300
    
    setTimeout(() =>
      this.setState({ finishedLoading: true})
    , lengthvar)
  }

  componentWillMount() {
    this.waitingToFinish()
  }


  render() {
    const finishedLoading = this.state.finishedLoading
    
    
    const futureButtons = (
      <div>
        <button onClick={this.props.close}>Reload cube</button>
        <button onClick={this.props.reset}>Add more cards</button>
      </div>
    )  
    return (
      <div>Cards are being requested
        {finishedLoading && futureButtons}        
      </div>
    )
  }
}
export default ListLoadAnimation