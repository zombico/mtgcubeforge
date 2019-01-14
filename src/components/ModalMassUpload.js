import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import Forge from './ForgeCardObject';
import axios from 'axios'
import ToolTip from './ToolTip';

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

  makeArray(string, e) {
    e.preventDefault()
    // console.log(string)
    const array = string.split(/\n/) 
    console.log(array)
    this.setState({ searchTerm: array })    

    array.forEach(element => {
      element.length > 0 && this.getCard(element)      
    })
    this.props.loadCube()
  } 



  async getCard(card) {
    fetch(`https://api.scryfall.com/cards/named?exact=${card}`, {
    })
    .then(res => res.json())
    .then(result => {  
      this.setState({
        tempCard: result        
      }) 
      const newCard = Forge(this.state.tempCard)
        this.setState({
        stateReqstCard: newCard,
      })  
      const layout = this.state.tempCard.layout;
    if (layout === "emblem" || layout === "vanguard" || layout === "planar" ) {
      return console.log('error')
    } else try {
       axios.patch(`cubes/${this.props.cubeId}/add`, this.state.stateReqstCard)
      
      
    } catch(e) {
      console.log(e)
    }
    })
    .then(await this.props.loadCube())   
    .catch(error => console.error('Error', error))    
  }

  // getCard2 = async (card) => {
  //   try {
  //     await axios.get(`https://api.scryfall.com/cards/named?exact=${card}`)
  //   } catch(e) {
  //     console.log(e)
  //   }
    
  // }

  // addCard = async () => {
  //   const layout = this.state.tempCard.layout;
    // if (layout === "emblem" || layout === "vanguard" || layout === "planar" ) {
    //   return console.log('error')
  //   } else try {
  //     await axios.patch(`cubes/${this.props.cubeId}/add`, this.state.stateReqstCard)
  //     // this.props.loadCube()
      
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }

  render() {    
      return (
        <div className="modal__overlay">
          <div className="modal__newcube massupload"> 
           <FontAwesomeIcon icon={faTimes} 
            onClick={this.props.close}
            className="modal__newcube-closeicon"
           />         

              <form onSubmit={(e) => this.makeArray(this.state.cubecontents, e)}>                      
                <label htmlFor="new-cube-button" className="modal__newcube-title">
                  Paste card list 
                  <ToolTip
                  className="banana"
                    icon={<FontAwesomeIcon icon={faQuestionCircle} />}
                    text="Do not separate card names with commas."
                  />
                </label>
                <div>Card names must be separated by a new line </div>
                <textarea
                  type="text"
                  onChange={this.handleChange}
                  name="cubecontents"
                  id="massupload"
                  placeholder="E.g.: &#10;Ponder&#10;Lightning Helix&#10;Verdant Catacombs&#10;Mirror Entity"
                  className="modal__newcube-input fullwidth" 
                  autoComplete="off"
                />
          
                <div className="modal__buttonpanel">
                  <input className="buttonsecondary" type="submit" value="Upload List" />            
                </div>
              </form>
              
          </div>
        </div>
      )}
} 

export default ModalMassUpload;