export const activationBivalence = ( boardPlayer, marinsCount, setMarinsCount ) => {
    let terreCount = 0

    boardPlayer.forEach((carte) => {
        if(carte.sousFamille === "Marin"){
            setMarinsCount(marinsCount + 1)
        }
    });
    console.log(marinsCount)
    



    if(marinsCount >= 3){
        boardPlayer.forEach((carte) => {
            if(carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
                carte.bivalenceMerEffect = true
            }
        });
    }else{
        boardPlayer.forEach((carte) => {
            if(carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
                carte.bivalenceMerEffect = false
            }
        });
    };
    if(terreCount >= 3){
        boardPlayer.forEach((carte) => {
            if(carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre"){
                carte.bivalenceTerreEffect = true
            }
        });
    }else{
        boardPlayer.forEach((carte) => {
            if(carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre"){
                carte.bivalenceTerreEffect = false
            }
        });
    };
};