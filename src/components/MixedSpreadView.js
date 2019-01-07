import React from 'react';
import DynamicCard from './DynamicCard';
// import DynamicListItem  from './DynamicListItem';
import AlphabeticSort  from './operations/AlphabeticSort';

const MixedSpreadView = (props) => {
  // if (props.cubeContents.data && props.viewType === "list") {
  //   const view = props.cubeContents.data.map((card => 
  //     <>
  //     <div className="dynamiclistitem">
  //     <DynamicListItem 
  //       name={card.name} 
  //       tooltip={card.imgmd} 
  //       id={card.id} 
  //       loadCube={() => props.loadCube()}
  //     />
  //     </div>
  //     </>
  //   )) 
  // return view } 
  
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
    />
    ))

    const multicolor = view.filter(card => card.props.colors.length > 1)
    const blue = view.filter(card => card.props.colors[0]=== "U" && card.props.colors.length === 1)
    const black = view.filter(card => card.props.colors[0]=== "B" && card.props.colors.length === 1)
    const white = view.filter(card => card.props.colors[0]=== "W" && card.props.colors.length === 1)
    const red = view.filter(card => card.props.colors[0]=== "R" && card.props.colors.length === 1)
    const green = view.filter(card => card.props.colors[0]=== "G" && card.props.colors.length === 1)
    const colorless = view.filter(card => card.props.colors.length === 0 && !card.props.type.includes("Land"))
    const land = view.filter(card => card.props.colors.length === 0 && card.props.type.includes("Land"))
    
    props.sort === 'alphabetic' && AlphabeticSort(multicolor, blue, black, white, red, green, colorless, land) 

    const colorSection = (color, colorstring) => (
      <div className={color.length > 0 ? '' : "hidden"}>
        <div className="dynamiccard__color-focuser" />
        <h2 className="dynamiccard__header"  >{colorstring} <span>- {color.length}</span> </h2>
        <div className={colorstring === 'Multicolor' ? "dynamiccard__color multi" : "dynamiccard__color"}>                                
          {color}
          <button className="newcardholder" id={`newcardholder${colorstring}`} />
        </div>
      </div>
    )


  return <div className="dynamiccard__container">            
            
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