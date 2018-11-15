import React, { Component } from 'react';

// class MixedSpreadView extends Component {
// render() {
//   return (
//     <div>

//     </div>
//   )
// }
// }


const MixedSpreadView = (props) => {
  console.log(props.cubeContents.data)
  if (props.cubeContents.data ) {
    const view = props.cubeContents.data.map((card => 
      <div>{card.name}</div>
    ))
    return view
  } else {return ''}

  
}






export default MixedSpreadView;