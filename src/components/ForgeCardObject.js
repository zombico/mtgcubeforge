const Forge = (reqst) => {
  let reqstCard = {};
  // left.side reqstCard is mine, reqst right.side is scryfall's
  
  // basic search case
  if(reqst.layout ==="normal" || reqst.layout ==="saga" || reqst.layout==="leveler" || reqst.layout==="meld" || reqst.layout==="host" || reqst.layout==="augment" ) {
    reqstCard.id = reqst.id;
    reqstCard.name = reqst.name;
    reqstCard.colors = reqst.colors;
    reqstCard.type = reqst.type_line;
    reqstCard.text = reqst.oracle_text;
    reqstCard.layout = "normal";
    reqstCard.imgsm = reqst.image_uris.small;
    reqstCard.imgmd = reqst.image_uris.normal;
    reqstCard.oracleid = reqst.oracle_id;
    reqstCard.cmc = reqst.cmc;
    reqstCard.manacost = reqst.mana_cost;  
    reqstCard.set = reqst.set_name;
  }

  // split card case
  if(reqst.layout ==="split") {
    reqstCard.id = reqst.id;
    reqstCard.name = reqst.card_faces[0].name;
    reqstCard.nameFlip = reqst.card_faces[1].name
    reqstCard.colors = reqst.colors;
    reqstCard.type = reqst.card_faces[0].type_line;
    reqstCard.text = reqst.card_faces[0].oracle_text;
    reqstCard.typeFlip = reqst.card_faces[1].type_line;
    reqstCard.textFlip = reqst.card_faces[1].oracle_text;
    reqstCard.layout = reqst.layout;
    reqstCard.imgsm = reqst.image_uris.small;
    reqstCard.imgmd = reqst.image_uris.normal;  
    reqstCard.oracleid = reqst.oracle_id;
    reqstCard.cmc = reqst.cmc;
    reqstCard.manacost = reqst.mana_cost;
    reqstCard.set = reqst.set_name;
    const aftermath = reqst.set.includes("akh") || reqst.set.includes("hou") ? true : false;
    reqstCard.aftermath = aftermath;
    // console.log(reqst.set)
  }

  // case for double faced cards
  if (reqst.layout === "transform") {
    reqstCard.id = reqst.id;
    reqstCard.name = reqst.card_faces[0].name;
    reqstCard.nameFlip = reqst.card_faces[1].name;
    reqstCard.colors = reqst.color_identity;
    reqstCard.type = reqst.card_faces[0].type_line;
    reqstCard.text = reqst.card_faces[0].oracle_text;
    reqstCard.typeFlip = reqst.card_faces[1].type_line;
    reqstCard.textFlip = reqst.card_faces[1].oracle_text;
    reqstCard.layout = reqst.layout;
    reqstCard.imgsm = reqst.card_faces[0].image_uris.small;
    reqstCard.imgmd = reqst.card_faces[0].image_uris.normal
    reqstCard.oracleid = reqst.oracle_id;
    reqstCard.cmc = reqst.cmc;
    reqstCard.manacost = reqst.mana_cost;
    reqstCard.set = reqst.set_name;
    reqstCard.imgsmFlip = reqst.card_faces[1].image_uris.small;
    reqstCard.imgmdFlip = reqst.card_faces[1].image_uris.normal    
  }
  

  // case for flip cards
  if (reqst.layout === "flip") {
    reqstCard.id = reqst.id;
    reqstCard.name = reqst.card_faces[0].name;
    reqstCard.nameFlip = reqst.card_faces[1].name;
    reqstCard.colors = reqst.colors;
    reqstCard.type = reqst.card_faces[0].type_line;
    reqstCard.text = reqst.card_faces[0].oracle_text;
    reqstCard.typeFlip = reqst.card_faces[1].type_line;
    reqstCard.textFlip = reqst.card_faces[1].oracle_text;
    reqstCard.layout = reqst.layout;
    reqstCard.imgsm = reqst.image_uris.small;
    reqstCard.imgmd = reqst.image_uris.normal;
    reqstCard.oracleid = reqst.oracle_id;
    reqstCard.cmc = reqst.cmc;
    reqstCard.manacost = reqst.mana_cost;
    reqstCard.set = reqst.set_name;
  }
  
  return reqstCard
}

export default Forge;