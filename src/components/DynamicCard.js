import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GetEbayUrl from './operations/GetEbayUrl'
import { faTrashAlt, faSyncAlt, faUndo, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import ModalReassignIcon from './ModalReassignIcon'
import ToolTip from './ToolTip';

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
    remove.index = this.props.index
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
        <div 
          onClick={() => this.pinCard()}
          className={this.props.isFoil ? "foil-gradient mixedspreadthumb" : ""}>
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
          </div>
        
      
        {showingToolTip &&
          <>
          <div 
            className={this.props.isFoil ? "foil-gradient mixedspreadcards" : ""}
            onClick={() => this.pinCard()} 
          >
            <img className="dynamiccard__tooltip"
            src={showFront ? this.props.tooltip : this.props.imgmdFlip} 
            name={this.props.name}
            id={this.props.id} 
            onMouseEnter={(evt) => this.handleHoverIn(evt)}
            onMouseLeave={(evt) => this.handleHoverOut(evt)}
            // onClick={() => this.pinCard()}
            />
          </div>
          { !hidePanel && pinned &&
            <div className="dynamiccard__buttonpanel">
            <ModalReassignIcon
              index={this.props.index} 
              oracleid={this.props.oracleid}
              id={this.props.id}
              cubeid={this.props.cubeId}
              onClick={() => this.pinCard()}
              cmc={this.props.cmc}
              colors={this.props.colors}
              removeCard={() => this.removeCard()}
              loadCube={this.props.loadCube}
              hasControls={this.props.hasControls}
              isFoil={this.props.isFoil}
            />    
            { hasBack &&  
              <FontAwesomeIcon icon={faSyncAlt}
                className="icon icon-panel"
                onClick={() => this.flipCard()}
              />
            }
            {/* { split &&  
              <FontAwesomeIcon icon={faUndo}
                className="icon icon-panel mirror"
                onClick={() => this.rotateCard()}
              />
            } */}
            
            <a href={ebayLink} target="_blank">
              <ToolTip 
                text="See eBay listings"
                icon={
                <FontAwesomeIcon icon={faShoppingCart}
                  className="icon icon-panel"
                  onClick={() => this.pinCard()}
                />}
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