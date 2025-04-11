export const activationBivalence = ({ cartesBoard }) => {
    let terreCount = 0;
    let merCount = 0;
    console.log("allo lola c'est encore moi")
    cartesBoard.forEach((carte) => {
        if(carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
            merCount++
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