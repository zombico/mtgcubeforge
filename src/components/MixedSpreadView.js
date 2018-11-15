import React from 'react';

const MixedSpreadView = (props) => {
  console.log(props.cubeContents.data)
  if (props.cubeContents.data ) {
    const view = props.cubeContents.data.map((card => 
      
      <img className="mixedspread-view__img" src={card.imgsm} alt={card.name}/>
      
    ))
    return view
  } else {return ''}

  
}






export default MixedSpreadView;