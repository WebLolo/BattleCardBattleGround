export const activationBivalence = ( cartesBoard, setMarinsCount, marinsCount  ) => {
    let terreCount = 0
    cartesBoard.forEach((carte) => {
        if(carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
            setMarinsCount (marinsCount + 1)
        }
        if(carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre"){
            terreCount++
        }
    });
    console.log(marinsCount)
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