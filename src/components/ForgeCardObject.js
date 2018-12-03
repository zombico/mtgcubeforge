const Forge = (reqst) => {
  let reqstCard = {};
  // left.side reqstCard is mine, reqst right.side is scryfall's
  
  // basic search case
  if(reqst.layout ==="normal" || reqst.layout ==="saga") {
    reqstCard.id = reqst.id;
    reqstCard.name = reqst.name;
    reqstCard.type = reqst.type_line;
    reqstCard.text = reqst.oracle_text;
    reqstCard.layout = "normal";
    reqstCard.imgsm = reqst.image_uris.small;
    reqstCard.imgmd = reqst.image_uris.normal;  
  }

  // split card case
  if(reqst.layout ==="split") {
    reqstCard.id = reqst.id;
    reqstCard.name = reqst.card_faces[0].name;
    reqstCard.nameFlip = reqst.card_faces[1].name
    reqstCard.type = reqst.card_faces[0].type_line;
    reqstCard.text = reqst.card_faces[0].oracle_text;
    reqstCard.typeFlip = reqst.card_faces[1].type_line;
    reqstCard.textFlip = reqst.card_faces[1].oracle_text;
    reqstCard.layout = reqst.layout;
    reqstCard.imgsm = reqst.image_uris.small;
    reqstCard.imgmd = reqst.image_uris.normal;  
    const aftermath = reqst.set.includes("akh") || reqst.set.includes("hou") ? true : false;
    reqstCard.aftermath = aftermath;
    // console.log(reqst.set)
  }

  // case for double faced cards
  if (reqst.layout === "transform") {
    reqstCard.id = reqst.id;
    reqstCard.name = reqst.card_faces[0].name;
    reqstCard.nameFlip = reqst.card_faces[1].name
    reqstCard.type = reqst.card_faces[0].type_line;
    reqstCard.text = reqst.card_faces[0].oracle_text;
    reqstCard.typeFlip = reqst.card_faces[1].type_line;
    reqstCard.textFlip = reqst.card_faces[1].oracle_text;
    reqstCard.layout = reqst.layout;
    reqstCard.imgsm = reqst.card_faces[0].image_uris.small;
    reqstCard.imgmd = reqst.card_faces[0].image_uris.normal
    reqstCard.imgsmFlip = reqst.card_faces[1].image_uris.small;
    reqstCard.imgmdFlip = reqst.card_faces[1].image_uris.normal    
  }

  // case for flip cards
  if (reqst.layout === "flip") {
    reqstCard.id = reqst.id;
    reqstCard.name = reqst.card_faces[0].name;
    reqstCard.nameFlip = reqst.card_faces[1].name
    reqstCard.type = reqst.card_faces[0].type_line;
    reqstCard.text = reqst.card_faces[0].oracle_text;
    reqstCard.typeFlip = reqst.card_faces[1].type_line;
    reqstCard.textFlip = reqst.card_faces[1].oracle_text;
    reqstCard.layout = reqst.layout;
    reqstCard.imgsm = reqst.image_uris.small;
    reqstCard.imgmd = reqst.image_uris.normal;
  }
  
  return reqstCard
}

export default Forge;