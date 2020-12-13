import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCog, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Forge from './ForgeCardObject';
import FrameEffectParser from './operations/FrameEffectParser'
import DisplayPrices from './DisplayPrices';
import GetEbayUrl from './operations/GetEbayUrl';
import GetTcgUrl from './operations/GetTcgUrl'
// import ToolTip from './ToolTip'

class ModalReassignIcon extends Component {
  state = {
    showModal: false,
    colors: [],
    cmc: '',
    isFoil: false,
    showAllLangs: false,
    versions: [],
    stateReqstCard: ''
  }

  toggleModal = () => {    
    if(this.state.showModal === false) {
      this.setState({ showModal: true })
    } else 
      this.setState({ showModal: false })
      this.props.loadCube()
  }
  
  parseColors(colors) {
    if(colors.length === 1) {
      return colors[0]
    }
    else if(colors.length > 1) {
      const mycolors = colors.toString()
      return mycolors
    }
    else if (colors.length === 0) {
      return ''
    }
  }


  componentDidMount() {
    this.getVersions(this.props.oracleid)
    this.getCard(this.props.id)
    const mycolors = this.parseColors(this.props.colors)
  
    this.setState({
      colors: mycolors,
      cmc: this.props.cmc
    })
  }

  handleColorChange(event) {
    event.preventDefault()
    this.setState({ colors: event.target.value });
  }

  handleCmcChange(event) {
    event.preventDefault()
    this.setState({ cmc: event.target.value });
  }

  toggleLangs() {
    if (!this.state.showAllLangs) {
      this.setState({ showAllLangs: true })  
    } else this.setState({ showAllLangs: false })
  }

  toggleFoil() {
    const isFoil = this.state.isFoil
    const card = this.state.stateReqstCard
    card.isFoil = !isFoil 
    if (isFoil) {
     this.setState({ isFoil: false, stateReqstCard: card }) 
    } else this.setState({ isFoil: true, stateReqstCard: card})
  }

  getCard(id) {
    fetch(`https://api.scryfall.com/cards/${id}`, {
    })
    .then(res => res.json())
    .then(result => {        
      const newCard = result.id && Forge(result)      
      this.setState({ stateReqstCard: newCard })  
    }
  )}

  getVersions(oracleId) {
    fetch(`https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${oracleId}&unique=prints&include_multilingual=true`, {
    })
    .then(res => res.json())
    .then(result => {
      const valid = result.data.filter(e => e.digital === false)   
      this.setState({ versions: valid }) 
    }).catch(error => console.error('Error', error))
  }

  changeVersion = (version) => {
    if (version.layout !== "emblem" && version.layout !== "vanguard" && version.layout !== "planar") {
     const newVersion = Forge(version)
     this.setState({
       stateReqstCard: newVersion,
       
     })    
    }        
  }

  addCard = async () => {
    const modifiedCard = await this.state.stateReqstCard
    modifiedCard.cmc = this.state.cmc
    modifiedCard.colors = this.state.colors !== "" ? this.state.colors.split(",") : []
    await this.props.removeCard()
    this.props.loadCube()

    const layout = this.state.stateReqstCard.layout
      if (layout === "emblem" || layout === "vanguard" || layout === "planar" ) {
        return console.log('error')
      } else try {
        await this.state.stateReqstCard && axios.patch(`/cubes/${this.props.cubeid}/add`, modifiedCard)
        this.props.loadCube()
        
      } catch(e) {
        console.log(e)
      }
  }

