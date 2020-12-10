import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GetEbayUrl from './operations/GetEbayUrl'
import { faTrashAlt, faSyncAlt, faUndo, faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import ModalReassignIcon from './ModalReassignIcon'
import ToolTip from './ToolTip';

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

  // getUrl(query) {
  //   console.log(query)
  //   const array = query.split(' ')
  //   const keyed = array.map((e, index) => {
  //     if (index === 0) return `%3D${e}`
  //     else return `%2B${e}`
  //   })
  //   const ebay = keyed.join('')
  //   // console.log(ebay)
  //   const url = `https://rover.ebay.com/rover/1/711-53200-19255-0/1?mpre=https%3A%2F%2Fwww.ebay.com%2Fsch%2Fi.html%3F_from%3DR40%26_trksid%3Dp2380057.m570.l1313%26_nkw${ebay}%26_sacat%3D0&campid=5338460844&toolid=10001&customid=`
  //   return url
  // }
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
    
    const ebayLink = GetEbayUrl(this.props.name)
    
    return (
      <>
      <div 
        className={pinned ? "dynamiclistitem__entry dynamiclistitem__entry-pinned" :"dynamiclistitem__entry"}
        onClick={this.pinCard}
        onMouseEnter={hoverEnabled ? (evt) => this.handleHoverIn(evt) : () => {} }
        onMouseLeave={hoverEnabled ? (evt) => this.handleHoverOut(evt) : () => {} }
        >{this.props.name} { hasBack && "// "+ this.props.nameFlip} { split && "// "+ this.props.nameFlip}
      </div>
      {showingToolTip && 
          <div>
            <div
              onClick={() => this.pinCard()} 
              className={this.props.isFoil ? "foil-gradient mixedspreadlist" : ""}>
              <img 
                className="dynamiccard__tooltip onlist"
                src={showFront ? this.props.tooltip : this.props.imgmdFlip} 
                name={this.props.name}
                id={this.props.id} 
                
              />
            </div>
          
          
          
          
           { pinned && <div className="dynamiccard__buttonpanel onlist">
            
               
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
              icon={<FontAwesomeIcon 
                icon={faShoppingCart}
                className="icon icon-panel"
                onClick={() => this.pinCard()}
              />}
            />   
            </a>
            { hasControls && 
              <>
              
              <FontAwesomeIcon icon={faTrashAlt} 
              className="icon icon-panel"
              onClick={() => this.removeCard()}            
              />
              </>
            }
             
          </div>
      }
          
          </div>  
        }
        

      
      </>
    )
  }
}

export default DynamicListItem;