import React from 'react';
import DynamicCard from './DynamicCard';
import DynamicListItem  from './DynamicListItem';
import AlphabeticSort  from './operations/AlphabeticSort';
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
    console.log(view)
    const multicolor = view.filter(card => card.props.colors.length > 1)
    const blue = view.filter(card => card.props.colors[0]=== "U" && card.props.colors.length === 1 && !card.props.type.includes("Land"))
    const black = view.filter(card => card.props.colors[0]=== "B" && card.props.colors.length === 1 && !card.props.type.includes("Land"))
    const white = view.filter(card => card.props.colors[0]=== "W" && card.props.colors.length === 1 && !card.props.type.includes("Land"))
    const red = view.filter(card => card.props.colors[0]=== "R" && card.props.colors.length === 1 && !card.props.type.includes("Land"))
    const green = view.filter(card => card.props.colors[0]=== "G" && card.props.colors.length === 1 && !card.props.type.includes("Land"))
    const colorless = view.filter(card => card.props.colors.length === 0 && !card.props.type.includes("Land"))
    const land = view.filter(card => card.props.type.includes("Land"))
    
    props.sort === 'alphabetic' && AlphabeticSort(multicolor, blue, black, white, red, green, colorless, land) 

    const containerClass = view.length > 500 ? "dynamiccard__color large" : "dynamiccard__color"
    const colorSection = (color, colorstring) => (
      <div className={!color.length ? "hidden" : ""}>
        <div className="dynamiccard__color-focuser" />
        <h2 className="dynamiccard__header"  >{colorstring} <span>- {color.length}</span> </h2>
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

    
  return <div className="dynamiclistitem__container">
    <div className="dynamiclistitem">
      {multicolor}
    </div> 
    <div className="dynamiclistitem">
      {blue}
    </div>
        </div>
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

    const multicolor = view.filter(card => card.props.colors.length > 1)
    const blue = view.filter(card => card.props.colors[0]=== "U" && card.props.colors.length === 1 && !card.props.type.includes("Land"))
    const black = view.filter(card => card.props.colors[0]=== "B" && card.props.colors.length === 1 && !card.props.type.includes("Land"))
    const white = view.filter(card => card.props.colors[0]=== "W" && card.props.colors.length === 1 && !card.props.type.includes("Land"))
    const red = view.filter(card => card.props.colors[0]=== "R" && card.props.colors.length === 1 && !card.props.type.includes("Land"))
    const green = view.filter(card => card.props.colors[0]=== "G" && card.props.colors.length === 1 && !card.props.type.includes("Land"))
    const colorless = view.filter(card => card.props.colors.length === 0 && !card.props.type.includes("Land"))
    const land = view.filter(card => card.props.type.includes("Land"))
    
    props.sort === 'alphabetic' && AlphabeticSort(multicolor, blue, black, white, red, green, colorless, land) 

    const containerClass = view.length > 500 ? "dynamiccard__color large" : "dynamiccard__color"
    const colorSection = (color, colorstring) => (
      <div className={!color.length ? "hidden" : ""}>
        <div className="dynamiccard__color-focuser" />
        <h2 className="dynamiccard__header"  >{colorstring} <span>- {color.length}</span> </h2>
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