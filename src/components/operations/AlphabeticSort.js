const AlphabeticSort = (multicolor, blue, black, white, red, green, colorless, land) => {

const sortmulticolor = multicolor.sort(function(a,b){
  let nameA = a.props.name.toLowerCase(), nameB = b.props.name.toLowerCase()
  
  if (nameA < nameB) //sort string ascending
    return -1 
  if (nameA > nameB)
    return 1
  return 0 //default return value (no sorting)
})
const sortblue = blue.sort(function(a,b){
  let nameA = a.props.name.toLowerCase(), nameB = b.props.name.toLowerCase()
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortblack = black.sort(function(a,b){
  let nameA = a.props.name.toLowerCase(), nameB = b.props.name.toLowerCase()
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortwhite = white.sort(function(a,b){
  let nameA = a.props.name.toLowerCase(), nameB = b.props.name.toLowerCase()
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortred = red.sort(function(a,b){
  let nameA = a.props.name.toLowerCase(), nameB = b.props.name.toLowerCase()
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortgreen = green.sort(function(a,b){
  let nameA = a.props.name.toLowerCase(), nameB = b.props.name.toLowerCase()
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortcolorless = colorless.sort(function(a,b){
  let nameA = a.props.name.toLowerCase(), nameB = b.props.name.toLowerCase()
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortland = land.sort(function(a,b){
  let nameA = a.props.name.toLowerCase(), nameB = b.props.name.toLowerCase()
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
}

export default AlphabeticSort
