export const activationBivalence = ({ cartesBoard }) => {
    let terreCount = 0;
    let merCount = 0;
    cartesBoard.forEach((carte) => {
        if(carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
            merCount++
        }
        if(carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre"){
            terreCount++
        }
      })
};