import { sleep } from "@/utils/combatUtils1v1";
import { acheterCarte, lvlUpTaverne, actualiserBoutique, actualiserBoutiqueIA } from "@/utils/shopUtils1v1";
import { piocherCarteSpeIa } from "@/utils/mecaUtils";

function applicationEffectIa(boardPlayer2, carteAPoser, setBoardPlayer2, deckPlayer2, setDeckPlayer2, setFusionAnim){
  const nouveauBoard = [...boardPlayer2]
  const marinsB = nouveauBoard.filter(c => c.sousFamille === "Marin").length;
  const terrestresB = nouveauBoard.filter(c => c.sousFamille === "Terrestre").length;
  if(marinsB > terrestresB && carteAPoser.sousFamille === "Marin"){
    carteAPoser.bivalenceMarinEffect = true
    nouveauBoard.forEach(carte => {
      if(carte.nom === "Tor'Grag des Profondeurs"){
        carte.furieUse = true
        carte.provocationUse = false
      }
      if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
        carte.degatsAdj = true
        carte.furieUse = false
      }
      if(carte.nom === "Zûn'Tul, le Mange-Racines"){
        carte.furieUse = true
        carte.provocationUse = false
      }
    })
  }
  if(marinsB > terrestresB && carteAPoser.sousFamille === "Terrestre"){
    carteAPoser.bivalenceTerrestreEffect = false
    nouveauBoard.forEach(carte => {
      if(carte.nom === "Tor'Grag des Profondeurs"){
        carte.furieUse = true
        carte.provocationUse = false
      }
      if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
        carte.degatsAdj = true
        carte.furieUse = false
      }
      if(carte.nom === "Zûn'Tul, le Mange-Racines"){
        carte.furieUse = true
        carte.provocationUse = false
      }
    })
  }
  if(marinsB < terrestresB && carteAPoser.sousFamille === "Marin"){
    carteAPoser.bivalenceMarinEffect = false
    nouveauBoard.forEach(carte => {
      if(carte.nom === "Tor'Grag des Profondeurs"){
        carte.furieUse = false
        carte.provocationUse = true
      }
      if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
        carte.degatsAdj = false
        carte.furieUse = true
      }
      if(carte.nom === "Zûn'Tul, le Mange-Racines"){
        carte.furieUse = false
        carte.provocationUse = true
      }
    })
  }
  if(marinsB < terrestresB && carteAPoser.sousFamille === "Terrestre"){
    carteAPoser.bivalenceTerrestreEffect = true
    nouveauBoard.forEach(carte => {
      if(carte.nom === "Tor'Grag des Profondeurs"){
        carte.furieUse = false
        carte.provocationUse = true
      }
      if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
        carte.degatsAdj = false
        carte.furieUse = true
      }
      if(carte.nom === "Zûn'Tul, le Mange-Racines"){
        carte.furieUse = false
        carte.provocationUse = true
      }
    })
  }
  if(marinsB === terrestresB && carteAPoser.sousFamille === "Marin"){
    carteAPoser.bivalenceMarinEffect = true
    nouveauBoard.forEach(carte => {
      if(carte.nom === "Tor'Grag des Profondeurs"){
        carte.furieUse = true
        carte.provocationUse = true
      }
      if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
        carte.degatsAdj = true
        carte.furieUse = true
      }
      if(carte.nom === "Zûn'Tul, le Mange-Racines"){
        carte.furieUse = true
        carte.provocationUse = true
      }
    })
  }
  if(marinsB === terrestresB && carteAPoser.sousFamille === "Terrestre"){
    carteAPoser.bivalenceTerrestreEffect = true
    nouveauBoard.forEach(carte => {
      if(carte.nom === "Tor'Grag des Profondeurs"){
        carte.furieUse = true
        carte.provocationUse = true
      }
      if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
        carte.degatsAdj = true
        carte.furieUse = true
      }
      if(carte.nom === "Zûn'Tul, le Mange-Racines"){
        carte.furieUse = true
        carte.provocationUse = true
      }
    })
  }
  if(carteAPoser.bivalence){
    carteAPoser.bivalence(boardPlayer2)
    // Faire réagir les autres cartes à l’arrivée de celle-ci
    boardPlayer2.forEach(c => {
        if (c !== carteAPoser && c.bivalence) {
            c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
        }
    });
  }else{
    // Faire réagir les autres cartes à l’arrivée de celle-ci
    boardPlayer2.forEach(c => {
        if (c !== carteAPoser && c.bivalence) {
            c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
        }
    });
  }
  if(carteAPoser.criDeGuerre){
    carteAPoser.criDeGuerre(boardPlayer2)
  }
  if(carteAPoser.criDeGuerreUnique && boardPlayer2.length > 0){
    let cible = boardPlayer2[Math.floor(Math.random() * boardPlayer2.length)];
    carteAPoser.criDeGuerreUnique(cible);
  }
  if(carteAPoser.aura){
    carteAPoser.aura(boardPlayer2)
  }
  if(carteAPoser.auraUnique){
    let auraPresent = boardPlayer2.findIndex(carte => carte.aura)
          
    if (auraPresent >= 0){
        let carteAura = boardPlayer2.find(carte => carte.aura)
        carteAura.auraUnique(carteAPoser)
    }
  }
  if(carteAPoser.effetDeMass){
    carteAPoser.effetDeMass(carteAPoser, boardPlayer2)
  }
}

// TourIA avec logique évolutive par tour
export async function TourIa({
  goldPlayer2,
  setGoldPlayer2,
  shopCards,
  setShopCards,
  deckPlayer2,
  setDeckPlayer2,
  lvlTavernePlayer2,
  setLvlTavernePlayer2,
  boardPlayer2,
  setBoardPlayer2,
  jouerCarteDepuisDeck,
  tourIa,
  setTourIa,
  setFusionAnim
}) {
  console.log(`🤖 Tour de l'IA : ${tourIa}`);

  // 💡 TOUR 1 : Acheter une carte Croc-Noir ou avec plus d'ATK
  if (tourIa === 1) {
    console.log("1er tour, on achete une carte random" )
    let randomCard = shopCards[Math.floor(Math.random() * shopCards.length)]
    console.log(randomCard)
    



    // On passe au prochain tour
    setTourIa(2);
    
  }
}