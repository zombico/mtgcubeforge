export default function FrameEffectParser(effect) {
  switch (effect){
    case "showcase": return effect
    case "borderless": return effect
    case "extendedart": return "extended"    
  }
}