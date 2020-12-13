import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSyncAlt, faUndo, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Forge from './ForgeCardObject';
import BuildControls from './BuildControls';
import ToolTip from './ToolTip';
import FrameEffectParser from './operations/FrameEffectParser'
import GetEbayUrl from './operations/GetEbayUrl';
import GetTcgUrl from './operations/GetTcgUrl'
import DisplayPrices from './DisplayPrices';
import axios from "axios";

class SearchCard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cubeId: props.cubeId,
      searchTerm: '',
      tempCard: '',
      stateReqstCard: '',
      autoQueryIn: '',
      autoQueryOut: '',
      currentSearchRank: -1,
      versions: [],
      currentVersion: '',
      versionChangerActive: false,
      isFoil: false,
      showFront: true,
      rotated: false
    }
    this.focusCard = this.focusCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCard = this.getCard.bind(this);
    this.getVersions = this.getVersions.bind(this);
    this.toggleVersionChanger = this.toggleVersionChanger.bind(this);
    this.changeVersion = this.changeVersion.bind(this);
    this.addCard = this.addCard.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
    this.checkIfOne = this.checkIfOne.bind(this);
    this.handleListSelect = this.handleListSelect.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.newcardShortcut = this.newcardShortcut.bind(this);
    this.moveKey = this.moveKey.bind(this);
    this.firstSearch = this.firstSearch.bind(this);
    this.firstResult = React.createRef();    
    this.flipCard = this.flipCard.bind(this)
    this.rotateCard = this.rotateCard.bind(this)
    this.toggleFoil = this.toggleFoil.bind(this)
  }

  
  // Component flow
  //  search is typed on input. autoComplete(term) runs on event change, and chains methods to clean up results
  //  when there is only one card in autoComplete results, the getCard(card) method is called and saves the result object to state.tempCard
  //  if user decides to add the card, on submit, Forge() is called to  take relevant lines, and is assigned to stateReqstCard


  autoComplete(term) {  
    fetch(`https://api.scryfall.com/cards/autocomplete/?q=${term}`, {
    })
    .then(res => res.json())
    .then(result => {
      // console.log(result)
      this.setState({
        autoQueryIn: result.data
      })
    }).then(() => {
      const cardy = this.state.autoQueryIn;
      if (cardy !== "" ) {
        this.checkIfOne(cardy, term)
        const termLength = term.length > 2 ? term.length : 0;
        const searchArrayOnly = cardy.map((cardName) => {
          const checker = cardName.substring(0, termLength)
          // console.log(checker)
          if (checker.toLowerCase() === term.toLowerCase()) {
            return cardName        
          }
          else if (cardName.includes("//") && cardName.charAt(0) === term.charAt(0)) { 
            return cardName 
          }
          else if (cardName.includes(",") && cardName.charAt(1) === term.charAt(1)) {
            return cardName
          }
          else if (cardName.charAt(1) === term.charAt(1) && cardName.charAt(0) === term.charAt(0)) {
            return cardName
          }
          else return "butts"
        })
        const cleanArray = searchArrayOnly.filter(name => name !== "butts").sort()
        this.setState({ autoQueryOut: cleanArray })
        if (cleanArray.length === 1) {
          this.getCard(cleanArray[0]);        
        }
      }  
    })
    
    
  }

  getCard(card) {
    const sanitizedCard = card.replace('&', '')
    fetch(`https://api.scryfall.com/cards/named?exact=${sanitizedCard}`, {
    })
    .then(res => res.json())
    .then(result => { 
      // console.log(result) 
      this.setState({
        tempCard: result        
      }) 
    })
    .then(() => {
      this.focusCard()
    })
    
    .catch(error => console.error('Error', error))
  }

  getVersions(oracleId) {
    fetch(`https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${oracleId}&unique=prints`, {
      })
      .then(res => res.json())
      .then(result => {
        const valid = result.data.filter(e => e.digital === false)  
        this.setState({
          versions: valid        
        }) 
    })
    .catch(error => console.error('Error', error))
  }

  changeVersion = (version) => {

   if (version.layout !== "emblem" && version.layout !== "vanguard" && version.layout !== "planar") {
    const newVersion = Forge(version)
    newVersion.isFoil = this.state.isFoil
    this.setState({
      stateReqstCard: newVersion,
      isFoil: false
    })    
   }
       
  }

  toggleVersionChanger = () => {
    if(this.state.versionChangerActive) {
      this.setState({ versionChangerActive: false})  
    } else this.setState({ versionChangerActive: true})
  }

  focusCard() {
    const reqstCard = Forge(this.state.tempCard);
    this.getVersions(reqstCard.oracleid)
    this.setState({
      stateReqstCard: reqstCard,
      // versionChangerActive: false,
      showFront: true
    })
  }

  handleListSelect(card) {
    this.setState({      
      searchTerm: card
    })
    this.props.hasControls && this.state.stateReqstCard && document.getElementById('addtocube').focus({preventScroll: true})
    this.focusCard()
  }

  checkIfOne(array, searchTerm) {
    array.forEach((result) => {
      let exactoChecker = result.length;  
      if (exactoChecker === searchTerm.length) {
        this.getCard(searchTerm)
      }
    });
  }

  addCard = async () => {
    const layout = this.state.tempCard.layout;
    if (layout === "emblem" || layout === "vanguard" || layout === "planar" ) {
      this.clearSearch()
    } else try {
      await axios.patch(`cubes/${this.state.cubeId}/add`, this.state.stateReqstCard)
      this.props.loadCube()
      this.clearSearch()
    } catch(e) {
      console.log(e)
    }
  }

  clearSearch() {
    
    if(this.state.searchTerm.length > 0) {
      this.setState({ searchTerm: '', stateReqstCard: '', isFoil: false })
      document.getElementById('searchcard').focus()
    }
    
  }

  newcardShortcut = () => {    
    const colors = this.state.stateReqstCard.colors
    const type = this.state.stateReqstCard.type
    if (colors.length > 1) {
      return document.getElementById(`Multicolorsection`).scrollIntoView();
    } else if (type === "Land") {
      return document.getElementById(`Landsection`).scrollIntoView();
    } else if (colors[0] === 'B' && colors.length === 1) {
      return document.getElementById(`Blacksection`).scrollIntoView();
    } else if (colors[0] === 'U' && colors.length === 1) {
      return document.getElementById(`Bluesection`).scrollIntoView();
    } else if (colors[0] === 'R' && colors.length === 1) {
      return document.getElementById(`Redsection`).scrollIntoView();
    } else if (colors[0] === 'W' && colors.length === 1) {
      return document.getElementById(`Whitesection`).scrollIntoView();
    } else if (colors[0] === 'G' && colors.length === 1) {
      return document.getElementById(`Greensection`).scrollIntoView();
    } else if (colors.length === 0 && type !== "Land") {
      return document.getElementById(`Colorlesssection`).scrollIntoView();
    } 

    
  }

  handleAdd(event) {
    event.preventDefault();
    this.focusCard();
    this.addCard();      
    this.props.viewType ==="card" && this.newcardShortcut();
    // this.newcardShortcut()
    // this.clearSearch();
  }

  handleChange(event) {
    const newStroke = event.target.value    
    this.setState({
      searchTerm: newStroke,
      stateReqstCard: '',
    })
    setTimeout(this.autoComplete(newStroke), 300)
  }


  moveKey(e) {
    const cardList = this.state.autoQueryOut;
    const searchOrder = cardList.length + 1
    const searchRank = this.state.currentSearchRank +1
    // console.log(searchOrder, searchRank)
    const onLastResult = searchOrder - searchRank === 1 ? true : false
    const onFirstResult = searchOrder - searchRank === searchOrder ? true : false

    // focus on the correct index when pressing down key
    if (e.key === "ArrowDown" && !onLastResult ) {
      e.preventDefault();
      const newRank = searchRank
      // console.log(newRank)
      this.setState({currentSearchRank: newRank}, () => {
      const searchIndex = this.state.currentSearchRank;
      document.getElementById(`searchresult${searchIndex}`).focus()
      })  
    // stop thing from breaking when getting to last
    } else if (e.key === "ArrowDown" && onLastResult) {
      e.preventDefault();
    }

    // focus on correct index when pressing up key
    else if ( e.key === "ArrowUp" && !onFirstResult ) {
      e.preventDefault();
      const newRank = this.state.currentSearchRank - 1
      this.setState({currentSearchRank: newRank})
      const searchIndex = this.state.currentSearchRank;
      document.getElementById(`searchresult${searchIndex}`).focus() 
    } 
    // Go back to input when you reach top of list
    else if (e.key === "ArrowUp" && onFirstResult) {
      e.preventDefault();
      document.getElementById("searchcard").focus()
      this.setState({currentSearchRank: -1})
    }
    // Stop the component from previewing when hit bottom of list
    else if ( e.key === "ArrowDown" && searchOrder === searchRank) {
      e.preventDefault();
    }
    // Delete first letter of search when pressing delete key on button
    else if ( e.keyCode === 8) {
      e.preventDefault();
      document.getElementById("searchcard").focus()
      const term = this.state.searchTerm;
      const termLength = term.length -1;
      const backSpacedTerm = term.substring(0, termLength)
      this.setState({searchTerm: backSpacedTerm})
    } 
    
  }

  firstSearch(e) {
    const cardList = this.state.autoQueryOut;
    const searchOrder = cardList.length
    if (e.key === "ArrowDown" && searchOrder > 0 && cardList.length !== 0) {
      e.preventDefault();
      this.setState({currentSearchRank: 0})
      document.getElementById("searchresult0").focus()
    }
    
  }

  toggleFoil() {
    const isFoil = this.state.isFoil
    const card = this.state.stateReqstCard
    card.isFoil = !isFoil 
    if (isFoil) {
     this.setState({ isFoil: false, stateReqstCard: card }) 
    } else this.setState({ isFoil: true, stateReqstCard: card})
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

  

  render() {
    const card = this.state.stateReqstCard
    const suggestions = this.state.autoQueryOut;
    const { searchTerm, versions, showFront, versionChangerActive, isFoil, tempCard} = this.state
    const hasFoilEdition = versions.filter(e => e.id === card.id) && versions.filter(e => e.id === card.id)[0] && versions.filter(e => e.id === card.id)[0].foil && versions.filter(e => e.id === card.id)[0].nonfoil
    const frameEffects = versions.filter(e => e.id === card.id) && versions.filter(e => e.id === card.id)[0] && versions.filter(e => e.id === card.id)[0].frame_effects  
    const borderless = versions.filter(e => e.id === card.id) && versions.filter(e => e.id === card.id)[0] && versions.filter(e => e.id === card.id)[0].border_color === 'borderless'
    const effectString = FrameEffectParser(frameEffects)
    
    const ebayString = `${card.name} ${card.set} ${isFoil  ? 'foil' : ''} ${effectString} ${borderless ? 'borderless' : ''}`
    const ebayLink = GetEbayUrl(ebayString)
    const tcgLink = GetTcgUrl(ebayString)

    const id = card.id
    const match = versions && versions.length > 0 && versions.filter(e => e.id === id)
    const prices = match && match[0] && match[0].prices
    const priceArray = prices && Object.entries(prices) || []
    // this.displayPrices(priceArray)
    return (
      <div className="searchbar">  
        
        <div className="topside">
          <BuildControls 
            handleAdd={this.handleAdd} 
            stateReqstCard={this.state.stateReqstCard}
            hasControls={this.props.hasControls}        
            clearSearch={this.clearSearch}  
            viewType={this.props.viewType}
          />    

          <div className="searchbar__menu">          
            <input className="searchbar__input" type="text" id="searchcard" 
              placeholder="search card"
              value={searchTerm} onChange={this.handleChange}
              onKeyDown={(e) => this.firstSearch(e)}
              autoComplete="off" 
            />          
            <div className="searchbar__resultbox">
            {  
              suggestions.length !==0 && searchTerm.length > 2 ? suggestions.map((card, index) => 
              
              <button 
                onKeyDown={(e) => this.moveKey(e)}
                ref={index === 0 && this.firstResult } 
                id={"searchresult"+index}  key={index} 
                className="searchbar__autoresult"                 
                onFocus={() => this.getCard(card)} 
                onClick={() => this.handleListSelect(card)}
              >
                  {card}
              </button>
              ) : '' 
            }  
            </div>      
          </div>            

        </div>
        
        { this.state.stateReqstCard && this.state.stateReqstCard.name && this.state.searchTerm !== '' &&  
        <div className="rightside">           
          <div className="rightside-displayleft">
            <div className={isFoil ? "foil-gradient searchCard" : ""}>
              { card.layout === "normal" &&
                <img alt="" className={`preview-img-med`} src={card.imgmd} />
              }
              { card.layout === "adventure" &&
                <img alt="" className="preview-img-med" src={card.imgmd} />
              }
              { card.aftermath &&
                <img alt="" className={!this.state.rotated ? "preview-img-med": "preview-img-med aftermath"} src={card.imgmd} />
              }
              { card.layout === "split" && !card.aftermath &&
                <img alt="" className="preview-img-med split" src={card.imgmd} />
              }
              { card.layout === "flip" &&
                <img alt="" className="preview-img-med flip" src={card.imgmd} />
              }
              { card.layout === "transform" &&  
              <div className="searchbar__images">              
                <img alt="" className="preview-img-med" src={showFront ? card.imgmd : card.imgmdFlip} />                        
              </div> 
              }
              
              { card.layout === "transform" && 
              <button
              className="addtocube inoverlay changeEdition"    
              onClick={this.flipCard}          
              >
                See reverse side <FontAwesomeIcon icon={faSyncAlt} />
              </button> 
              }
              { card.layout === "modal_dfc" && 
              <div className="searchbar__images">              
                <img alt="" className="preview-img-med" src={showFront ? card.imgmd : card.imgmdFlip} />                        
              </div> 
              }
              { card.layout === "modal_dfc" && 
              <button
              className="addtocube inoverlay changeEdition"    
              onClick={this.flipCard}          
              >
                See reverse side <FontAwesomeIcon icon={faSyncAlt} />
              </button> 
              }
              { card.aftermath && 
                <button
                className="addtocube inoverlay changeEdition"    
                onClick={this.rotateCard}          
              >
                Rotate card <FontAwesomeIcon icon={faUndo} />
              </button> 
              }
              </div>
            {
              hasFoilEdition && <button 
                className="addtocube inoverlay changeEdition"
                onClick={this.toggleFoil}
              >
              { isFoil ? 'Switch to non-foil' : 'Switch to foil'}
              </button>
            }
            { versions && versions.length > 1 && 
              <button
                className="addtocube inoverlay changeEdition"    
                onClick={this.toggleVersionChanger}          
              >
              {versionChangerActive ? "Hide editions" :"Change edition"}
              </button>
            }
            { this.props.hasControls && versions &&
            <button
              className="addtocube inoverlay"
              onClick={this.handleAdd}
            >
            Add to Cube
            </button>            
            }
            <div className="prices-backgroundColor">                
              {!versionChangerActive && card && DisplayPrices(priceArray)}
            </div>

            <div style={{padding: '10px 0', display: 'flex'}}>
             <a href={ebayLink} target="_blank" className="addtocube inoverlay changeEdition"> Shop ebay <FontAwesomeIcon icon={faShoppingCart} /> </a>
             <a href={tcgLink} target="_blank" className="addtocube inoverlay changeEdition"> TCG Player <FontAwesomeIcon icon={faShoppingCart} /> </a>
            </div>
            
            
          </div>
          <div className="rightside-displayright">
            { versionChangerActive &&
            <div className="versionchanger-box">
              <div className="versionchanger-label">Available versions</div>
              <div className="versionchanger">
              
              { versions && versions.map((version) =>               
                <div
                  key={version.id} 
                  onClick={() => this.changeVersion(version)} 
                  className={this.state.stateReqstCard.id === version.id ? 'container active' : 'container idle' }
                >{version.set_name}</div>                           
              )}
              </div>
              
              {card && <div style={{marginTop: 16}} className="prices-backgroundColor">{DisplayPrices(priceArray)}</div>}
            </div>
            }
            

          </div>
          
           <ToolTip 
           text="Clear Search" 
           icon={ 
            <FontAwesomeIcon 
            icon={faTimes} 
            onClick={this.clearSearch}
            className="rightside-closeicon"
          />
           }
         />
          
          
        </div>
      }
      </div>
    )
  }
}

export default SearchCard;