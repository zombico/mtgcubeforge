import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faSyncAlt, faUndo } from '@fortawesome/free-solid-svg-icons'
import ScryfallLogo from './buttons/ScryfallLogo'

class DynamicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingToolTip: false,
      showFront: true,
      rotated: false
    }
    this.handleHoverIn = this.handleHoverIn.bind(this)
    this.handleHoverOut = this.handleHoverOut.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.flipCard = this.flipCard.bind(this)
    this.rotateCard = this.rotateCard.bind(this)
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

  removeCard = async () => {
    const remove = {}
    remove.id = this.props.id
    try {
      await axios.patch(`/cubes/${this.props.cubeId}/remove`, remove)
      this.props.loadCube()
    } catch (e){
      console.log(e)
    }
  }
  handleHoverIn(evt) {
    this.setState({ showingToolTip: true })
  }
  handleHoverOut(evt) {
    this.setState({ showingToolTip: false })
  }
  render() {
    const showingToolTip = this.state.showingToolTip
    const hasControls = this.props.hasControls
    const showFront = this.state.showFront
    const hasBack = this.props.imgmdFlip
    const aftermath = this.props.aftermath
    const rotated = this.state.rotated
    const split = this.props.layout === 'split'


    return (
      <>
      <div className="dynamiccard">
        <img className={showingToolTip ? "mixedspread-view__img2-hovered" :"mixedspread-view__img2" }
          src={this.props.src} name={this.props.name} 
          onMouseEnter={(evt) => this.handleHoverIn(evt)}
          onMouseLeave={(evt) => this.handleHoverOut(evt)}
        />
      
        {showingToolTip && 
          <>
          { aftermath ?
            <img className={rotated ? "dynamiccard__tooltip aftermath" : "dynamiccard__tooltip" }
            src={showFront ? this.props.tooltip : this.props.imgmdFlip} 
            name={this.props.name}
            id={this.props.id} 
            onMouseEnter={(evt) => this.handleHoverIn(evt)}
            onMouseLeave={(evt) => this.handleHoverOut(evt)}
            />
            : 
            <img className={rotated ? "dynamiccard__tooltip rotated" : "dynamiccard__tooltip" }
            src={showFront ? this.props.tooltip : this.props.imgmdFlip} 
            name={this.props.name}
            id={this.props.id} 
            onMouseEnter={(evt) => this.handleHoverIn(evt)}
            onMouseLeave={(evt) => this.handleHoverOut(evt)}
            />
          }
          
          
            <div className="dynamiccard__buttonpanel"
              onMouseEnter={(evt) => this.handleHoverIn(evt)}
              onMouseLeave={(evt) => this.handleHoverOut(evt)}
            >
            { hasControls && 
              <FontAwesomeIcon icon={faTrashAlt} 
              className="icon icon-panel"
              onClick={() => this.removeCard()}            
              />
            }           
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
          </div>
          
          </>  
        }
      </div>
      </>
    )
  }
}

export default DynamicCard;