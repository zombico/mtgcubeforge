import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class DynamicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingToolTip: false
    }
    this.handleHoverIn = this.handleHoverIn.bind(this)
    this.handleHoverOut = this.handleHoverOut.bind(this)
    this.removeCard = this.removeCard.bind(this)
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
    return (
      <>
      <div className="dynamiccard">
        <img className={showingToolTip ? "mixedspread-view__img2-hovered" :"mixedspread-view__img2" }
          src={this.props.src} alt={this.props.name} 
          onMouseEnter={(evt) => this.handleHoverIn(evt)}
          onMouseLeave={(evt) => this.handleHoverOut(evt)}
        />
      
      {showingToolTip && 
        <>
        <img className="dynamiccard__tooltip" 
        src={this.props.tooltip} 
        alt={this.props.name}
        id={this.props.id} 
        onMouseEnter={(evt) => this.handleHoverIn(evt)}
        onMouseLeave={(evt) => this.handleHoverOut(evt)}
        />
        { hasControls &&
          <div className="dynamiccard__buttonpanel"
            onMouseEnter={(evt) => this.handleHoverIn(evt)}
            onMouseLeave={(evt) => this.handleHoverOut(evt)}
          >
           
          <FontAwesomeIcon icon={faTrashAlt} 
            className="icon icon-trash"
            onClick={() => this.removeCard()}
            onMouseEnter={(evt) => this.handleHoverIn(evt)}
            onMouseLeave={(evt) => this.handleHoverOut(evt)}
            />
          
        </div>
        }
        </>  
      }
      </div>
      </>
    )
  }
}

export default DynamicCard;