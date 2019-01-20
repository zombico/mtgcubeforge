import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// import SamplePackCard from './SamplePackCard';
import DynamicCard from './DynamicCard'

class ModalSampleHand extends Component {
  state = {
    // cubeContents: null,
    // isSubmitted: false,
    // cubeId: ''    
    sampleHand: []
  }
  

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getSampleHand() {
    const sampleHand = []
    for (let i = 0; i < 15; i++) {
      sampleHand.push(this.props.cubeContents[i])
    }
    this.setState({ sampleHand })
  }

  componentWillMount() {
    this.shuffleArray(this.props.cubeContents)
    this.getSampleHand()
  }

  reload() {
    this.shuffleArray(this.props.cubeContents)
    this.getSampleHand()
  }

  render() {    
    console.log(this.props)
    const sampleHand = this.state.sampleHand
    const view = sampleHand.map((card => 
      
      // <img className="samplehand-img" src={card.imgsm} />
      // <SamplePackCard card={card} />
      <DynamicCard card={card} 
      packView={true}
      name={card.name} 
      nameFlip={card.nameFlip}
      src={card.imgsm}
      imgsmFlip={card.imgsmFlip} 
      tooltip={card.imgmd} 
      imgmdFlip={card.imgmdFlip}
      colors={card.colors}
      type={card.type}
      id={card.id} 
      oracleid={card.oracleid}
      cmc={card.cmc}
      manacost={card.manacost}
      layout={card.layout}
      aftermath={card.aftermath}
      // loadCube={() => props.loadCube()}
      // hasControls={props.hasControls}
            />
      
      ))
      return (
        <div className="modal__overlay">
          <div className="modal__newcube samplehand"> 
           <FontAwesomeIcon icon={faTimes} 
            onClick={this.props.close }
            className="modal__newcube-closeicon"
           />         
            
            <div className="samplehand-container">
              {view}
            </div>
            <div className="dashboard__panel pushtop30">
            <button className="buttonprimary" onClick={() => this.reload()}>
              New sample pack
            </button>
            <button className="buttontransparent" onClick={this.props.close} >Return to cube</button>
            </div>
          </div>
        </div>
      )}
} 

export default ModalSampleHand;
