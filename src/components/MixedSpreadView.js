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
    


  return <div className="dynamiccard__container">            
            
            <div className={multicolor.length > 0 ? '' : "hidden"}>
              <div id="multicolorsection" className="dynamiccard__color-spacer top" />
              <h2 className="dynamiccard__header"  >Multicolor <span>- {multicolor.length}</span> </h2>
              <div className="dynamiccard__color multi">                                
                {multicolor}
                <button className="newcardholder" id="newcardholdermulticolor" />
              </div>
            </div>
                        
            <div className={blue.length > 0 ? '' : "hidden"}>
              <div id="bluesection" className="dynamiccard__color-spacer"/>
              <h2 className="dynamiccard__header" id="bluesection">Blue <span>- {blue.length}</span> </h2> 
              <div className="dynamiccard__color" >                                
                {blue}
                <button className="newcardholder" id="newcardholderblue" />
              </div>
            </div>
            
            
            <div className={black.length > 0 ? '' : "hidden"}>
              <div id="blacksection" className="dynamiccard__color-spacer"/>
              <h2 className="dynamiccard__header" >Black <span>- {black.length}</span></h2> 
              <div className="dynamiccard__color" >            
                {black}
                <button className="newcardholder" id="newcardholderblack" />
              </div>
            </div>
            
            
            <div className={white.length > 0 ? '' : "hidden"}>
              <div id="whitesection" className="dynamiccard__color-spacer"/>
              <h2 className="dynamiccard__header">White <span>- {white.length}</span></h2> 
              <div className="dynamiccard__color" >                                
                {white}
                <button className="newcardholder" id="newcardholderwhite" />
              </div>
            </div>
            
            
            <div className={red.length > 0 ? '' : "hidden"}>
              <div id="redsection" className="dynamiccard__color-spacer"/>
              <h2 className="dynamiccard__header">Red <span>- {red.length}</span></h2> 
              <div className="dynamiccard__color" >                                
                {red}
                <button className="newcardholder" id="newcardholderred" />
              </div>
            </div>
            
            
            <div className={green.length > 0 ? '' : "hidden"}>
              <div id="greensection" className="dynamiccard__color-spacer"/>
              <h2 className="dynamiccard__header">Green <span>- {green.length}</span></h2>
              <div className="dynamiccard__color" >                                
                {green}
                <button className="newcardholder" id="newcardholdergreen" />
              </div>
            </div>
            
            
            <div className={colorless.length > 0 ? '' : "hidden"}>
              <div id="colorlesssection" className="dynamiccard__color-spacer"/>
              <h2 className="dynamiccard__header">Colorless <span>- {colorless.length}</span></h2> 
              <div className="dynamiccard__color" >                                
                {colorless}                        
                <button className="newcardholder" id="newcardholdercolorless" />
              </div>
            </div>
            
            
            <div className={land.length > 0 ? '' : "hidden"}>
              <div id="landsection" className="dynamiccard__color-spacer"/>
              <h2 className="dynamiccard__header">Land <span>- {land.length}</span></h2> 
              <div className="dynamiccard__color" >                                
                {land}
                <button className="newcardholder" id="newcardholderland" />
              </div>
            </div>
            

          </div>  } 
  
  else { return '' }  
  

  
}






export default MixedSpreadView;