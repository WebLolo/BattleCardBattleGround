import { entierAleatoire } from "@/utils/combatUtils1v1";
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

export function piocherCarte(sourceType, targetType, draggedCard, boardPlayer ){
    if (sourceType === "deck" && targetType === "board-drop" && draggedCard.nom === "Shak’Noth, l’Oracle des Marées" && boardPlayer.length <7) {
        let randomNum = entierAleatoire(29,58)
        let carteRandomCrocNoir = cards[randomNum]
        setDeck([...deck, clonerCarte({ carteRandomCrocNoir, camp: "joueur" })]);
        console.log(`📢 ${draggedCard.nom} invoque : ${carteRandomCrocNoir.nom}`);
    }
}