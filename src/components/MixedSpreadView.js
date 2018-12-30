import React from 'react';
import DynamicCard from './DynamicCard';
import DynamicListItem  from './DynamicListItem';

const MixedSpreadView = (props) => {
  if (props.cubeContents.data && props.viewType === "list") {
    const view = props.cubeContents.data.map((card => 
      <>
      <div className="dynamiclistitem">
      <DynamicListItem 
        name={card.name} 
        tooltip={card.imgmd} 
        id={card.id} 
        loadCube={() => props.loadCube()}
      />
      </div>
      </>
    )) 
  return view } 
  
  else if (props.cubeContents && props.viewType === "card") {
    
    const view = props.cubeContents.map((card => 
    <DynamicCard
      key={card.id}
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
    


  return <div className="dynamiccard__container">
            { multicolor.length > 0 && 
            <>
            <h2 className="dynamiccard__header">Multicolor</h2> 
            <div className="dynamiccard__color multi" id="multisection">                                
              {multicolor}
              <button className="newcardholder" id="newcardholdermulti" />
            </div>
            </>
            }
            { blue.length > 0 && 
            <>
            <h2 className="dynamiccard__header">Blue</h2> 
            <div className="dynamiccard__color" id="bluesection">                                
              {blue}
              <button className="newcardholder" id="newcardholderblue" />
            </div>
            </>
            }
            { black.length > 0 && 
            <>
            <h2 className="dynamiccard__header">Black</h2> 
            <div className="dynamiccard__color" id="blacksection">            
              {black}
              <button className="newcardholder" id="newcardholderblack" />
            </div>
            </>
            }
            { white.length > 0 && 
            <>
            <h2 className="dynamiccard__header">White</h2> 
            <div className="dynamiccard__color" id="whitesection">                                
              {white}
              <button className="newcardholder" id="newcardholderwhite" />
            </div>
            </>
            }
            { red.length > 0 && 
            <>
            <h2 className="dynamiccard__header">Red</h2> 
            <div className="dynamiccard__color" id="redsection">                                
              {red}
              <button className="newcardholder" id="newcardholderred" />
            </div>
            </>
            }
            { green.length > 0 && 
            <>
            <h2 className="dynamiccard__header">Green</h2>
            <div className="dynamiccard__color" id="greensection">                                
              {green}
              <button className="newcardholder" id="newcardholdergreen" />
            </div>
            </>
            }
            { colorless.length > 0 && 
            <>
            <h2 className="dynamiccard__header">Colorless</h2> 
            <div className="dynamiccard__color" id="colorlesssection">                                
              {colorless}                        
              <button className="newcardholder" id="newcardholdercolorless" />
            </div>
            </>
            }
            { land.length > 0 && 
            <>
            <h2 className="dynamiccard__header">Land</h2> 
            <div className="dynamiccard__color" id="landsection">                                
              {land}
              <button className="newcardholder" id="newcardholderland" />
            </div>
            </>
            }

          </div>  } 
  
  else { return '' }  
  

  
}






export default MixedSpreadView;