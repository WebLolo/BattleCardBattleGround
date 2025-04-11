import { sleep } from "@/utils/combatUtils1v1";
import { clonerCarte } from "@/utils/shopUtils1v1";
import { cards } from "@/data/cardsData";
export function bivalence(sourceType, targetType, draggedCard, deck, setMarinsCount, marinsCount, setTerrestresCount, terrestresCount, boardPlayer){
    // La Bivalence //
        //Achat
            console.log(draggedCard.nom)    
        //Placement
        //Comptage du board
        let futurBoard = [...boardPlayer];
        if (sourceType === "deck" && targetType === "board-drop") {
            futurBoard = [...boardPlayer, draggedCard]; // simulation du board après pose
        } else if (sourceType === "board" && targetType === "header") {
            futurBoard = boardPlayer.filter(c => c !== draggedCard); // simulation du board après vente
        }

        const nbCrocNoirMarin = futurBoard.filter(
            (c) => c.famille === "Croc-Noir" && c.sousFamille === "Marin"
        ).length;

        const nbCrocNoirTerrestre = futurBoard.filter(
            (c) => c.famille === "Croc-Noir" && c.sousFamille === "Terrestre"
        ).length;
        console.log("terre", nbCrocNoirTerrestre, "mer",  nbCrocNoirMarin)
        // Si Board vide
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Marin" && boardPlayer.length <7 && nbCrocNoirMarin === 0 && nbCrocNoirTerrestre === 0){
            draggedCard.bivalenceMarinEffect = true
        }
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Terrestre" && boardPlayer.length <7 && nbCrocNoirMarin === 0 && nbCrocNoirTerrestre === 0){
            draggedCard.bivalenceTerrestreEffect = true
        }

        //Majorité ou Minorité

        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Marin" && boardPlayer.length <7 && nbCrocNoirMarin > nbCrocNoirTerrestre){  
            draggedCard.bivalenceMarinEffect = true
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = false
                }
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.nom === "Tor'Grag des Profondeurs"){
                    carte.furieUse = true
                    carte.provocationUse = false
                }
                if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
                    carte.degatsAdj = true
                    carte.furieUse = false
                }
                        
            });
            if(draggedCard.bivalence){
                draggedCard.bivalence(futurBoard)
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
                    
        }
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Marin" && boardPlayer.length <7 && nbCrocNoirMarin < nbCrocNoirTerrestre){  
            draggedCard.bivalenceMarinEffect = false
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = false
                }
                if(carte.nom === "Tor'Grag des Profondeurs"){
                    carte.furieUse = false
                    carte.provocationUse = true
                }
                if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
                    carte.degatsAdj = false
                    carte.furieUse = true
                }
                        
            });
            if(draggedCard.bivalence){
                draggedCard.bivalence(futurBoard)
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
                    
        }
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Terrestre" && boardPlayer.length <7 && nbCrocNoirTerrestre > nbCrocNoirMarin){ 
            draggedCard.bivalenceTerrestreEffect = true
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = false
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
                if(carte.nom === "Tor'Grag des Profondeurs"){
                    carte.furieUse = false
                    carte.provocationUse = true
                }
                if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
                    carte.degatsAdj = false
                    carte.furieUse = true
                }
            }); 
            if(draggedCard.bivalence){
                draggedCard.bivalence(futurBoard)
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }   
        }
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Terrestre" && boardPlayer.length <7 && nbCrocNoirTerrestre < nbCrocNoirMarin){ 
            draggedCard.bivalenceTerrestreEffect = false
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = false
                }
                if(carte.nom === "Tor'Grag des Profondeurs"){
                    carte.furieUse = true
                    carte.provocationUse = false
                }
                if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
                    carte.degatsAdj = true
                    carte.furieUse = false
                }
            });  
            if(draggedCard.bivalence){
                draggedCard.bivalence(futurBoard)
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }  
        }
        //Egalité
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Marin" && boardPlayer.length <7 && nbCrocNoirMarin === nbCrocNoirTerrestre){ 
            draggedCard.bivalenceMarinEffect = true
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.nom === "Tor'Grag des Profondeurs"){
                    carte.furieUse = true
                    carte.provocationUse = true
                }
                if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
                    carte.degatsAdj = true
                    carte.furieUse = true
                }
            });  
            if(draggedCard.bivalence){
                draggedCard.bivalence(futurBoard)
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }   
        }
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Terrestre" && boardPlayer.length <7 && nbCrocNoirMarin === nbCrocNoirTerrestre){ 
            draggedCard.bivalenceTerrestreEffect = true
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.nom === "Tor'Grag des Profondeurs"){
                    carte.furieUse = true
                    carte.provocationUse = true
                }
                if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
                    carte.degatsAdj = true
                    carte.furieUse = true
                }
            }); 
            if(draggedCard.bivalence){
                draggedCard.bivalence(futurBoard)
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }   
        }
        //vente
        if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Marin" && nbCrocNoirMarin < nbCrocNoirTerrestre){ 
            boardPlayer.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = false
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
            });
            if(draggedCard.bivalence){
                draggedCard.bivalenceSell(futurBoard)
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
        }
        
        if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Marin" && nbCrocNoirMarin > nbCrocNoirTerrestre){ 
            boardPlayer.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = false
                }
            });
            if(draggedCard.bivalence){
                draggedCard.bivalenceSell(futurBoard)
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
        }
        if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Terrestre" && nbCrocNoirTerrestre < nbCrocNoirMarin){ 
            
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = false
                }
            });
            if(draggedCard.bivalence){
                draggedCard.bivalenceSell(futurBoard)
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
        }
        if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Terrestre" && nbCrocNoirTerrestre > nbCrocNoirMarin){ 
            boardPlayer.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = false
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
            });
            if(draggedCard.bivalence){
                draggedCard.bivalenceSell(futurBoard)
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
        }
        if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Marin" && nbCrocNoirMarin === nbCrocNoirTerrestre){ 
            boardPlayer.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
            });
            if(draggedCard.bivalence){
                draggedCard.bivalenceSell(futurBoard)
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }

        }
        if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Terrestre" && nbCrocNoirMarin === nbCrocNoirTerrestre){ 
            boardPlayer.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
            });
            if(draggedCard.bivalence){
                draggedCard.bivalenceSell(futurBoard)
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
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
export function piocherCarteSpe( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer ){
    if (sourceType === "deck" && targetType === "board-drop" && draggedCard.piocherCarteSpe === true && boardPlayer.length <7) {
        const nouveauDeck = deck.filter((c) => c.id !== draggedCard.id);
        const carteSpe = cards[draggedCard.carteSpe]
        const clone = clonerCarte({ carte: carteSpe, camp: "joueur" });
        setDeck([...nouveauDeck, clone]);
    
    }
}
export function piocherCarteInf( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer ){
    if (sourceType === "deck" && targetType === "board-drop" && draggedCard.piocherCarteInf === true && boardPlayer.length <7) {
        const nouveauDeck = deck.filter((c) => c.id !== draggedCard.id);
        const cartesCrocNoir = cards.filter((c) => c.famille === "Croc-Noir");
        const cartesCrocNoirInf = cartesCrocNoir.filter((c) => c.lvl < draggedCard.lvl);
        console.log(cartesCrocNoir);
        console.log(cartesCrocNoirInf)
        const carteRandom = cartesCrocNoirInf[Math.floor(Math.random() * cartesCrocNoirInf.length)];
        const clone = clonerCarte({ carte: carteRandom, camp: "joueur" });
        setDeck([...nouveauDeck, clone]);
    
    }
}

export async function aoe(cartesPlayer, cartesPlayer2) {
    [...cartesPlayer, ...cartesPlayer2].forEach(carte => {
      if (carte.aoe) {
        carte.aoe(cartesPlayer2);
        carte.aoe(cartesPlayer);
      }
    });
  
    const mortsPlayer = cartesPlayer.filter(c => c.hp <= 0);
    const mortsPlayer2 = cartesPlayer2.filter(c => c.hp <= 0);
  
    const cartesPlayerFiltered = cartesPlayer.filter(c => c.hp > 0);
    const cartesPlayer2Filtered = cartesPlayer2.filter(c => c.hp > 0);
  
    return {
      cartesPlayer: cartesPlayerFiltered,
      cartesPlayer2: cartesPlayer2Filtered,
      mortsPlayer,
      mortsPlayer2
    };
}
export async function aoeCible(cartesPlayer, cartesPlayer2) {
    [...cartesPlayer].forEach(carte => {
      if (carte.aoeCible) {
        carte.aoeCible(cartesPlayer2);
      }
    });
    [...cartesPlayer2].forEach(carte => {
        if (carte.aoeCible) {
          carte.aoeCible(cartesPlayer);
        }
    });
  
    const mortsPlayer = cartesPlayer.filter(c => c.hp <= 0);
    const mortsPlayer2 = cartesPlayer2.filter(c => c.hp <= 0);
  
    const cartesPlayerFiltered = cartesPlayer.filter(c => c.hp > 0);
    const cartesPlayer2Filtered = cartesPlayer2.filter(c => c.hp > 0);
  
    return {
      cartesPlayer: cartesPlayerFiltered,
      cartesPlayer2: cartesPlayer2Filtered,
      mortsPlayer,
      mortsPlayer2
    };
}
  export async function oneTicDebutCombat(cartesSource, cartesCible) {
    const cible = cartesCible[Math.floor(Math.random() * cartesCible.length)];
  
    cartesSource.forEach(carte => {
      if (carte.oneTicDebutCombat) {
        carte.oneTicDebutCombat(cible, carte);
      }
    });
  
    const morts = cartesCible.filter(c => c.hp <= 0);
    const cartesCibleFiltered = cartesCible.filter(c => c.hp > 0);
  
    return {
      cartesCible: cartesCibleFiltered,
      morts
    };
  }
  
export function boardPositionSell(card, boardPlayer){
    if(card.boardPosition === 1){
        boardPlayer.forEach((card) => {
            if(card.boardPosition > 1){
                card.boardPosition--
            }
        })
    }
    if(card.boardPosition === 2){
        boardPlayer.forEach((card) => {
            if(card.boardPosition > 2){
                card.boardPosition--
            }
        })
    }
    if(card.boardPosition === 3){
        boardPlayer.forEach((card) => {
            if(card.boardPosition > 3){
                card.boardPosition--
            }
        })
    }
    if(card.boardPosition === 4){
        boardPlayer.forEach((card) => {
            if(card.boardPosition > 4){
                card.boardPosition--
            }
        })
    }
    if(card.boardPosition === 5){
        boardPlayer.forEach((card) => {
            if(card.boardPosition > 5){
                card.boardPosition--
            }
        })
    }
    if(card.boardPosition === 6){
        boardPlayer.forEach((card) => {
            if(card.boardPosition > 6){
                card.boardPosition--
            }
        })
    }

}

export function addBoardPosition (card, boardPlayer){
    if(boardPlayer.length === 0){
        card.boardPosition = 1
    }
    if(boardPlayer.length === 1){
        card.boardPosition = 2
    }
    if(boardPlayer.length === 2){
        card.boardPosition = 3
    }
    if(boardPlayer.length === 3){
        card.boardPosition = 4
    }
    if(boardPlayer.length === 4){
        card.boardPosition = 5
    }
    if(boardPlayer.length === 5){
        card.boardPosition = 6
    }
    if(boardPlayer.length === 6){
        card.boardPosition = 7
    }
}

export function boardPositionFight(cartesPlayer){
    cartesPlayer.forEach((card) => {
        if(card.boardPosition === 1 && card.hp <= 0){
          cartesPlayer.forEach((card) => {
            if(card.boardPosition > 1){
              card.boardPosition --
            }
          })
        }
        if(card.boardPosition === 2 && card.hp <= 0){
          cartesPlayer.forEach((card) => {
            if(card.boardPosition > 2){
              card.boardPosition --
            }
          })
        }
        if(card.boardPosition === 3 && card.hp <= 0){
          cartesPlayer.forEach((card) => {
            if(card.boardPosition > 3){
              card.boardPosition --
            }
          })
        }
        if(card.boardPosition === 4 && card.hp <= 0){
          cartesPlayer.forEach((card) => {
            if(card.boardPosition > 4){
              card.boardPosition --
            }
          })
        }
        if(card.boardPosition === 5 && card.hp <= 0){
          cartesPlayer.forEach((card) => {
            if(card.boardPosition > 5){
              card.boardPosition --
            }
          })
        }
        if(card.boardPosition === 6 && card.hp <= 0){
          cartesPlayer.forEach((card) => {
            if(card.boardPosition > 6){
              card.boardPosition --
            }
          })
        }
      })
}

export function degatsAdj(attaquant, defenseur, cartesPlayer, cartesPlayer2, nomDefenseur){
    if(nomDefenseur === "joueur2" && cartesPlayer2.length > 1){
        if(defenseur.boardPosition === 1){
          cartesPlayer2[1].hp -= attaquant.atk
        }else if(defenseur === cartesPlayer2[cartesPlayer2.length -1]){
          cartesPlayer2[cartesPlayer2.length - 2].hp -= attaquant.atk
        }else{
          cartesPlayer2[defenseur.boardPosition -2].hp -= attaquant.atk
          cartesPlayer2[defenseur.boardPosition ].hp -= attaquant.atk
        }
      }
      if(nomDefenseur === "joueur" && cartesPlayer.length > 1){
        if(defenseur.boardPosition === 1){
          cartesPlayer[1].hp -= attaquant.atk
        }else if(defenseur === cartesPlayer[cartesPlayer.length -1]){
          cartesPlayer[cartesPlayer.length - 2].hp -= attaquant.atk
        }else{
          cartesPlayer[defenseur.boardPosition -2].hp -= attaquant.atk
          cartesPlayer[defenseur.boardPosition ].hp -= attaquant.atk
        }
      }
}

export function infligerDegats(carte, degats) {
    if (!carte) return carte;
  
    return {
      ...carte,
      hp: carte.hp - degats,
      degatsRecus: degats,
    };
  }
  