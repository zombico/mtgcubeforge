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
    console.log(props.cubeContents)
    const view = props.cubeContents.map((card => 
    <DynamicCard
      
      cubeId={props.cubeId}
      src={card.imgsm} alt={card.name} 
      tooltip={card.imgmd} 
      colors={card.colors}
      type={card.type}
      id={card.id} 
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
    
    AlphabeticSort(multicolor, blue, black, white, red, green, colorless, land)

    const colorSection = (color, colorstring) => (
      <div className={color.length > 0 ? '' : "hidden"}>
        <div id={`${colorstring}section`} className="dynamiccard__color-spacer" />
        <h2 className="dynamiccard__header"  >{colorstring} <span>- {color.length}</span> </h2>
        <div className="dynamiccard__color">                                
          {color}
          <button className="newcardholder" id={`newcardholder${colorstring}`} />
        </div>
      </div>
    )

  return <div className="dynamiccard__container">            
            
            <div className={multicolor.length > 0 ? '' : "hidden"}>
              <div id="Multicolorsection" className="dynamiccard__color-spacer top" />
              <h2 className="dynamiccard__header"  >Multicolor <span>- {multicolor.length}</span> </h2>
              <div className="dynamiccard__color multi">                                
                {multicolor}
                <button className="newcardholder" id="newcardholdermulticolor" />
              </div>
            </div>

            {colorSection(blue, 'Blue')}
            {colorSection(black, 'Black')}
            {colorSection(white, 'White')}
            {colorSection(red, 'Red')}
            {colorSection(green, 'Green')}
            {colorSection(colorless, 'Colorless')}
            {colorSection(land, 'Land')}
                       
          </div>  } 
  
  else { return '' }  
  

  
}






export default MixedSpreadView;