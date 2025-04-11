import { sleep } from "@/utils/combatUtils1v1";
import { clonerCarte } from "@/utils/shopUtils1v1";
import { cards } from "@/data/cardsData";
export function bivalence(sourceType, targetType, draggedCard, deck, setMarinsCount, marinsCount, setTerrestresCount, terrestresCount, boardPlayer){
    // La Bivalence //
                //Achat
                if (sourceType === "shop" && targetType === "footer" && draggedCard.sousFamille === "Marin" && deck.length <7){ 
                    setMarinsCount(marinsCount + 1)
                    if(marinsCount < terrestresCount){
                        boardPlayer.forEach((carte) => {
                            if(carte.sousFamille === "Marin"){
                                carte.bivalenceMarinEffect = false
                            }
                            if(carte.sousFamille === "Terrestre"){
                                carte.bivalenceTerrestreEffect = true
                            }
    
                        });
                    }
                    if(marinsCount === terrestresCount){
                        boardPlayer.forEach((carte) => {
                            if(carte.sousFamille === "Marin"){
                                carte.bivalenceMarinEffect = true
                            }
                            if(carte.sousFamille === "Terrestre"){
                                carte.bivalenceTerrestreEffect = true
                            }
    
                        });
                    } 
                }
                if (sourceType === "shop" && targetType === "footer" && draggedCard.sousFamille === "Terrestre" && deck.length <7){ 
                    setTerrestresCount(terrestresCount + 1)
                    if(terrestresCount < marinsCount){
                        console.log("coucou")
                        boardPlayer.forEach((carte) => {
                            if(carte.sousFamille === "Terrestre"){
                                carte.bivalenceTerrestreEffect = false
                            }
                            if(carte.sousFamille === "Marin"){
                                carte.bivalenceMarinEffect = true
                            }
    
                        });
                    }
                    if(terrestresCount === marinsCount){
                        boardPlayer.forEach((carte) => {
                            if(carte.sousFamille === "Terrestre"){
                                carte.bivalenceTerrestreEffect = true
                            }
                            if(carte.sousFamille === "Marin"){
                                carte.bivalenceMarinEffect = true
                            }
    
                        });
                    } 
                }
                //Placement
                //Majorité
                if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Marin" && boardPlayer.length <7 && marinsCount > terrestresCount){ 
                    draggedCard.bivalenceMarinEffect = true
                    boardPlayer.forEach((carte) => {
                        if(carte.sousFamille === "Terrestre"){
                            carte.bivalenceTerrestreEffect = false
                        }
                        if(carte.sousFamille === "Marin"){
                            carte.bivalenceMarinEffect = true
                        }
                    });
                }
                if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Terrestre" && boardPlayer.length <7 && marinsCount < terrestresCount){ 
                    draggedCard.bivalenceTerrestreEffect = true
                    boardPlayer.forEach((carte) => {
                        if(carte.sousFamille === "Marin"){
                            carte.bivalenceMarinEffect = false
                        }
                        if(carte.sousFamille === "Terrestre"){
                            carte.bivalenceTerrestreEffect = true
                        }
                    });
                }
                //Egalité
                if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Marin" && boardPlayer.length <7 && marinsCount === terrestresCount){ 
                    draggedCard.bivalenceMarinEffect = true
                    boardPlayer.forEach((carte) => {
                        if(carte.sousFamille === "Terrestre"){
                            carte.bivalenceTerrestreEffect = true
                        }
                        if(carte.sousFamille === "Marin"){
                            carte.bivalenceMarinEffect = true
                        }
                    });
                }
                if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Terrestre" && boardPlayer.length <7 && marinsCount === terrestresCount){ 
                    draggedCard.bivalenceTerrestreEffect = true
                    boardPlayer.forEach((carte) => {
                        if(carte.sousFamille === "Marin"){
                            carte.bivalenceMarinEffect = true
                        }
                        if(carte.sousFamille === "Terrestre"){
                            carte.bivalenceTerrestreEffect = true
                        }
                    });
                }
                //vente
                if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Marin"){ 
                    setMarinsCount(marinsCount - 1)
                    if(marinsCount < terrestresCount){
                        boardPlayer.forEach((carte) => {
                            if(carte.sousFamille === "Marin"){
                                carte.bivalenceMarinEffect = false
                            }
                            if(carte.sousFamille === "Terrestre"){
                                carte.bivalenceTerrestreEffect = true
                            }
    
                        });
                    }
                    if(marinsCount === terrestresCount){
                        boardPlayer.forEach((carte) => {
                            if(carte.sousFamille === "Marin"){
                                carte.bivalenceMarinEffect = true
                            }
                            if(carte.sousFamille === "Terrestre"){
                                carte.bivalenceTerrestreEffect = true
                            }
    
                        });
                    }
    
                }
                if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Terrestre"){ 
                    setTerrestresCount(terrestresCount - 1)
                    if(terrestresCount < marinsCount){
                        console.log("coucou")
                        boardPlayer.forEach((carte) => {
                            if(carte.sousFamille === "Terrestre"){
                                carte.bivalenceTerrestreEffect = false
                            }
                            if(carte.sousFamille === "Marin"){
                                carte.bivalenceMarinEffect = true
                            }
    
                        });
                    }
                    if(terrestresCount === marinsCount){
                        boardPlayer.forEach((carte) => {
                            if(carte.sousFamille === "Terrestre"){
                                carte.bivalenceTerrestreEffect = true
                            }
                            if(carte.sousFamille === "Marin"){
                                carte.bivalenceMarinEffect = true
                            }
    
                        });
                    } 
                }
}

export function piocherCarte( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer ){
    if (sourceType === "deck" && targetType === "board-drop" && draggedCard.piocherCarte === true && boardPlayer.length <7) {
        const nouveauDeck = deck.filter((c) => c.id !== draggedCard.id);
        const cartesCrocNoir = cards.filter((c) => c.famille === "Croc-Noir");
        const carteRandom = cartesCrocNoir[Math.floor(Math.random() * cartesCrocNoir.length)];
        const clone = clonerCarte({ carte: carteRandom, camp: "joueur" });
        setDeck([...nouveauDeck, clone]);
    
    }
}

export async function aoe(cartesPlayer, cartesPlayer2, setBoard, setBoardAdv){
    cartesPlayer.forEach((carte) => {
        if(carte.aoe){
          carte.aoe(cartesPlayer2)
          carte.aoe(cartesPlayer)
        }
      })
      await sleep(600);
      cartesPlayer2 = cartesPlayer2.filter(c => c.hp > 0);
      cartesPlayer = cartesPlayer.filter(c => c.hp > 0);
      setBoard([...cartesPlayer2]);
      setBoardAdv([...cartesPlayer])
      
}