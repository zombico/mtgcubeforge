import React from 'react';
import DynamicCard from './DynamicCard';
import DynamicListItem  from './DynamicListItem';
import AlphabeticSort  from './operations/AlphabeticSort';
import ConvertedManaSort  from './operations/ConvertedManaSort';
import GetStats from './operations/GetStats';
import ModalButtonStats from './ModalButtonStats';

const MixedSpreadView = (props) => {
  if (props.cubeContents && props.viewType === "list") {
    const view = props.cubeContents.map((card => 
      
      <DynamicListItem 
        
        cubeId={props.cubeId}
        name={card.name} 
        nameFlip={card.nameFlip}
        src={card.imgsm}
        imgsmFlip={card.imgsmFlip} 
        tooltip={card.imgmd} 
        imgmdFlip={card.imgmdFlip}
        colors={card.colors}
        type={card.type}
        id={card.id} 
        oracleid={card.oracleid}
        cmc={card.cmc}
        manacost={card.manacost}
        layout={card.layout}
        aftermath={card.aftermath}
        loadCube={() => props.loadCube()}
        hasControls={props.hasControls}
        hoverEnabled={props.enableHoverZoom}
      />      
      
    )) 
    const errantLands = view.filter(card => card.props.colors.length > 0 && card.props.type.includes("Land")).map((card) => card.props.id).toString()
    
    const multicolor = view.filter(card => card.props.colors.length > 1)
    const blue = view.filter(card => card.props.colors[0]=== "U" && card.props.colors.length === 1)
    const black = view.filter(card => card.props.colors[0]=== "B" && card.props.colors.length === 1)
    const white = view.filter(card => card.props.colors[0]=== "W" && card.props.colors.length === 1)
    const red = view.filter(card => card.props.colors[0]=== "R" && card.props.colors.length === 1 )
    const green = view.filter(card => card.props.colors[0]=== "G" && card.props.colors.length === 1)
    const colorless = view.filter(card => card.props.colors.length === 0 && !card.props.type.includes("Land"))
    const land = view.filter(card => card.props.type.includes("Land") && !errantLands.includes(card.props.id) )
    
    const azorious = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "U" && card.props.colors[1]=== "W")
    const boros = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "R" && card.props.colors[1]=== "W")
    const dimir = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "U")
    const golgari = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "G")
    const gruul = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "G" && card.props.colors[1]=== "R")
    const izzet = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "R" && card.props.colors[1]=== "U")
    const orzhov = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "W")
    const rakdos = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "R")
    const selesnya = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "G" && card.props.colors[1]=== "W")
    const simic = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "G" && card.props.colors[1]=== "U")

    console.log(errantLands)

    AlphabeticSort(multicolor, blue, black, white, red, green, colorless, land) 
    props.sort === 'cmc' && ConvertedManaSort(multicolor, blue, black, white, red, green, colorless, land)
    // props.sort === 'alphabetic' && AlphabeticSort(multicolor, blue, black, white, red, green, colorless, land) 
    

    const colorSection = (color, colorstring) => (
      <div className={!color.length ? "hidden" : "dynamiclistitem__column"}>
        <div className="dynamiclistitem__column-mana centerizer">
        { color !== land && color !== multicolor &&          
          <img className="manasymbol" src={`/symbols/${colorstring}mana.svg`} alt={`${color}manasymbol`} />          
        }
        {
          color === land &&
          <div className="manasymbol noimg noimg-inlist">L</div>
        }
        {
          color === multicolor &&
          <div className="manasymbol noimg noimg-inlist">M</div>
        }
        </div>
        <h3 className="dynamiclistitem__header centerizer"  >{colorstring} <span>- {color.length}</span> </h3>
        <div className={"dynamiclistitem__listcontainer"}>                                
          {color !== multicolor && color}    
          
          { color===multicolor && guildSubSection(azorious, "Azorious")}
          { color===multicolor && guildSubSection(boros, "Boros")}
          { color===multicolor && guildSubSection(dimir, "Dimir")}
          { color===multicolor && guildSubSection(golgari, "Golgari")}
          { color===multicolor && guildSubSection(gruul, "Gruul")}
          { color===multicolor && guildSubSection(izzet, "Izzet")}
          { color===multicolor && guildSubSection(orzhov, "Orzhov")}
          { color===multicolor && guildSubSection(rakdos, "Rakdos")}
          { color===multicolor && guildSubSection(selesnya, "Selesnya")}
          { color===multicolor && guildSubSection(simic, "Simic")}
              
        </div>
      </div>
    )
    
    const guildSubSection = (color, colorstring) => (
      <div className={!color.length ? "hidden" : "dynamiclistitem__guild"}>
        <div className="dynamiclistitem__column-subsectionhead">
        <img className="manasymbol smaller" src={`/symbols/${colorstring}mana.svg`} alt={`${color}manasymbol`} /> 
          {colorstring}
        </div>
        {color}
      </div>
    )

    const stats = {}
      stats.all = GetStats(view)
      stats.multicolor = GetStats(multicolor)
      stats.blue = GetStats(blue)
      stats.black = GetStats(black)
      stats.white = GetStats(white)
      stats.red = GetStats(red)
      stats.green = GetStats(green)
      stats.colorless = GetStats(colorless)
      stats.land = GetStats(land)

    
  return <>
    <div className="statsTable__listbuttoncontainer"> <ModalButtonStats color="all" display="button" stats={stats} /></div>
    <div className="dynamiclistitem__container">
    <div className="dynamiclistitem">
      {colorSection(multicolor, "Multicolor")}
    </div> 
    <div className="dynamiclistitem">
      {colorSection(blue, "Blue")}
    </div>
    <div className="dynamiclistitem">
      {colorSection(black, "Black")}
    </div>
    <div className="dynamiclistitem">
      {colorSection(white, "White")}
    </div>
    <div className="dynamiclistitem">
      {colorSection(red, "Red")}
    </div>
    <div className="dynamiclistitem">
      {colorSection(green, "Green")}
    </div>
    <div className="dynamiclistitem">
      {colorSection(colorless, "Colorless")}
    </div>
    <div className="dynamiclistitem">
      {colorSection(land, "Land")}
    </div>
        </div>
        </>
  } 
  



  if (props.cubeContents && props.viewType === "card") {
    const view = props.cubeContents.map((card => 

    <DynamicCard 
           
      cubeId={props.cubeId}
      name={card.name} 
      nameFlip={card.nameFlip}
      src={card.imgsm}
      imgsmFlip={card.imgsmFlip} 
      tooltip={card.imgmd} 
      imgmdFlip={card.imgmdFlip}
      colors={card.colors}
      type={card.type}
      id={card.id} 
      oracleid={card.oracleid}
      cmc={card.cmc}
      manacost={card.manacost}
      layout={card.layout}
      aftermath={card.aftermath}
      loadCube={() => props.loadCube()}
      hasControls={props.hasControls}      
      hoverEnabled={props.enableHoverZoom}
    />
    ))
    const errantLands = view.filter(card => card.props.colors.length > 0 && card.props.type.includes("Land")).map((card) => card.props.id).toString()

    const multicolor = view.filter(card => card.props.colors.length > 1)
    const blue = view.filter(card => card.props.colors[0]=== "U" && card.props.colors.length === 1)
    const black = view.filter(card => card.props.colors[0]=== "B" && card.props.colors.length === 1)
    const white = view.filter(card => card.props.colors[0]=== "W" && card.props.colors.length === 1)
    const red = view.filter(card => card.props.colors[0]=== "R" && card.props.colors.length === 1 )
    const green = view.filter(card => card.props.colors[0]=== "G" && card.props.colors.length === 1)
    const colorless = view.filter(card => card.props.colors.length === 0 && !card.props.type.includes("Land"))
    const land = view.filter(card => card.props.type.includes("Land") && !errantLands.includes(card.props.id) )
    
    const azorious = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "U" && card.props.colors[1]=== "W")
    const boros = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "R" && card.props.colors[1]=== "W")
    const dimir = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "U")
    const golgari = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "G")
    const gruul = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "G" && card.props.colors[1]=== "R")
    const izzet = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "R" && card.props.colors[1]=== "U")
    const orzhov = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "W")
    const rakdos = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "R")
    const selesnya = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "G" && card.props.colors[1]=== "W")
    const simic = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "G" && card.props.colors[1]=== "U")
    
    props.sort === 'alphabetic' && AlphabeticSort(multicolor, blue, black, white, red, green, colorless, land) 
    props.sort === 'cmc' && ConvertedManaSort(multicolor, blue, black, white, red, green, colorless, land)

    const containerClass = view.length > 500 ? "dynamiccard__color large" : "dynamiccard__color"
    const colorSection = (color, colorstring) => (
      <div className={!color.length ? "hidden" : ""}>
        <div className="dynamiccard__color-focuser" />
        <h3 className="dynamiccard__header"  >{colorstring} <span>- {color.length}</span> </h3>
        <div className={containerClass}>                                
          {color}
          <button className="newcardholder" id={`newcardholder${colorstring}`} />
        </div>
      </div>
    )

    const stats = {}
      stats.all = GetStats(view)
      stats.multicolor = GetStats(multicolor)
      stats.blue = GetStats(blue)
      stats.black = GetStats(black)
      stats.white = GetStats(white)
      stats.red = GetStats(red)
      stats.green = GetStats(green)
      stats.colorless = GetStats(colorless)
      stats.land = GetStats(land)
    

  return <div className="dynamiccard__container">            
            <ModalButtonStats color="all" display="button" stats={stats} />
            <div id="Multicolorsection" className="dynamiccard__color-spacer" />
            {colorSection(multicolor, 'Multicolor')}
            <div id="Bluesection" className="dynamiccard__color-spacer" />
            {colorSection(blue, 'Blue')}
            <div id="Blacksection" className="dynamiccard__color-spacer" />
            {colorSection(black, 'Black')}
            <div id="Whitesection" className="dynamiccard__color-spacer" />
            {colorSection(white, 'White')}
            <div id="Redsection" className="dynamiccard__color-spacer" />
            {colorSection(red, 'Red')}
            <div id="Greensection" className="dynamiccard__color-spacer" />
            {colorSection(green, 'Green')}
            <div id="Colorlesssection" className="dynamiccard__color-spacer" />
            {colorSection(colorless, 'Colorless')}
            <div id="Landsection" className="dynamiccard__color-spacer" />
            {colorSection(land, 'Land')}
                       
            { props.cubeContents.length === 0 && 
            <p className="mixedspread-view__emptymsg">Use the search bar to find cards to add to your cube</p>}
          </div>  } 
  
  else { return '' }  
  

  
}





export default MixedSpreadView;