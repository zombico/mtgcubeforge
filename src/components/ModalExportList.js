import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCopy } from '@fortawesome/free-solid-svg-icons'

class ModalExportList extends Component {
  state = {
    showModal: false,
    copied: false
  }
  
  toggleModal = () => {    
    if(this.state.showModal === false) {
      this.setState({ showModal: true })
    } else 
      this.setState({ showModal: false })
      // this.props.loadCube()
  }


  render() {    
    const cards = this.props.contents.map(e => <div className="exportList-cardItem">{e.name}</div>)
    const list = this.props.contents.map(e => `${e.name}\n`).join('')
    // console.log(cards)
    if(this.state.showModal === true ){        
    return (
      <div className="modal__overlay">
        <div className="modal__newcube listView"> 
          <FontAwesomeIcon icon={faTimes} 
          onClick={this.toggleModal }
          className="modal__newcube-closeicon"
          />         
          
          <div className="samplehand-container">
            <div className="exportList">
              <div className="exportList-cards">{cards}</div>
            </div>
          </div>
          <div className="dashboard__panel pushtop30">
          <CopyToClipboard text={list}
          onCopy={() => this.setState({copied: true})}>
          <button  className="buttonsecondary">Copy to clipboard <FontAwesomeIcon icon={faCopy}/> </button>
        </CopyToClipboard>


          <button className="buttontransparent" onClick={this.toggleModal} >Return to cube</button>

          </div>
        </div>
      </div>
    )} else if(this.state.showModal === false ){   
      return (
        <button onClick={this.toggleModal} className="buttontransparent primarysmaller">
          Export list
        </button>
        )
      }
  }
} 

export default ModalExportList
