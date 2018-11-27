import React, { Component } from 'react';
import Forge from './ForgeCardObject';
import axios from "axios";

class SearchCard extends Component {
  
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      tempCard: '',
      stateReqstCard: '',
      autoQueryIn: '',
      autoQueryOut: '',
      currentSearchRank: -1
    }
    this.focusCard = this.focusCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCard = this.getCard.bind(this);
    this.addCard = this.addCard.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
    this.checkIfOne = this.checkIfOne.bind(this);
    this.closeSuggestions = this.closeSuggestions.bind(this);

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
        tempCard: result,
        
      }) })
    .then(() => {
      this.focusCard()
    })
    .catch(error => console.error('Error', error))
  }

  focusCard() {
    const reqstCard = Forge(this.state.tempCard);
    this.setState({
      stateReqstCard: reqstCard,
    })
  }

  closeSuggestions(card) {
    this.setState({
      autoQueryOut: [],
      searchTerm: card
    })
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
    try {
      await axios.post('/fulgrens_cube', {
        newCard: this.state.stateReqstCard
      })
      this.props.loadCube()
    } catch(e) {
      console.log(e)
    }
  }

  handleAdd(event) {
    event.preventDefault();
    this.focusCard();
    this.addCard();
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
    
    return (
      <div className="searchbar">  
        
        <div className="topside">
          <div className="searchbar__menu">
          
          <input className="searchbar__input" type="text" id="searchcard"
            value={searchTerm} onChange={this.handleChange}
            onKeyDown={(e) => this.firstSearch(e)}
          />
          <div className="searchbar__buttonpanel">
          <form onSubmit={this.handleAdd}>
            <button>Add</button>
          </form>
        </div>
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
        <div className="rightside">
        
        
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
        
        </div>
      </div>
    )
  }
}

export default SearchCard;