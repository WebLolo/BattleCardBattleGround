export const activationBivalence = ( cartesBoard, setmarinsCount, marinsCount  ) => {
    let terreCount =0
    cartesBoard.forEach((carte) => {
        if(carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
            setmarinsCount (marinsCount + 1)
        }
        if(carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre"){
            terreCount++
        }
    });
    console.log(merCount)
    if(merCount >= 3){
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