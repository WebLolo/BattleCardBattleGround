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
      setGoldPlayer2(0)
      let newShopCards = shopCards.filter(c => c !== cible)
      setShopCards(newShopCards)
      await sleep(2000); // attente réaliste
      deckPlayer2.shift()
      console.log(deckPlayer2)
      setDeckPlayer2([])
      await sleep(10);
      setBoardPlayer2([cible])
      
      boardPlayer2.push(cible)

      // On passe au prochain tour
      setTourIa(2);
    }
  }

  // 💡 TOUR 2 : Monter de niveau
  if (tourIa === 2) {
    await sleep(1500); // petite pause de réflexion
    lvlUpTaverne({
      goldPlayer2,
      lvlTavernePlayer2,
      setGoldPlayer2,
      setLvlTavernePlayer2,
      setShopCards,
      actualPlayer: 2,
    });

    setTourIa(3); // ✅ prêt pour le tour 3
  }

  // 💡 TOUR 3 : Objectif : Synergie Croc-Noir sous-famille
  if (tourIa === 3) {
    console.log("🎯 Tour 3 - Objectif : Synergie Croc-Noir sous-famille");
    await sleep(1500); // (optionnel) délai de sécurité
  
    // 🧠 Identifier la sous-famille dominante sur le board
    const crocs = boardPlayer2.filter(c => c.famille === "Croc-Noir");
    console.log(crocs)
    const marins = crocs.filter(c => c.sousFamille === "Marin").length;
    console.log(marins)

    const terrestres = crocs.filter(c => c.sousFamille === "Terrestre").length;
    console.log(terrestres)
    const cibleSousType = marins >= terrestres ? "Marin" : "Terrestre";
    let carteCible = []
  

      while(goldPlayer2 > 3){
        const planA = shopCards.filter((c) => c.sousFamille === cibleSousType).sort((a, b) => b.atk - a.atk);
        if(planA.length > 0){
          //Acheter carte
          console.log(boardPlayer2)
          carteCible = planA[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          //Jouer carte
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)
        }else{
          //Actualiser Shop
          let newShop = actualiserBoutiqueIA({
            lvlTavernePlayer2, setShopCards: setShopCards, goldPlayer2, actualPlayer: 2, setGoldPlayer2
          });
          setGoldPlayer2(goldPlayer2 - 1)
          goldPlayer2 = goldPlayer2 - 1
          shopCards = newShop
          console.log(shopCards)
        }
      }
      if(goldPlayer2 === 3){
        console.log("dernière chance de planA")
        const planA = shopCards.filter((c) => c.sousFamille === cibleSousType).sort((a, b) => b.atk - a.atk);
        const planB = shopCards.filter((c) => c.famille === "Croc-Noir").sort((a, b) => b.atk - a.atk);
        const planC = shopCards.sort((a, b) => b.atk - a.atk)
        if(planA.length > 0){
          console.log("Ouf on reste sur le plan A")
          carteCible = planA[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)
        }else if(planA.length === 0 && planB.length > 0 ){
          console.log("Bon... plan B")
          carteCible = planB[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)
        }else{
          console.log("Decidement... plan C")
          carteCible = planC[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)
        }
      }  
    setTourIa(tourIa + 1);
    
  }
  if (tourIa === 4){
    console.log("🎯 Tour 4 - Objectif : Confirmer Synergie Croc-Noir sous-famille");
    await sleep(1500); // (optionnel) délai de sécurité
  
    const crocs = boardPlayer2.filter(c => c.famille === "Croc-Noir");
    console.log(crocs)
    const marins = crocs.filter(c => c.sousFamille === "Marin").length;
    console.log(marins)

    const terrestres = crocs.filter(c => c.sousFamille === "Terrestre").length;
    console.log(terrestres)
    const cibleSousType = marins >= terrestres ? "Marin" : "Terrestre";
    let carteCible = []
  

      while(goldPlayer2 > 3){
        const planA = shopCards.filter((c) => c.sousFamille === cibleSousType).sort((a, b) => b.atk - a.atk);
        if(planA.length > 0){
          console.log(boardPlayer2)
          carteCible = planA[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)
        }else{
          let newShop = actualiserBoutiqueIA({
            lvlTavernePlayer2, setShopCards: setShopCards, goldPlayer2, actualPlayer: 2, setGoldPlayer2
          });
          setGoldPlayer2(goldPlayer2 - 1)
          goldPlayer2 = goldPlayer2 - 1
          shopCards = newShop
          console.log(shopCards)
        }
      }
      if(goldPlayer2 === 3){
        console.log("dernière chance de planA")
        const planA = shopCards.filter((c) => c.sousFamille === cibleSousType).sort((a, b) => b.atk - a.atk);
        const planB = shopCards.filter((c) => c.famille === "Croc-Noir").sort((a, b) => b.atk - a.atk);
        const planC = shopCards.sort((a, b) => b.atk - a.atk)
        if(planA.length > 0){
          console.log("Ouf on reste sur le plan A")
          carteCible = planA[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)
        }else if(planA.length === 0 && planB.length > 0 ){
          console.log("Bon... plan B")
          carteCible = planB[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)
        }else{
          console.log("Decidement... plan C")
          carteCible = planC[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)
        }
      }  
    setTourIa(tourIa + 1);
  }
  if (tourIa === 5){
    await sleep(1500); // petite pause de réflexion
    const crocs = boardPlayer2.filter(c => c.famille === "Croc-Noir");
    console.log(crocs)
    const marins = crocs.filter(c => c.sousFamille === "Marin").length;
    console.log(marins)

    const terrestres = crocs.filter(c => c.sousFamille === "Terrestre").length;
    console.log(terrestres)
    const cibleSousType = marins >= terrestres ? "Marin" : "Terrestre";
    let carteCible = []
    const planA = shopCards.filter((c) => c.sousFamille === cibleSousType).sort((a, b) => b.atk - a.atk);
    const planB = shopCards.filter((c) => c.famille === "Croc-Noir").sort((a, b) => b.atk - a.atk);
    const planC = shopCards.sort((a, b) => b.atk - a.atk)
    if(planA.length > 0){
      console.log("Ouf on reste sur le plan A")
      carteCible = planA[0]
      console.log(carteCible)
      setDeckPlayer2([carteCible])
      deckPlayer2.push(carteCible)
      console.log(deckPlayer2)
      setGoldPlayer2(goldPlayer2 - 3)
      goldPlayer2 = goldPlayer2 - 3
      console.log(goldPlayer2)
      let newShopCards = shopCards.filter(c => c !== carteCible)
      setShopCards(newShopCards)
      shopCards = newShopCards
      await sleep(2000); // attente réaliste
      deckPlayer2.shift()
      console.log(deckPlayer2)
      setDeckPlayer2([])
      await sleep(10);
      setBoardPlayer2([ ...boardPlayer2, carteCible])
      boardPlayer2.push(carteCible)
    }else if(planA.length === 0 && planB.length > 0 ){
      console.log("Bon... plan B")
      carteCible = planB[0]
      console.log(carteCible)
      setDeckPlayer2([carteCible])
      deckPlayer2.push(carteCible)
      console.log(deckPlayer2)
      setGoldPlayer2(goldPlayer2 - 3)
      goldPlayer2 = goldPlayer2 - 3
      console.log(goldPlayer2)
      let newShopCards = shopCards.filter(c => c !== carteCible)
      setShopCards(newShopCards)
      shopCards = newShopCards
      await sleep(2000); // attente réaliste
      deckPlayer2.shift()
      console.log(deckPlayer2)
      setDeckPlayer2([])
      await sleep(10);
      setBoardPlayer2([ ...boardPlayer2, carteCible])
      boardPlayer2.push(carteCible)
    }else{
      console.log("Decidement... plan C")
      carteCible = planC[0]
      console.log(carteCible)
      setDeckPlayer2([carteCible])
      deckPlayer2.push(carteCible)
      console.log(deckPlayer2)
      setGoldPlayer2(goldPlayer2 - 3)
      goldPlayer2 = goldPlayer2 - 3
      console.log(goldPlayer2)
      let newShopCards = shopCards.filter(c => c !== carteCible)
      setShopCards(newShopCards)
      shopCards = newShopCards
      await sleep(2000); // attente réaliste
      deckPlayer2.shift()
      console.log(deckPlayer2)
      setDeckPlayer2([])
      await sleep(10);
      setBoardPlayer2([ ...boardPlayer2, carteCible])
      boardPlayer2.push(carteCible)
    }
    await sleep(1500); // petite pause de réflexion
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
  
    const crocs = boardPlayer2.filter(c => c.famille === "Croc-Noir");
    console.log(crocs)
    const marins = crocs.filter(c => c.sousFamille === "Marin").length;
    console.log(marins)

    const terrestres = crocs.filter(c => c.sousFamille === "Terrestre").length;
    console.log(terrestres)
    const cibleSousType = marins >= terrestres ? "Marin" : "Terrestre";
    let carteCible = []
  

      while(goldPlayer2 > 3){
        const planA = shopCards.filter((c) => c.sousFamille === cibleSousType).sort((a, b) => b.atk - a.atk);
        if(planA.length > 0){
          console.log(boardPlayer2)
          carteCible = planA[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)
        }else{
          let newShop = actualiserBoutiqueIA({
            lvlTavernePlayer2, setShopCards: setShopCards, goldPlayer2, actualPlayer: 2, setGoldPlayer2
          });
          setGoldPlayer2(goldPlayer2 - 1)
          goldPlayer2 = goldPlayer2 - 1
          shopCards = newShop
          console.log(shopCards)
        }
      }
      if(goldPlayer2 === 3){
        console.log("dernière chance de planA")
        const planA = shopCards.filter((c) => c.sousFamille === cibleSousType).sort((a, b) => b.atk - a.atk);
        const planB = shopCards.filter((c) => c.famille === "Croc-Noir").sort((a, b) => b.atk - a.atk);
        const planC = shopCards.sort((a, b) => b.atk - a.atk)
        if(planA.length > 0){
          console.log("Ouf on reste sur le plan A")
          carteCible = planA[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)
        }else if(planA.length === 0 && planB.length > 0 ){
          console.log("Bon... plan B")
          carteCible = planB[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)
        }else{
          console.log("Decidement... plan C")
          carteCible = planC[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)
        }
      }  
    setTourIa(tourIa + 1);
  }
  if (tourIa === 7){
    console.log("🎯 Tour 7 - Objectif : Optimisation Board");
    await sleep(1500); // (optionnel) délai de sécurité
  
    const crocs = boardPlayer2.filter(c => c.famille === "Croc-Noir");
    console.log(crocs)
    const marins = crocs.filter(c => c.sousFamille === "Marin").length;
    console.log(marins)

    const terrestres = crocs.filter(c => c.sousFamille === "Terrestre").length;
    console.log(terrestres)
    const cibleSousType = marins >= terrestres ? "Marin" : "Terrestre";
    const planA = shopCards.filter((c) => c.sousFamille === cibleSousType).sort((a, b) => b.atk - a.atk);
    const planB = shopCards.filter((c) => c.famille === "Croc-Noir").sort((a, b) => b.atk - a.atk);
    let carteCible = []
    if(boardPlayer2.length === 7){
      await sleep(2000); // attente réaliste
      let cartePoubelle = boardPlayer2.filter(c => c.famille !== "Croc-Noir").sort((a, b) => a.atk - b.atk)
      console.log(cartePoubelle)
      let cartePoubelle1 = crocs.filter(c => c.sousFamille !== cibleSousType).sort((a, b) => a.atk - b.atk)
      console.log(cartePoubelle1)
      if(cartePoubelle.length > 0){
        let laCartePoubelle = cartePoubelle[0]
        console.log(laCartePoubelle)
        setBoardPlayer2(boardPlayer2.filter((c) => c.id !== laCartePoubelle.id));
        boardPlayer2 = boardPlayer2.filter((c) => c.id !== laCartePoubelle.id);
        console.log(boardPlayer2)
        setGoldPlayer2(goldPlayer2 + 1)
        goldPlayer2 = goldPlayer2 + 1
        await sleep(2000); // attente réaliste
      }
      if(cartePoubelle.length === 0 && cartePoubelle1.length > 0){
        let laCartePoubelle1 = cartePoubelle1[0]
        setBoardPlayer2(boardPlayer2.filter((c) => c.id !== laCartePoubelle1.id));
        boardPlayer2 = boardPlayer2.filter((c) => c.id !== laCartePoubelle1.id);
        setGoldPlayer2(goldPlayer2 + 1)
        goldPlayer2 = goldPlayer2 + 1
        await sleep(2000); // attente réaliste
      }
    }

      if(planA.length > 0 && boardPlayer2.length < 7){

        console.log("Ouf on reste sur le plan A")
        carteCible = planA[0]
        console.log(carteCible)
        setDeckPlayer2([carteCible])
        deckPlayer2.push(carteCible)
        console.log(deckPlayer2)
        setGoldPlayer2(goldPlayer2 - 3)
        goldPlayer2 = goldPlayer2 - 3
        console.log(goldPlayer2)
        let newShopCards = shopCards.filter(c => c !== carteCible)
        setShopCards(newShopCards)
        shopCards = newShopCards
        await sleep(2000); // attente réaliste
        deckPlayer2.shift()
        console.log(deckPlayer2)
        setDeckPlayer2([])
        await sleep(10);
        setBoardPlayer2([ ...boardPlayer2, carteCible])
        boardPlayer2.push(carteCible)

        await sleep(1500); // petite pause de réflexion
        lvlUpTaverne({
          goldPlayer2,
          lvlTavernePlayer2,
          setGoldPlayer2,
          setLvlTavernePlayer2,
          setShopCards,
          actualPlayer: 2,
        });

      }else if(planA.length === 0 && planB.length > 0 && boardPlayer2.length < 7){
          console.log("Bon... plan B")
          carteCible = planB[0]
          console.log(carteCible)
          setDeckPlayer2([carteCible])
          deckPlayer2.push(carteCible)
          console.log(deckPlayer2)
          setGoldPlayer2(goldPlayer2 - 3)
          goldPlayer2 = goldPlayer2 - 3
          console.log(goldPlayer2)
          let newShopCards = shopCards.filter(c => c !== carteCible)
          setShopCards(newShopCards)
          shopCards = newShopCards
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          setBoardPlayer2([ ...boardPlayer2, carteCible])
          boardPlayer2.push(carteCible)

          await sleep(1500); // petite pause de réflexion
          lvlUpTaverne({
            goldPlayer2,
            lvlTavernePlayer2,
            setGoldPlayer2,
            setLvlTavernePlayer2,
            setShopCards,
            actualPlayer: 2,
          });
      }else{
        console.log("Bon, a part lvl up, je fais rien ce tour ci...")
        await sleep(1500); // petite pause de réflexion
        lvlUpTaverne({
          goldPlayer2,
          lvlTavernePlayer2,
          setGoldPlayer2,
          setLvlTavernePlayer2,
          setShopCards,
          actualPlayer: 2,
        });
      }
      setTourIa(tourIa + 1);
  }
  if(tourIa === 8){
    console.log("🎯 Tour 8 - Objectif : Opti board");
    await sleep(1500); // (optionnel) délai de sécurité
  
    const crocs = boardPlayer2.filter(c => c.famille === "Croc-Noir");
    console.log(crocs)
    const marins = crocs.filter(c => c.sousFamille === "Marin").length;
    console.log(marins)

    const terrestres = crocs.filter(c => c.sousFamille === "Terrestre").length;
    console.log(terrestres)
    const cibleSousType = marins >= terrestres ? "Marin" : "Terrestre";
    let carteCible = []
  

      while(goldPlayer2 > 3){
        const planA = shopCards.filter((c) => c.sousFamille === cibleSousType).sort((a, b) => b.lvl - a.lvl);
        if(planA.length > 0){
          //on vérifie le board et on vend si besoin
          if(boardPlayer2.length === 7){
            console.log("bon voyons les cartes que je pourrais me debarasser")
            await sleep(2000); // attente réaliste
            let cartePoubelle = boardPlayer2.filter(c => c.famille !== "Croc-Noir").sort((a, b) => a.atk - b.atk)
            console.log("liste des pires cartes",cartePoubelle)
            let cartePoubelle1 = crocs.filter(c => c.sousFamille !== cibleSousType).sort((a, b) => a.atk - b.atk)
            console.log("liste des moins pires cartes",cartePoubelle1)
            let cartePoubelle2 = crocs.filter(c => c.sousFamille === cibleSousType).sort((a, b) => a.lvl - b.lvl)
            console.log("liste des meilleurs cartes trié par atk croissants",cartePoubelle2)
            if(cartePoubelle.length > 0){
              let laCartePoubelle = cartePoubelle[0]
              console.log("debarassons nous de cette carte", laCartePoubelle)
              setBoardPlayer2(boardPlayer2.filter((c) => c.id !== laCartePoubelle.id));
              boardPlayer2 = boardPlayer2.filter((c) => c.id !== laCartePoubelle.id);
              console.log(boardPlayer2)
              setGoldPlayer2(goldPlayer2 + 1)
              goldPlayer2 = goldPlayer2 + 1
              await sleep(2000); // attente réaliste
            }
            if(cartePoubelle.length === 0 && cartePoubelle1.length > 0){
              let laCartePoubelle1 = cartePoubelle1[0]
              console.log("debarassons nous de cette carte", laCartePoubelle1)
              setBoardPlayer2(boardPlayer2.filter((c) => c.id !== laCartePoubelle1.id));
              boardPlayer2 = boardPlayer2.filter((c) => c.id !== laCartePoubelle1.id);
              setGoldPlayer2(goldPlayer2 + 1)
              goldPlayer2 = goldPlayer2 + 1
              await sleep(2000); // attente réaliste
            }
            if(cartePoubelle.length === 0 && cartePoubelle1.length === 0){
              let laCartePoubelle2 = cartePoubelle2[0]
              if(laCartePoubelle2.lvl < planA[0].lvl){
                console.log("debarassons nous de cette carte", laCartePoubelle2)
                setBoardPlayer2(boardPlayer2.filter((c) => c.id !== laCartePoubelle2.id));
                boardPlayer2 = boardPlayer2.filter((c) => c.id !== laCartePoubelle2.id);
                setGoldPlayer2(goldPlayer2 + 1)
                goldPlayer2 = goldPlayer2 + 1
                await sleep(2000); // attente réaliste
              }else{
                console.log("Je ne fais rien pour le moment")
                await sleep(2000);
              }

            }
          }
          if(boardPlayer2.length < 7){
            console.log(boardPlayer2)
            carteCible = planA[0]
            console.log("achetons cette carte", carteCible)
            setDeckPlayer2([carteCible])
            deckPlayer2.push(carteCible)
            console.log(deckPlayer2)
            setGoldPlayer2(goldPlayer2 - 3)
            goldPlayer2 = goldPlayer2 - 3
            console.log(goldPlayer2)
            let newShopCards = shopCards.filter(c => c !== carteCible)
            setShopCards(newShopCards)
            shopCards = newShopCards
            await sleep(2000); // attente réaliste
            deckPlayer2.shift()
            console.log(deckPlayer2)
            setDeckPlayer2([])
            await sleep(10);
            setBoardPlayer2([ ...boardPlayer2, carteCible])
            boardPlayer2.push(carteCible)
          }else{
            console.log("j'actualise la boutique")
            let newShop = actualiserBoutiqueIA({
              lvlTavernePlayer2, setShopCards: setShopCards, goldPlayer2, actualPlayer: 2, setGoldPlayer2
            });
            setGoldPlayer2(goldPlayer2 - 1)
            goldPlayer2 = goldPlayer2 - 1
            shopCards = newShop
            console.log(shopCards)
            await sleep(2000);
          }

        }else{
          console.log("j'actualise la boutique")
          let newShop = actualiserBoutiqueIA({
            lvlTavernePlayer2, setShopCards: setShopCards, goldPlayer2, actualPlayer: 2, setGoldPlayer2
          });
          setGoldPlayer2(goldPlayer2 - 1)
          goldPlayer2 = goldPlayer2 - 1
          shopCards = newShop
          console.log(shopCards)
          await sleep(2000);
        }
      }
      if(goldPlayer2 === 3){
        console.log("dernière chance de planA")
        const planA = shopCards.filter((c) => c.sousFamille === cibleSousType).sort((a, b) => b.lvl - a.lvl);
        const planB = shopCards.filter((c) => c.famille === "Croc-Noir").sort((a, b) => b.atk - a.atk);
        const planC = shopCards.sort((a, b) => b.atk - a.atk)
        if(planA.length > 0){
          //on vérifie le board et on vend si besoin
          if(boardPlayer2.length === 7){
            console.log("bon voyons les cartes que je pourrais me debarasser")
            await sleep(2000); // attente réaliste
            let cartePoubelle = boardPlayer2.filter(c => c.famille !== "Croc-Noir").sort((a, b) => a.atk - b.atk)
            console.log("liste des pires cartes",cartePoubelle)
            let cartePoubelle1 = crocs.filter(c => c.sousFamille !== cibleSousType).sort((a, b) => a.atk - b.atk)
            console.log("liste des moins pires cartes",cartePoubelle1)
            let cartePoubelle2 = crocs.filter(c => c.sousFamille === cibleSousType).sort((a, b) => a.lvl - b.lvl)
            console.log("liste des meilleurs cartes trié par atk croissants",cartePoubelle2)
            if(cartePoubelle.length > 0){
              let laCartePoubelle = cartePoubelle[0]
              console.log("debarrassons nous de cette carte", laCartePoubelle)
              setBoardPlayer2(boardPlayer2.filter((c) => c.id !== laCartePoubelle.id));
              boardPlayer2 = boardPlayer2.filter((c) => c.id !== laCartePoubelle.id);
              console.log(boardPlayer2)
              setGoldPlayer2(goldPlayer2 + 1)
              goldPlayer2 = goldPlayer2 + 1
              await sleep(2000); // attente réaliste
            }
            if(cartePoubelle.length === 0 && cartePoubelle1.length > 0){
              let laCartePoubelle1 = cartePoubelle1[0]
              console.log("debarrassons nous de cette carte", laCartePoubelle1)
              setBoardPlayer2(boardPlayer2.filter((c) => c.id !== laCartePoubelle1.id));
              boardPlayer2 = boardPlayer2.filter((c) => c.id !== laCartePoubelle1.id);
              setGoldPlayer2(goldPlayer2 + 1)
              goldPlayer2 = goldPlayer2 + 1
              await sleep(2000); // attente réaliste
            }
            if(cartePoubelle.length === 0 && cartePoubelle1.length === 0 && cartePoubelle2.length > 0){
              let laCartePoubelle2 = cartePoubelle2[0]
              console.log("debarrassons nous de cette carte", laCartePoubelle2)
              if(laCartePoubelle2.lvl < planA[0].lvl){
                setBoardPlayer2(boardPlayer2.filter((c) => c.id !== laCartePoubelle2.id));
                boardPlayer2 = boardPlayer2.filter((c) => c.id !== laCartePoubelle2.id);
                setGoldPlayer2(goldPlayer2 + 1)
                goldPlayer2 = goldPlayer2 + 1
                await sleep(2000); // attente réaliste
              }else{
                console.log("Je ne fais rien pour le moment")
                await sleep(2000);
              }

            }
          }
          if(boardPlayer2.length < 7){
            console.log("Ouf on reste sur le plan A")
            carteCible = planA[0]
            console.log("Achetons cette carte", carteCible)
            setDeckPlayer2([carteCible])
            deckPlayer2.push(carteCible)
            console.log(deckPlayer2)
            setGoldPlayer2(goldPlayer2 - 3)
            goldPlayer2 = goldPlayer2 - 3
            console.log(goldPlayer2)
            let newShopCards = shopCards.filter(c => c !== carteCible)
            setShopCards(newShopCards)
            shopCards = newShopCards
            await sleep(2000); // attente réaliste
            deckPlayer2.shift()
            console.log(deckPlayer2)
            setDeckPlayer2([])
            await sleep(10);
            setBoardPlayer2([ ...boardPlayer2, carteCible])
            boardPlayer2.push(carteCible)
          }else{
            console.log("Je ne fais rien pour le moment")
            await sleep(2000);
          }

        }else if(planA.length === 0 && planB.length > 0 ){
          //on vérifie le board et on vend si besoin
          if(boardPlayer2.length === 7){
            console.log("bon voyons les cartes que je pourrais me debarasser")
            await sleep(2000); // attente réaliste
            let cartePoubelle = boardPlayer2.filter(c => c.famille !== "Croc-Noir").sort((a, b) => a.atk - b.atk)
            console.log("liste des pires cartes",cartePoubelle)
            let cartePoubelle1 = crocs.filter(c => c.sousFamille !== cibleSousType).sort((a, b) => a.atk - b.atk)
            console.log("liste des moins pires cartes",cartePoubelle1)
            if(cartePoubelle.length > 0){
              let laCartePoubelle = cartePoubelle[0]
              console.log("debarrassons nous de cette carte", laCartePoubelle)
              setBoardPlayer2(boardPlayer2.filter((c) => c.id !== laCartePoubelle.id));
              boardPlayer2 = boardPlayer2.filter((c) => c.id !== laCartePoubelle.id);
              console.log(boardPlayer2)
              setGoldPlayer2(goldPlayer2 + 1)
              goldPlayer2 = goldPlayer2 + 1
              await sleep(2000); // attente réaliste
            }
            if(cartePoubelle.length === 0 && cartePoubelle1.length > 0){
              let laCartePoubelle1 = cartePoubelle1[0]
              
              if(laCartePoubelle1.atk < planB[0].atk){
                console.log("debarrassons nous de cette carte", laCartePoubelle1)
                setBoardPlayer2(boardPlayer2.filter((c) => c.id !== laCartePoubelle1.id));
                boardPlayer2 = boardPlayer2.filter((c) => c.id !== laCartePoubelle1.id);
                setGoldPlayer2(goldPlayer2 + 1)
                goldPlayer2 = goldPlayer2 + 1
                await sleep(2000); // attente réaliste
              }else{
                console.log("Je ne fais rien pour le moment")
                await sleep(2000);
              }

            }
          }
          if(boardPlayer2.length < 7){
            console.log("Bon... plan B")
            carteCible = planB[0]
            console.log("Achetons cette carte", carteCible)
            setDeckPlayer2([carteCible])
            deckPlayer2.push(carteCible)
            console.log(deckPlayer2)
            setGoldPlayer2(goldPlayer2 - 3)
            goldPlayer2 = goldPlayer2 - 3
            console.log(goldPlayer2)
            let newShopCards = shopCards.filter(c => c !== carteCible)
            setShopCards(newShopCards)
            shopCards = newShopCards
            await sleep(2000); // attente réaliste
            deckPlayer2.shift()
            console.log(deckPlayer2)
            setDeckPlayer2([])
            await sleep(10);
            setBoardPlayer2([ ...boardPlayer2, carteCible])
            boardPlayer2.push(carteCible)
          }else{
            console.log("Je ne fais rien pour le moment")
            await sleep(2000);
          }

        }else{
          if(boardPlayer2.length < 7){
            console.log("Decidement... plan C")
            carteCible = planC[0]
            console.log("Achetons cette carte", carteCible)
            setDeckPlayer2([carteCible])
            deckPlayer2.push(carteCible)
            console.log(deckPlayer2)
            setGoldPlayer2(goldPlayer2 - 3)
            goldPlayer2 = goldPlayer2 - 3
            console.log(goldPlayer2)
            let newShopCards = shopCards.filter(c => c !== carteCible)
            setShopCards(newShopCards)
            shopCards = newShopCards
            await sleep(2000); // attente réaliste
            deckPlayer2.shift()
            console.log(deckPlayer2)
            setDeckPlayer2([])
            await sleep(10);
            setBoardPlayer2([ ...boardPlayer2, carteCible])
            boardPlayer2.push(carteCible)
          }else{
            console.log("Je ne fais rien pour le moment")
            await sleep(2000);
          }

        }
      }  
    setTourIa(tourIa + 1);
  }
}