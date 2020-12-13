export default function FrameEffectParser(array) {
  const valid = array && array.filter(e => e !== 'legendary')
  const effect = valid && valid[0]
  switch (effect){
    case "showcase": return effect
    case "borderless": return effect
    case "extendedart": return "extended"
    case undefined : return ''    
  }
}