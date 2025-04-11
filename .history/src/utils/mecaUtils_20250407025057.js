export const activationBivalence = ( boardPlayer, marinsCount ) => {
    let terreCount = 0
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