  render(){
    const { versions, cmc, colors, showAllLangs, stateReqstCard, isFoil } = this.state
    const id = stateReqstCard.id
    const match = versions && versions.length > 0 && versions.filter(e => e.id === id)
    const prices = match && match[0] && match[0].prices
    const priceArray = prices && Object.entries(prices) || []
    const ebayString = `${stateReqstCard.name} ${stateReqstCard.set} ${isFoil  ? 'foil' : ''}`
    const ebayLink = GetEbayUrl(ebayString)
    const tcgLink = GetTcgUrl(ebayString)
    const hasFoilEdition = versions.filter(e => e.id === stateReqstCard.id) && versions.filter(e => e.id === stateReqstCard.id)[0] && versions.filter(e => e.id === stateReqstCard.id)[0].foil && versions.filter(e => e.id === stateReqstCard.id)[0].nonfoil
    const frameEffect = versions.filter(e => e.id === stateReqstCard.id) && versions.filter(e => e.id === stateReqstCard.id)[0] && versions.filter(e => e.id === stateReqstCard.id)[0].frame_effects  
    console.log(frameEffect)
    if(this.state.showModal === true ){   
    return (
      <div>
        <FontAwesomeIcon 
          className="icon icon-panel"
          icon={faCog}
        />
        <div className="modal__overlay">
          <div className="modal__newcube stats"> 
            <FontAwesomeIcon icon={faTimes} 
              onClick={() => this.toggleModal()}
              className="modal__newcube-closeicon"
            />         
            
          <div className="versionchanger-modal-contents">
            <div className="versionchanger-preview">
              <div className={isFoil ? "foil-gradient modalReassign" : ""}>
                <img className="preview-img-med" src={this.state.stateReqstCard.imgmd} />  
              </div>
              <div>{DisplayPrices(priceArray)}</div>
              <div style={{padding: '10px 0', display: 'flex'}}>
                <a href={ebayLink} target="_blank" className="addtocube inoverlay changeEdition"> Shop ebay <FontAwesomeIcon icon={faShoppingCart} /> </a>
                <a href={tcgLink} target="_blank" className="addtocube inoverlay changeEdition"> TCG Player <FontAwesomeIcon icon={faShoppingCart} /> </a>
              </div>
            </div>
            <div className="versionchanger-box" style={{flexGrow: 1}}>
              <div className="versionchanger-label">Available versions</div>
              <div className="versionchanger">
              
              { versions && showAllLangs && versions.map((version) =>               
                <div
                  key={version.id} 
                  onClick={() => this.changeVersion(version)} 
                  className={stateReqstCard.id === version.id ? 'container active' : 'container idle' }
                >{version.set_name} - {version.lang.toUpperCase()}</div>                           
              )}

              { versions && !showAllLangs && versions.filter(e=> e.lang === 'en').map((version) =>               
                <div
                  key={version.id} 
                  onClick={() => this.changeVersion(version)} 
                  className={stateReqstCard.id === version.id ? 'container active' : 'container idle' }
                >{version.set_name} - {version.lang.toUpperCase()}</div>                           
              )}
              
              </div>
              {
              this.props.hasControls &&
            <>
            <form>
            <div>
              <div className="modal__reassign__options">
                <label>Show printings in all languages</label>
                <input type="checkbox" 
                  value={this.state.showAllLangs}
                  onChange={() => this.toggleLangs()}
                />
              </div>  
              <div className="modal__reassign-option">
                <label className="modal__reassign-label">Reassign to color section</label>
                <select value={colors} onChange={(event)=>this.handleColorChange(event)}>
                  <option value="U">Blue</option>
                  <option value="B">Black</option>
                  <option value="W">White</option>
                  <option value="R">Red</option>
                  <option value="G">Green</option>
                  <option value="">Colorless</option>
                  <option value={`U,W`}>Azorius</option>
                  <option value={`R,W`}>Boros</option>
                  <option value={`B,U`}>Dimir</option>
                  <option value={`B,G`}>Golgari</option>
                  <option value={`G,R`}>Gruul</option>
                  <option value={`R,U`}>Izzet</option>
                  <option value={`B,W`}>Orzhov</option>
                  <option value={`B,R`}>Rakdos</option>
                  <option value={`G,W`}>Selesnya</option>
                  <option value={`G,U`}>Simic</option>
                  <option value={`B,G,W`}>Abzan</option>
                  <option value={`G,U,W`}>Bant</option>
                  <option value={`B,U,W`}>Esper</option>
                  <option value={`B,R,U`}>Grixis</option>
                  <option value={`R,U,W`}>Jeskai</option>
                  <option value={`B,G,R`}>Jund</option>
                  <option value={`B,R,W`}>Mardu</option>
                  <option value={`G,R,W`}>Naya</option>
                  <option value={`B,G,U`}>Sultai</option>
                  <option value={`G,R,U`}>Temur</option>
                  <option value={`W,B,G,R,U`}>Unaligned</option>
                </select>
              </div>  
              
              <div className="modal__reassign__options">
                <div className="modal__reassign-option">
                  <label className="modal__reassign-label">Change converted mana cost to</label>
                  <input
                    type="number"
                    className="modal__reassign-input"
                    value={cmc}
                    onChange={(event)=>this.handleCmcChange(event)}
                  />
                </div>
                {hasFoilEdition && <div className="modal__reassign__options">
                  <label>Is foil</label>
                  <input type="checkbox" 
                    value={this.state.isFoil}
                    onChange={() => this.toggleFoil()}
                  />
                </div>
                }
                
              </div>    
            </div>
            </form>

            
            </>
            }
            </div>
              
            
          </div>      
          {
              this.props.hasControls &&
          <div style={{textAlign: 'right'}}>
            <button className="buttontransparent" onClick={this.props.removeCard} >Delete card</button>
            <button className="buttonprimary" onClick={this.addCard} style={{marginLeft: 15}}>Modify card</button>
          </div>
          }
          </div>
        </div>
      </div>
      )
    }
    else if(this.state.showModal === false ){   
      return (
        <div>
          <FontAwesomeIcon 
          className="icon icon-panel" 
          icon={faCog}
          onClick={this.toggleModal}
        />
        </div>
        )
      }
      
  }
}

  export default ModalReassignIcon