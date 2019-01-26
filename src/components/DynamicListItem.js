import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faSyncAlt, faUndo, faTimes } from '@fortawesome/free-solid-svg-icons'
import ScryfallLogo from './buttons/ScryfallLogo'

class DynamicListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingToolTip: false,
      pinned: false,
      showFront: true
    }
    this.handleHoverIn = this.handleHoverIn.bind(this)
    this.handleHoverOut = this.handleHoverOut.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.pinCard = this.pinCard.bind(this)
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
    
    
    return (
      <div >
      <div 
        className="dynamiclistitem__entry"
        onClick={this.pinCard}
        onMouseEnter={hoverEnabled ? (evt) => this.handleHoverIn(evt) : () => {} }
        onMouseLeave={hoverEnabled ? (evt) => this.handleHoverOut(evt) : () => {} }
        >{this.props.name} { hasBack && "// "+ this.props.nameFlip} { split && "// "+ this.props.nameFlip}
      </div>
      {showingToolTip && 
          <>
          { aftermath ?
            <img className={rotated ? "dynamiccard__tooltip onlist listaftermath" : "dynamiccard__tooltip onlist" }
            src={showFront ? this.props.tooltip : this.props.imgmdFlip} 
            name={this.props.name}
            id={this.props.id} 
            // onMouseEnter={(evt) => this.handleHoverIn(evt)}
            // onMouseLeave={(evt) => this.handleHoverOut(evt)}
            onClick={() => this.pinCard()}
            />
            : 
            <img className={rotated ? "dynamiccard__tooltip onlist listrotated" : "dynamiccard__tooltip onlist" }
            src={showFront ? this.props.tooltip : this.props.imgmdFlip} 
            name={this.props.name}
            id={this.props.id} 
            // onMouseEnter={(evt) => this.handleHoverIn(evt)}
            // onMouseLeave={(evt) => this.handleHoverOut(evt)}            
            onClick={() => this.pinCard()}
            />
          }
          
          
            <div className="dynamiccard__buttonpanel onlist">
            
             <FontAwesomeIcon icon={faTimes}
                className={!pinned ? "icon icon-panel " : "icon icon-panel  "}
                onClick={() => this.pinCard()}
              />     
            
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
            <ScryfallLogo id={this.props.id}/>
            { hasControls && 
              <FontAwesomeIcon icon={faTrashAlt} 
              className="icon icon-panel"
              onClick={() => this.removeCard()}            
              />
            }     
          </div>
          
          </>  
        }
        

      
      </div>
    )
  }
}

export default DynamicListItem;