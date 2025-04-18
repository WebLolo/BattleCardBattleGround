import { sleep } from "@/utils/combatUtils1v1";
import { acheterCarte, lvlUpTaverne, actualiserBoutique, actualiserBoutiqueIA } from "@/utils/shopUtils1v1";
import { piocherCarteSpeIa } from "@/utils/mecaUtils";
import Player2Deck from "../components/Player2Deck";

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
    if (goldPlayer2 >= 3) {
      const meilleuresCartes = shopCards
        .filter((c) => c.famille === "Croc-Noir")
        .sort((a, b) => b.atk - a.atk);

      const cible =
        meilleuresCartes[0] || shopCards.sort((a, b) => b.atk - a.atk)[0];

      if (!cible) return;
      await sleep(2000); // attente réaliste
      setDeckPlayer2([cible])
      deckPlayer2.push(cible)
      console.log(deckPlayer2)
      await sleep(2000); // attente réaliste
      deckPlayer2.shift()
      console.log(deckPlayer2)
      setDeckPlayer2([deckPlayer2])
      setBoardPlayer2([cible])
      
      boardPlayer2.push(cible)

      // On passe au prochain tour
      setTourIa(2);
    }
  }

  // 💡 TOUR 2 : Monter de niveau
  if (tourIa === 2) {
    await sleep(1500); // petite pause de réflexion
   

    setTourIa(3); // ✅ prêt pour le tour 3
  }

  // 💡 TOUR 3 : Objectif : Synergie Croc-Noir sous-famille
  if (tourIa === 3) {
    console.log("🎯 Tour 3 - Objectif : Synergie Croc-Noir sous-famille");
    await sleep(1500); // (optionnel) délai de sécurité
  
    // 🧠 Identifier la sous-famille dominante sur le board
    const crocs = boardPlayer2.filter(c => c.famille === "Croc-Noir");

    const marins = crocs.filter(c => c.sousFamille === "Marin").length;


    const terrestres = crocs.filter(c => c.sousFamille === "Terrestre").length;
    const cibleSousType = marins >= terrestres ? "Marin" : "Terrestre";

  
    if (crocs.length === 0) {
      console.log("🛑 Aucun Croc-Noir sur le board. IA passe au plan B");
    }
    let gold = goldPlayer2
    while (gold >= 3) {
 
    }
    
    setTourIa(tourIa + 1);
    
  }
  if (tourIa === 4){
    console.log("🎯 Tour 4 - Objectif : Confirmer Synergie Croc-Noir sous-famille");
    await sleep(1500); // (optionnel) délai de sécurité
  
    // 🧠 Identifier la sous-famille dominante sur le board
    const crocs = boardPlayer2.filter(c => c.famille === "Croc-Noir");
    console.log(crocs)
    const marins = crocs.filter(c => c.sousFamille === "Marin").length;
    console.log(marins)

    const terrestres = crocs.filter(c => c.sousFamille === "Terrestre").length;
    console.log(terrestres)
    const cibleSousType = marins >= terrestres ? "Marin" : "Terrestre";
  
    if (crocs.length === 0) {
      console.log("🛑 Aucun Croc-Noir sur le board. IA passe au plan B");
    }
    let gold = goldPlayer2
    while (gold > 3){
      
    }
    
    setTourIa(tourIa + 1);
  }
  if (tourIa === 5){
    await sleep(1500); // petite pause de réflexion
    let gold = goldPlayer2
    // 🧠 Identifier la sous-famille dominante sur le board
    const crocs = boardPlayer2.filter(c => c.famille === "Croc-Noir");
    console.log(crocs)
    const marins = crocs.filter(c => c.sousFamille === "Marin").length;
    console.log(marins)

    const terrestres = crocs.filter(c => c.sousFamille === "Terrestre").length;
    console.log(terrestres)
    const cibleSousType = marins >= terrestres ? "Marin" : "Terrestre";
  
    if (crocs.length === 0) {
      console.log("🛑 Aucun Croc-Noir sur le board. IA passe au plan B");
    }
    await sleep(1500); // (optionnel) délai de sécurité
    let carte = shopCards.find(c => c.famille === "Croc-Noir" && c.sousFamille === cibleSousType);
    if (!carte) {
      const fallbackCrocs = shopCards.filter(c => c.famille === "Croc-Noir");
      const carteFallback = fallbackCrocs[0] || shopCards.sort((a, b) => b.atk - a.atk)[0];
  
      if (carteFallback) {
        console.log(`⚠️ Fallback IA : achat ${carteFallback.nom}`);
        await sleep(800);
        
      }
    }else{
      // ✅ On a trouvé une carte compatible
      console.log(`🛒 Achat de ${carte.nom}`);
      await sleep(800);
      
    }
    await sleep(1000);
    lvlUpTaverne({
      goldPlayer2,
      lvlTavernePlayer2,
      setGoldPlayer2,
      setLvlTavernePlayer2,
      setShopCards,
      actualPlayer: 2,
    });
    setTourIa(tourIa + 1);
  }
  if (tourIa === 6){
    console.log("🎯 Tour 6 - Objectif : Finaliser Synergie Croc-Noir sous-famille");
    await sleep(1500); // (optionnel) délai de sécurité
  
    // 🧠 Identifier la sous-famille dominante sur le board
    const crocs = boardPlayer2.filter(c => c.famille === "Croc-Noir");
    console.log(crocs)
    const marins = crocs.filter(c => c.sousFamille === "Marin").length;
    console.log(marins)

    const terrestres = crocs.filter(c => c.sousFamille === "Terrestre").length;
    console.log(terrestres)
    const cibleSousType = marins >= terrestres ? "Marin" : "Terrestre";
  
    if (crocs.length === 0) {
      console.log("🛑 Aucun Croc-Noir sur le board. IA passe au plan B");
    }
    let gold = goldPlayer2
    while (gold > 3){
      
    }
    await sleep(1000);
    // 🔻 Si toujours pas de Croc-Noir sous-famille => fallback
    
    setTourIa(tourIa + 1);
  }
}