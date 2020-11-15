import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GetEbayUrl from './operations/GetEbayUrl'
import { faTrashAlt, faSyncAlt, faUndo, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import ScryfallLogo from './buttons/ScryfallLogo'
import ModalReassignIcon from './ModalReassignIcon'

class DynamicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingToolTip: false,
      showFront: true,
      rotated: false,
      pinned: false
    }
    this.handleHoverIn = this.handleHoverIn.bind(this)
    this.handleHoverOut = this.handleHoverOut.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.flipCard = this.flipCard.bind(this)
    this.rotateCard = this.rotateCard.bind(this)
    this.pinCard = this.pinCard.bind(this)
    this.unPin = this.unPin.bind(this)
  }

  flipCard = () => {
    if(this.state.showFront) {
      this.setState({ showFront: false })
    } else this.setState({ showFront: true })
  }
  rotateCard = () => {
    if(this.state.rotated) {
      this.setState({ rotated: false })
    } else this.setState({ rotated: true })  
  }

  pinCard = () => {
    if(this.state.pinned) {
      this.setState({ pinned: false, showingToolTip: false })
    } else this.setState({ pinned: true, showingToolTip: true  })  
  }

  unPin = () => {
    this.setState({ pinned: false })
  }
  removeCard = async () => {
    const remove = {}
    remove.id = this.props.id
    try {
      await axios.patch(`/cubes/${this.props.cubeId}/remove`, remove)
      this.pinCard()
      this.props.loadCube()
    } catch (e){
      console.log(e)
    }
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
    const hasControls = this.props.hasControls
    const showFront = this.state.showFront
    const hasBack = this.props.imgmdFlip
    const aftermath = this.props.aftermath
    const rotated = this.state.rotated
    const split = this.props.layout === 'split'
    const pinned = this.state.pinned
    const hoverEnabled = this.props.hoverEnabled
    const packView = this.props.packView
    const hidePanel = this.props.hidePanel
    const ebayLink = GetEbayUrl(this.props.name)
    return (
      <>
      <div className={!packView ? "dynamiccard" : "dynamiccard packview"}>
      
       { !packView  ?
          <img className={showingToolTip ? "mixedspread-view__img2 hovered" :"mixedspread-view__img2" }
          src={this.props.src} name={this.props.name} 
          onMouseEnter={hoverEnabled ? (evt) => this.handleHoverIn(evt) : () => {} }
          onMouseLeave={hoverEnabled ? (evt) => this.handleHoverOut(evt) : () => {} }
          onClick={() => this.pinCard()}
          /> :
          <img className={showingToolTip ? "mixedspread-view__imgPack hovered" :"mixedspread-view__imgPack" }
          src={this.props.src} name={this.props.name} 
          onMouseEnter={hoverEnabled ? (evt) => this.handleHoverIn(evt) : () => {} }
          onMouseLeave={hoverEnabled ? (evt) => this.handleHoverOut(evt) : () => {} }
          onClick={() => this.pinCard()}
          />
        }
        
      
        {showingToolTip &&
          <>
          { aftermath ?
            <img className={rotated ? "dynamiccard__tooltip aftermath" : "dynamiccard__tooltip" }
            src={showFront ? this.props.tooltip : this.props.imgmdFlip} 
            name={this.props.name}
            id={this.props.id} 
            onMouseEnter={(evt) => this.handleHoverIn(evt)}
            onMouseLeave={(evt) => this.handleHoverOut(evt)}
            onClick={() => this.pinCard()}
            />
            : 
            <img className={rotated ? "dynamiccard__tooltip rotated" : "dynamiccard__tooltip" }
            src={showFront ? this.props.tooltip : this.props.imgmdFlip} 
            name={this.props.name}
            id={this.props.id} 
            onMouseEnter={(evt) => this.handleHoverIn(evt)}
            onMouseLeave={(evt) => this.handleHoverOut(evt)}            
            onClick={() => this.pinCard()}
            />
          }
          
          { !hidePanel  &&
            <div className="dynamiccard__buttonpanel">
            
             {/* <FontAwesomeIcon icon={faTimes}
                className={!pinned ? "icon icon-panel " : "icon icon-panel  "}
                onClick={() => this.pinCard()}
              />      */}
            
            { hasBack &&  
              <FontAwesomeIcon icon={faSyncAlt}
                className="icon icon-panel"
                onClick={() => this.flipCard()}
              />
            }
            { split &&  
              <FontAwesomeIcon icon={faUndo}
                className="icon icon-panel mirror"
                onClick={() => this.rotateCard()}
              />
            }
            <ModalReassignIcon 
              oracleid={this.props.oracleid}
              id={this.props.id}
              cubeid={this.props.cubeId}
              onClick={() => this.pinCard()}
              cmc={this.props.cmc}
              colors={this.props.colors}
              removeCard={() => this.removeCard()}
              loadCube={this.props.loadCube}
              hasControls={this.props.hasControls}
            />    
            <ScryfallLogo id={this.props.id}/>
            <a href={ebayLink} target="_blank">
              <FontAwesomeIcon icon={faShoppingCart}
                className="icon icon-panel"
                onClick={() => this.pinCard()}
              />   
            </a>
            { hasControls && 
              <FontAwesomeIcon icon={faTrashAlt} 
              className="icon icon-panel"
              onClick={() => this.removeCard()}            
              />
            }     
          </div>
          }
          
          </>  
        }
        <div style={{ position: 'absolute', opacity: '0'}}>{this.props.name}</div>
      </div>
      </>
    )
  }
}

export default DynamicCard;