import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import Forge from './ForgeCardObject';
import axios from 'axios'
import ToolTip from './ToolTip';
import ListLoadAnimation from './ListLoadAnimation'

class ModalMassUpload extends Component {
  state = {
    cubename: null,
    isSubmitted: false,
    cubeId: '',
    cubecontents: '',
    format: '',
    searchTerm: '',
    tempCard: ''
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  async makeArray(string, e) {
    e.preventDefault()    
    const array = string.split(/\n/) 
    console.log(array)
    this.setState({ searchTerm: array })

    await array.forEach(element => {
      element.length > 0 && setTimeout(this.getCard(element), 300)
    })
    this.setState({ isSubmitted: true })    
  } 

  reset = () => {
    this.setState({ cubecontents: '', isSubmitted: false })
  }

  getCard(card) {
    fetch(`https://api.scryfall.com/cards/named?exact=${card}`, {
    })
    .then(res => res.json())
    .then(result => {        
      const newCard = result.id && Forge(result)      
      this.setState({ stateReqstCard: newCard })  
      const layout = this.state.stateReqstCard.layout
      if (layout === "emblem" || layout === "vanguard" || layout === "planar" ) {
        return console.log('error')
      } else try {
        this.state.stateReqstCard && axios.patch(`cubes/${this.props.cubeId}/add`, this.state.stateReqstCard)            
      } catch(e) {
        console.log(e)
      }
    })

    .catch(error => console.error('Error', error))    
  }

  componentDidMount() {
    document.getElementById("massupload").focus()
  }

  render() {    
    const submitted = this.state.isSubmitted
      return (
        <div className="modal__overlay">
          <div className="modal__newcube massupload"> 
           
          { !submitted &&
              <form onSubmit={(e) => this.makeArray(this.state.cubecontents, e)}>                      
                <label htmlFor="new-cube-button" className="modal__newcube-title icon">
                  Paste card list 
                  <ToolTip
                  className="banana"
                    icon={<FontAwesomeIcon icon={faQuestionCircle} />}
                    text="Add as many cards as you need - even your entire list. Cards with more than one side only need one name for entry."
                  />
                </label>
                <div>Each name must be separated by a new line</div>
                <textarea
                  type="text"
                  onChange={this.handleChange}
                  name="cubecontents"
                  id="massupload"
                  placeholder="E.g.&#10;Ponder&#10;Lightning Helix&#10;Verdant Catacombs&#10;Mirror Entity"
                  className="modal__newcube-input fullwidth" 
                  autoComplete="off"
                />
          
                <div className="modal__buttonpanel">
                  <input className="buttonsecondary" type="submit" value="Upload List" />   
                  <input className="buttonsecondary transparent" type="button" value="Return to Cube" onClick={this.props.close} />            
                </div>
              </form>
          }
          { submitted &&               
              <ListLoadAnimation 
                close={this.props.close} 
                length={this.state.searchTerm.length}
                reset={this.reset}
              />
          }
          </div>
        </div>
      )}
} 

export default ModalMassUpload;