import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import flavorTexts from './operations/flavorTexts'

class ListLoadAnimation extends Component {
  state={
    finishedLoading: false,
  }

  waitingToFinish = () => {
    const length = this.props.length
    const lengthvar = length * 50
    
    setTimeout(() =>
      this.setState({ finishedLoading: true})
    , lengthvar)
  }

  componentDidMount() {
    this.waitingToFinish()
  }


  render() {
    const finishedLoading = this.state.finishedLoading
    const futureButtons = (
      <div className="modal__buttonpanel">        
        <button className="buttonsecondary" onClick={this.props.reset}>Add more cards</button>
        <button className="buttonsecondary transparent" onClick={this.props.close}>Return to cube</button>
      </div>
    )
    const closer = (
      <div className="modal__buttonpanel">        
        <button className="buttonsecondary transparent" onClick={this.props.close}>Return to cube</button>
      </div>
    )  
    return (
      <>
        { !finishedLoading ? 
          <>
          <div className="modal__newcube-title">Cube is updating...</div> 
          <div className="modal__newcube-statusicon ">
            <FontAwesomeIcon icon={faSpinner} className="loading-spinner" />
          </div>
          <div className="modal__newcube-subtitle centerizer">{flavorTexts[0]}</div>           
          </>
          :
          <>
          <div className="modal__newcube-title">Cards have been added to the cube!</div>
          <div className="modal__newcube-statusicon">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          </>
        }
        {finishedLoading && this.props.type === "massupload" && futureButtons}
        {finishedLoading && this.props.type === "refresher" && closer}        
      </>
    )
  }
}
export default ListLoadAnimation