export const activationBivalence = ( cartesBoard, draggedCard) => {

    if(draggedCard.bivalenceMerCount >= 3){
        cartesBoard.forEach((carte) => {
            if(carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
                carte.bivalenceMerEffect = true
            }
        });
    }else{
        cartesBoard.forEach((carte) => {
            if(carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
                carte.bivalenceMerEffect = false
            }
        });
    };
    if(terreCount >= 3){
        cartesBoard.forEach((carte) => {
            if(carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre"){
                carte.bivalenceTerreEffect = true
            }
        });
    }else{
        cartesBoard.forEach((carte) => {
            if(carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre"){
                carte.bivalenceTerreEffect = false
            }
        });
    };
};