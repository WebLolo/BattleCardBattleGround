export const activationBivalence = ( cartesBoard ) => {
    let terreCount = 0;
    let merCount = 0;
    cartesBoard.forEach((carte) => {
        if(carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
            merCount++
        }
        if(carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre"){
            terreCount++
        }
    });
    console.log(merCount)
    if(merCount >= 2){
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
    if(terreCount >= 2){
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