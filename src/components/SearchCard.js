import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Forge from './ForgeCardObject';
import BuildControls from './BuildControls';
// import GetVersions from './operations/GetVersions';
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
      currentVersion: ''
    }
    this.focusCard = this.focusCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCard = this.getCard.bind(this);
    this.getVersions = this.getVersions.bind(this);
    this.changeVersion = this.changeVersion.bind(this);
    this.addCard = this.addCard.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
    this.checkIfOne = this.checkIfOne.bind(this);
    this.closeSuggestions = this.closeSuggestions.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.newcardShortcut = this.newcardShortcut.bind(this);
    this.moveKey = this.moveKey.bind(this);
    this.firstSearch = this.firstSearch.bind(this);
    this.firstResult = React.createRef();    
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
    fetch(`https://api.scryfall.com/cards/named?exact=${card}`, {
    })
    .then(res => res.json())
    .then(result => {  
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
        this.setState({
          versions: result.data        
        }) 
    })
    .catch(error => console.error('Error', error))
  }

  changeVersion = (version) => {
    // return Forge(version)
   console.log(version)
   const newVersion = Forge(version)
   console.log(newVersion)
   this.setState({
    stateReqstCard: newVersion,
  })
    
  }

  focusCard() {
    const reqstCard = Forge(this.state.tempCard);
    this.getVersions(reqstCard.oracleid)
    this.setState({
      stateReqstCard: reqstCard,
    })
  }

  closeSuggestions(card) {
    this.setState({
      autoQueryOut: [],
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
    this.setState({ searchTerm: '', stateReqstCard: '' })
    document.getElementById('searchcard').focus()
  }

  newcardShortcut = () => {    
    const colors = this.state.stateReqstCard.colors
    const type = this.state.stateReqstCard.type

    if (colors.length > 1) {
      return document.getElementById(`Multicolorsection`).scrollIntoView();
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
    } else if (colors.length === 0 && type != "Land") {
      return document.getElementById(`Colorlesssection`).scrollIntoView();
    } else if (colors.length === 0 && type === "Land") {
      return document.getElementById(`Landsection`).scrollIntoView();
    }

    
  }

  handleAdd(event) {
    event.preventDefault();
    this.focusCard();
    this.addCard();    
    this.newcardShortcut();
  }

  handleChange(event) {
    const newStroke = event.target.value    
    this.setState({
      searchTerm: newStroke
    })
    this.autoComplete(newStroke)
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
  
  render() {
    const card = this.state.stateReqstCard
    const suggestions = this.state.autoQueryOut;
    const searchTerm = this.state.searchTerm;
    const versions = this.state.versions
    
    return (
      <div className="searchbar">  
        
        <div className="topside">
        <BuildControls 
          handleAdd={this.handleAdd} 
          stateReqstCard={this.state.stateReqstCard}
          hasControls={this.props.hasControls}
        
        />    
          <div className="searchbar__menu">
          
          <input className="searchbar__input" type="text" id="searchcard" 
            placeholder="search card"
            value={searchTerm} onChange={this.handleChange}
            onKeyDown={(e) => this.firstSearch(e)}
          />
          
            <div className="searchbar__resultbox">
            {  
              suggestions.length !==0 && searchTerm.length > 2 ? suggestions.map((card, index) => 
              
              <button 
                onKeyDown={(e) => this.moveKey(e)}
                ref={index === 0 && this.firstResult } 
                id={"searchresult"+index}  key={index} 
                className="searchbar__autoresult" 
                onMouseEnter={() => this.getCard(card)}
                onFocus={() => this.getCard(card)} 
                onClick={() => this.closeSuggestions(card)}
              >
                  {card}
              </button>
              ) : '' 
            }  
            </div>      
          </div>            
        </div>
        { this.state.stateReqstCard !== '' && 
        <div className="rightside">
          <div className="rightside-displayleft">
            { card.layout === "normal" &&
              <img alt="" className="preview-img-med" src={card.imgmd} />
            }
            { card.aftermath &&
              <img alt="" className="preview-img-med aftermath" src={card.imgmd} />
            }
            { card.layout === "split" && !card.aftermath &&
              <img alt="" className="preview-img-med split" src={card.imgmd} />
            }
            { card.layout === "flip" &&
              <img alt="" className="preview-img-med flip" src={card.imgmd} />
            }
            { card.layout === "transform" && 
            <div className="searchbar__images">
              <img alt="" className="preview-img-med dfc" src={card.imgmd} /> 
              <img alt="" className="preview-img-med dfc" src={card.imgmdFlip} /> 
            </div> 
            }
            { this.props.hasControls &&
            <button
              className="addtocube inoverlay"
              onClick={this.handleAdd}
            >
            Add to Cube
            </button>
            }
          </div>
          <div className="rightside-displayright">
            <div>
            {versions.length > 0 && versions.map((version) => 
               <div onClick={() => this.changeVersion(version)} >{version.set_name}</div>
            )}
            </div>
            {/* <GetVersions 
              oracleid={this.state.stateReqstCard.oracleid}
              versions={this.state.versions}
              current={this.state.stateReqstCard.set}
              // changeVersion={this.changeVersion}
            />   */}
          </div>
          <FontAwesomeIcon 
            icon={faTimes} 
            onClick={this.clearSearch}
            className="rightside-closeicon"
          />
        </div>
      }
      </div>
    )
  }
}

export default SearchCard;