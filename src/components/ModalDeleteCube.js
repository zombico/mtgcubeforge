import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import killFlavorText from './operations/killingFlavorTexts'


class ModalDeleteCube extends Component {
  
  render() {    
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
    }
    shuffleArray(killFlavorText)
      return (
        <div className="modal__overlay">
          <div className="modal__newcube"> 
           <FontAwesomeIcon icon={faTimes} 
            onClick={(e) => this.props.toggle(e, this.props.cubeid )}
            className="modal__newcube-closeicon"
           />
           <h2>Are you sure you want to delete {this.props.cubename}? </h2>           
           <br />
           <div className="flavortext">{killFlavorText[0]}</div>
           
            <div className="modal__buttonpanel">
              <button className="buttonsecondary" onClick={this.props.delete}>
                Delete Cube
              </button>            
            </div>
          </div>
        </div>
      )}
} 

export default ModalDeleteCube;