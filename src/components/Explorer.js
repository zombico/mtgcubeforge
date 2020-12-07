import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Explorer(props) {
  const [explorerOn, setExplorer] = useState(false)
  const [color, selectColor] = useState(false)
  const [type, setType] = useState(false)
  const [displayList, setList] = useState(false)
  const [displayTypeList, setTypeList] = useState(false)
  const [previewCard, setPreviewCard] = useState(false)
  
  const toggleExplorer = () => {
    explorerOn ? setExplorer(false) : setExplorer(true)
  }
  
  const {cube} = props
  const COLORS = [
    {name: 'Multicolor', value: 'M'},
    {name: 'Blue', value: 'U'},
    {name: 'White', value: 'W'},
    {name: 'Red', value: 'R'},
    {name: 'Black', value: 'B'},
    {name: 'Green', value: 'G'},
    {name: 'Colorless', value: 'N'},
    {name: 'Land', value: 'L'}
  ]
  const TYPES = [
    'creature', 'planeswalker', 'instant', 'sorcery', 'enchantment', 'artifact', 'land'
  ]
  
  //   let a = cube.map(e => e.type);
  // let unique = a.filter((item, i, ar) => ar.indexOf(item) === i);

  const blue = cube.filter( e => e.colors[0]=== "U" && e.colors.length === 1)
  const red = cube.filter( e => e.colors[0]=== "R" && e.colors.length === 1)
  const white = cube.filter( e => e.colors[0]=== "W" && e.colors.length === 1)
  const black = cube.filter( e => e.colors[0]=== "B" && e.colors.length === 1)
  const green = cube.filter( e => e.colors[0]=== "G" && e.colors.length === 1)
  const multi = cube.filter(e => e.colors.length > 1)
  const errantLands = cube.filter(e => e.colors.length > 0 && e.type.includes("Land")).map(card => card.id).toString()
    
  const colorless = cube.filter(e => e.colors.length === 0 && !e.type.includes("Land"))
  const land = cube.filter(e => e.type.includes("Land") && !errantLands.includes(e.id) )  
  
  const typeSplitter = (color, typestring, excludetype,excludetype1) => color.filter(card => card.type.includes(typestring) && !card.type.includes(excludetype) && !card.type.includes(excludetype1))
  
  const creatures = displayList && typeSplitter(displayList, "Creature", "Creatures")
  const planeswalkers = displayList &&  typeSplitter(displayList, "Planeswalker", "Planeswalkers")
  const instants = displayList && typeSplitter(displayList, "Instant", "Instants") 
  const sorceries = displayList && typeSplitter(displayList, "Sorcery", "Sorceries") 
  const enchantments = displayList && typeSplitter(displayList, "Enchantment", "Enchantments", "Artifact", "Creature") 
  const artifacts = displayList && typeSplitter(displayList, "Artifact", "Artifacts", "Creature") 
  const lands = displayList && typeSplitter(displayList, "Land", "Land") 
  // console.log(creatures) 


  const handleColorSelect = value => {    
    selectColor(value) 
    setType(false)
    setTypeList(false)
    setPreviewCard(false)
    switch(value) {
      case 'M': setList(multi)
        break
      case 'U': setList(blue)
        break
      case 'R': setList(red)
        break
      case 'W': setList(white)
        break
      case 'B': setList(black)
        break
      case 'G': setList(green)
        break
      case 'N': setList(colorless)
        break
      case 'L': 
        setList(land)
        setType('land')
        setTypeList(land)
        break
    }
    // console.log(type)
    if (value === color) {
      selectColor(false)
      setType(false)
      setList(false)
      setTypeList(false)
      setPreviewCard(false)
    }
  }
  
  const handleTypeSelect = value => {
    setPreviewCard(false)
    setType(value) 
    switch(value) {
      case 'creature': setTypeList(creatures)
        break
      case 'planeswalker': setTypeList(planeswalkers)
        break
      case 'instant': setTypeList(instants)
        break
      case 'sorcery': setTypeList(sorceries)
        break
      case 'enchantment': setTypeList(enchantments)
        break
      case 'artifact': setTypeList(artifacts)
        break
      case 'land': setTypeList(land)
        break
    }
    if (value === type) {
      setType(false)
      setTypeList(false)
      setPreviewCard(false)
    }
  }

  const handleSetPreview = value => {
    if(value.name === previewCard.name) setPreviewCard(false)
    else setPreviewCard(value)
  }

  return (
    <div className="explorer">
      
      <h3 onClick={() => toggleExplorer()}>Explore Cube  <span style={{marginLeft: 9}}><FontAwesomeIcon icon={faSearch}/></span></h3>
      { explorerOn &&
        <ul className="explorer-colors">
        {COLORS.map(e => <li 
          className={color === e.value ? "explorer-color selected" : "explorer-color"} 
          onClick={() => handleColorSelect(e.value)}
          >{e.name}</li>)
        }
      </ul>
      }

      {explorerOn && color && <div className="explorer-type_border">
      <ul className="explorer-colors">
        {TYPES.map(e => <li 
          className={type === e ? "explorer-color selected type" : "explorer-color type"} 
          onClick={() => handleTypeSelect(e)}
          >{e}</li>)
        }
        {/* {() => displayTypeList} */}    
      </ul></div>}
      
        {explorerOn && displayTypeList && 
        <section className="explorer-result">
        
        
        {displayTypeList.map(e => <div 
          className="explorer-result-item"
          onClick={() => handleSetPreview(e)}
          >{e.name} {e.nameFlip && `// ${e.nameFlip}`}
          
          {e.name === previewCard.name && <div className="explorer-preview">
           <img src={e.imgmd} />
          </div>}
          </div>)}

          
        </section>
        }
      
    </div>
  )
}

export default Explorer