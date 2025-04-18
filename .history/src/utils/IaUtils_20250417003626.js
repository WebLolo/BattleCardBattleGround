import { sleep } from "@/utils/combatUtils1v1";
import { acheterCarte, lvlUpTaverne, actualiserBoutique, actualiserBoutiqueIA } from "@/utils/shopUtils1v1";

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
  actualPlayer,
  refreshRef,
  shopSnapshotRef,
  waitForShopUpdate
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
      acheterCarte({
        card: cible,
        goldPlayer2,
        setGoldPlayer2,
        deckPlayer2,
        setDeckPlayer2,
        shopCards,
        setShopCards,
        lvlTavernePlayer2,
        actualPlayer: 2,
      });
      if(cible.sousFamille === "Marin"){
        cible.bivalenceMarinEffect = true
      }
      if(cible.sousFamille === "Terrestre"){
        cible.bivalenceTerrestreEffect = true
      }
      if(cible.bivalence){
        cible.bivalence(boardPlayer2)
        // Faire réagir les autres cartes à l’arrivée de celle-ci
        boardPlayer2.forEach(c => {
            if (c !== cible && c.bivalence) {
                c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
            }
        });
      }else{
        // Faire réagir les autres cartes à l’arrivée de celle-ci
        boardPlayer2.forEach(c => {
            if (c !== cible && c.bivalence) {
                c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
            }
        });
      }
      if(cible.criDeGuerre){
        cible.criDeGuerre(boardPlayer2)
      }
      if(cible.criDeGuerreUnique){
        let cible1 = boardPlayer2[Math.floor(Math.random() * boardPlayer2.length)];
        cible.criDeGuerreUnique(cible1);
      }
      if(cible.aura){
        cible.aura(boardPlayer2)
      }
      if(cible.auraUnique){
        let auraPresent = boardPlayer2.findIndex(carte => carte.aura)
              
        if (auraPresent >= 0){
            let carteAura = boardPlayer2.find(carte => carte.aura)
            carteAura.auraUnique(cible)
        }
      }
      if(cible.nom === "Tor'Grag des Profondeurs"){
        cible.furieUse = true
        cible.provocationUse = true
      }
      

      await sleep(800);

      // Essayer de poser la carte sur le board
      const nouvelleCarte = [...deckPlayer2, cible].find((c) => c.id === cible.id);
      if (nouvelleCarte && boardPlayer2.length < 7) {
        jouerCarteDepuisDeck(nouvelleCarte);
      }     
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

    const marins = crocs.filter(c => c.sousFamille === "Marin").length;


    const terrestres = crocs.filter(c => c.sousFamille === "Terrestre").length;
    const cibleSousType = marins >= terrestres ? "Marin" : "Terrestre";

  
    if (crocs.length === 0) {
      console.log("🛑 Aucun Croc-Noir sur le board. IA passe au plan B");
    }
    let gold = goldPlayer2
    while (gold >= 3) {
      // 🔎 Essayer de trouver une carte Croc-Noir de la sous-famille dominante
      await sleep(1500); // (optionnel) délai de sécurité
      console.log("le shop", shopCards)
      let carte = shopCards.find(c => c.famille === "Croc-Noir" && c.sousFamille === cibleSousType);
      
  
      if (!carte) {
        console.log("🔁 Pas de carte Croc-Noir sous-type en shop, actualisation...");
        let newShop = actualiserBoutiqueIA({
          lvlTavernePlayer2, setShopCards: setShopCards, goldPlayer2: gold, actualPlayer: 2, setGoldPlayer2
        });
        shopCards = newShop
        await sleep(1000);

        gold = gold -1

        continue; // Reboucle sur nouveau shop
      }
      
      // ✅ On a trouvé une carte compatible
      console.log(`🛒 Achat de ${carte.nom}`);
      await sleep(800);
      acheterCarte({
        card: carte,
        goldPlayer2: gold,
        setGoldPlayer2,
        deckPlayer2,
        setDeckPlayer2,
        shopCards,
        setShopCards,
        lvlTavernePlayer2,
        actualPlayer: 2
      });

      gold = gold -3
      
      if(marins > terrestres && carte.sousFamille === "Marin"){
        carte.bivalenceMarinEffect = true
      }
      if(marins > terrestres && carte.sousFamille === "Terrestre"){
        carte.bivalenceTerrestreEffect = false
        if(carte.nom === "Tor'Grag des Profondeurs"){
          carte.furieUse = true
          carte.provocationUse = false
        }
      }
      if(marins < terrestres && carte.sousFamille === "Marin"){
        carte.bivalenceMarinEffect = false
      }
      if(marins < terrestres && carte.sousFamille === "Terrestre"){
        carte.bivalenceTerrestreEffect = true
      }
      if(marins === terrestres && carte.sousFamille === "Marin"){
        carte.bivalenceMarinEffect = true
      }
      if(marins === terrestres && carte.sousFamille === "Terrestre"){
        carte.bivalenceTerrestreEffect = true
      }
      if(carte.bivalence){
        carte.bivalence(boardPlayer2)
        // Faire réagir les autres cartes à l’arrivée de celle-ci
        boardPlayer2.forEach(c => {
            if (c !== carte && c.bivalence) {
                c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
            }
        });
      }else{
        // Faire réagir les autres cartes à l’arrivée de celle-ci
        boardPlayer2.forEach(c => {
            if (c !== carte && c.bivalence) {
                c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
            }
        });
      }
      if(carte.criDeGuerre){
        carte.criDeGuerre(boardPlayer2)
      }
      if(carte.criDeGuerreUnique){
        let cible = boardPlayer2[Math.floor(Math.random() * boardPlayer2.length)];
        carte.criDeGuerreUnique(cible);
      }
      if(carte.aura){
        carte.aura(boardPlayer2)
      }
      if(carte.auraUnique){
        let auraPresent = boardPlayer2.findIndex(carte => carte.aura)
              
        if (auraPresent >= 0){
            let carteAura = boardPlayer2.find(carte => carte.aura)
            carteAura.auraUnique(carte)
        }
      }
      if(carte.effetDeMass){
        carte.effetDeMass(carte, boardPlayer2)
      }
      console.log("test",marins,terrestres)
      // 🧩 Poser sur board si possible
      await sleep(1000);
      const deck = [...deckPlayer2, carte];
      if (deck.length > 0 && boardPlayer2.length < 7) {
        const carteAPoser = deck.find(c => c.id === carte.id);
        if (carteAPoser) {
          jouerCarteDepuisDeck(carteAPoser);
        }
      }
      const marinsB = boardPlayer2.filter(c => c.sousFamille === "Marin").length;


      const terrestresB = boardPlayer2.filter(c => c.sousFamille === "Terrestre").length;
      console.log("test",marinsB,terrestresB)
      break; // ✅ Ne faire qu'un achat ce tour-là
    }
    
    await sleep(1000);
    // 🔻 Si toujours pas de Croc-Noir sous-famille => fallback
    if (gold >= 3) {
      const fallbackCrocs = shopCards.filter(c => c.famille === "Croc-Noir");
      const carteFallback = fallbackCrocs[0] || shopCards.sort((a, b) => b.atk - a.atk)[0];
  
      if (carteFallback) {
        console.log(`⚠️ Fallback IA : achat ${carteFallback.nom}`);
        await sleep(800);
        acheterCarte({
          card: carteFallback,
          goldPlayer2: gold,
          setGoldPlayer2,
          deckPlayer2,
          setDeckPlayer2,
          shopCards,
          setShopCards,
          lvlTavernePlayer2,
          actualPlayer: 2
        });

        gold = gold -3

        if(marins > terrestres && carteFallback.sousFamille === "Marin"){
          carteFallback.bivalenceMarinEffect = true
        }
        if(marins > terrestres && carteFallback.sousFamille === "Terrestre"){
          carteFallback.bivalenceTerrestreEffect = false
        }
        if(marins < terrestres && carteFallback.sousFamille === "Marin"){
          carteFallback.bivalenceMarinEffect = false
        }
        if(marins < terrestres && carteFallback.sousFamille === "Terrestre"){
          carteFallback.bivalenceTerrestreEffect = true
        }
        if(marins === terrestres && carteFallback.sousFamille === "Marin"){
          carteFallback.bivalenceMarinEffect = true
        }
        if(marins === terrestres && carteFallback.sousFamille === "Terrestre"){
          carteFallback.bivalenceTerrestreEffect = true
        }
        if(carteFallback.bivalence){
          carteFallback.bivalence(boardPlayer2)
          // Faire réagir les autres cartes à l’arrivée de celle-ci
          boardPlayer2.forEach(c => {
              if (c !== carteFallback && c.bivalence) {
                  c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
              }
          });
        }else{
          // Faire réagir les autres cartes à l’arrivée de celle-ci
          boardPlayer2.forEach(c => {
              if (c !== carteFallback && c.bivalence) {
                  c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
              }
          });
        }
        if(carteFallback.criDeGuerre){
          carteFallback.criDeGuerre(boardPlayer2)
        }
        if(carteFallback.criDeGuerreUnique){
          let cible = boardPlayer2[Math.floor(Math.random() * boardPlayer2.length)];
          carteFallback.criDeGuerreUnique(cible);
        }
        if(carteFallback.aura){
          carteFallback.aura(boardPlayer2)
        }
        if(carteFallback.auraUnique){
          let auraPresent = boardPlayer2.findIndex(carte => carte.aura)
                
          if (auraPresent >= 0){
              let carteAura = boardPlayer2.find(carte => carte.aura)
              carteAura.auraUnique(carteFallback)
          }
        }
        if(carteFallback.effetDeMass){
          carteFallback.effetDeMass(carteFallback, boardPlayer2)
        }
        console.log("test",marins,terrestres)
        await sleep(1000);
        const deck = [...deckPlayer2, carteFallback];
        if (deck.length > 0 && boardPlayer2.length < 7) {
          const carteAPoser = deck.find(c => c.id === carteFallback.id);
          if (carteAPoser) {
            jouerCarteDepuisDeck(carteAPoser);
          }
        }
        if(carteFallback.sousFamille === "Marin"){
          marins = marins + 1
        }
        if(carteFallback.sousFamille === "Terrestre"){
          terrestres = terrestres + 1
        }
        await sleep(1000);
        console.log("test",marins,terrestres)
      }
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
      await sleep(1500); // (optionnel) délai de sécurité
      let carte = shopCards.find(c => c.famille === "Croc-Noir" && c.sousFamille === cibleSousType);
      if (!carte) {
        console.log("🔁 Pas de carte Croc-Noir sous-type en shop, actualisation...");

        let newShop = actualiserBoutiqueIA({
            lvlTavernePlayer2, setShopCards: setShopCards, goldPlayer2: gold, actualPlayer: 2, setGoldPlayer2
        });
        shopCards = newShop
        
        await sleep(2000);

        gold = gold -1
        continue; // Reboucle sur nouveau shop
      }
      // ✅ On a trouvé une carte compatible
      console.log(`🛒 Achat de ${carte.nom}`);
      await sleep(800);
      acheterCarte({
        card: carte,
        goldPlayer2: gold,
        setGoldPlayer2,
        deckPlayer2,
        setDeckPlayer2,
        shopCards,
        setShopCards,
        lvlTavernePlayer2,
        actualPlayer: 2
      });
      shopCards = shopCards.filter(c => c !== carte)
      gold = gold -3  

      if(marins > terrestres && carte.sousFamille === "Marin"){
        carte.bivalenceMarinEffect = true
      }
      if(marins > terrestres && carte.sousFamille === "Terrestre"){
        carte.bivalenceTerrestreEffect = false
      }
      if(marins < terrestres && carte.sousFamille === "Marin"){
        carte.bivalenceMarinEffect = false
      }
      if(marins < terrestres && carte.sousFamille === "Terrestre"){
        carte.bivalenceTerrestreEffect = true
      }
      if(marins === terrestres && carte.sousFamille === "Marin"){
        carte.bivalenceMarinEffect = true
      }
      if(marins === terrestres && carte.sousFamille === "Terrestre"){
        carte.bivalenceTerrestreEffect = true
      }
      if(carte.bivalence){
        carte.bivalence(boardPlayer2)
        // Faire réagir les autres cartes à l’arrivée de celle-ci
        boardPlayer2.forEach(c => {
            if (c !== carte && c.bivalence) {
                c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
            }
        });
      }else{
        // Faire réagir les autres cartes à l’arrivée de celle-ci
        boardPlayer2.forEach(c => {
            if (c !== carte && c.bivalence) {
                c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
            }
        });
      }
      if(carte.criDeGuerre){
        carte.criDeGuerre(boardPlayer2)
      }
      if(carte.criDeGuerreUnique){
        let cible = boardPlayer2[Math.floor(Math.random() * boardPlayer2.length)];
        carte.criDeGuerreUnique(cible);
      }
      if(carte.aura){
        carte.aura(boardPlayer2)
      }
      if(carte.auraUnique){
        let auraPresent = boardPlayer2.findIndex(carte => carte.aura)
              
        if (auraPresent >= 0){
            let carteAura = boardPlayer2.find(carte => carte.aura)
            carteAura.auraUnique(carte)
        }
      }
      if(carte.effetDeMass){
        carte.effetDeMass(carte, boardPlayer2)
      }
      // 🧩 Poser sur board si possible
      await sleep(1000);
      const deck = [...deckPlayer2, carte];
      if (deck.length > 0 && boardPlayer2.length < 7) {
        const carteAPoser = deck.find(c => c.id === carte.id);
        
        if (carteAPoser) {
          jouerCarteDepuisDeck(carteAPoser);
          boardPlayer2.push(carteAPoser)
        }
        
       
      }  
    }
    await sleep(1000);
    // 🔻 Si toujours pas de Croc-Noir sous-famille => fallback
    if (gold >= 3) {
      const fallbackCrocs = shopCards.filter(c => c.famille === "Croc-Noir");
      const carteFallback = fallbackCrocs[0] || shopCards.sort((a, b) => b.atk - a.atk)[0];
  
      if (carteFallback) {
        console.log(`⚠️ Fallback IA : achat ${carteFallback.nom}`);
        await sleep(800);
        acheterCarte({
          card: carteFallback,
          goldPlayer2: gold,
          setGoldPlayer2,
          deckPlayer2,
          setDeckPlayer2,
          shopCards,
          setShopCards,
          lvlTavernePlayer2,
          actualPlayer: 2
        });
        gold = gold - 3
        if(marins > terrestres && carteFallback.sousFamille === "Marin"){
          carteFallback.bivalenceMarinEffect = true
        }
        if(marins > terrestres && carteFallback.sousFamille === "Terrestre"){
          carteFallback.bivalenceTerrestreEffect = false
        }
        if(marins < terrestres && carteFallback.sousFamille === "Marin"){
          carteFallback.bivalenceMarinEffect = false
        }
        if(marins < terrestres && carteFallback.sousFamille === "Terrestre"){
          carteFallback.bivalenceTerrestreEffect = true
        }
        if(marins === terrestres && carteFallback.sousFamille === "Marin"){
          carteFallback.bivalenceMarinEffect = true
        }
        if(marins === terrestres && carteFallback.sousFamille === "Terrestre"){
          carteFallback.bivalenceTerrestreEffect = true
        }
        if(carteFallback.bivalence){
          carteFallback.bivalence(boardPlayer2)
          // Faire réagir les autres cartes à l’arrivée de celle-ci
          boardPlayer2.forEach(c => {
              if (c !== carteFallback && c.bivalence) {
                  c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
              }
          });
        }else{
          // Faire réagir les autres cartes à l’arrivée de celle-ci
          boardPlayer2.forEach(c => {
              if (c !== carteFallback && c.bivalence) {
                  c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
              }
          });
        }
        if(carteFallback.criDeGuerre){
          carteFallback.criDeGuerre(boardPlayer2)
        }
        if(carteFallback.criDeGuerreUnique){
          let cible = boardPlayer2[Math.floor(Math.random() * boardPlayer2.length)];
          carteFallback.criDeGuerreUnique(cible);
        }
        if(carteFallback.aura){
          carteFallback.aura(boardPlayer2)
        }
        if(carteFallback.auraUnique){
          let auraPresent = boardPlayer2.findIndex(carte => carte.aura)
                
          if (auraPresent >= 0){
              let carteAura = boardPlayer2.find(carte => carte.aura)
              carteAura.auraUnique(carteFallback)
          }
        }
        if(carteFallback.effetDeMass){
          carteFallback.effetDeMass(carteFallback, boardPlayer2)
        }
        

        await sleep(1000);
        const deck = [...deckPlayer2, carteFallback];
        if (deck.length > 0 && boardPlayer2.length < 7) {
          const carteAPoser = deck.find(c => c.id === carteFallback.id);
          if (carteAPoser) {
            jouerCarteDepuisDeck(carteAPoser);
            boardPlayer2.push(carteAPoser)
          }
        }
      }
    }
    setTourIa(tourIa + 1);
  }
  if (tourIa === 5){
    await sleep(1500); // petite pause de réflexion
  
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
        acheterCarte({
          card: carteFallback,
          goldPlayer2,
          setGoldPlayer2,
          deckPlayer2,
          setDeckPlayer2,
          shopCards,
          setShopCards,
          lvlTavernePlayer2,
          actualPlayer: 2
        });

        if(marins > terrestres && carteFallback.sousFamille === "Marin"){
          carteFallback.bivalenceMarinEffect = true
        }
        if(marins > terrestres && carteFallback.sousFamille === "Terrestre"){
          carteFallback.bivalenceTerrestreEffect = false
        }
        if(marins < terrestres && carteFallback.sousFamille === "Marin"){
          carteFallback.bivalenceMarinEffect = false
        }
        if(marins < terrestres && carteFallback.sousFamille === "Terrestre"){
          carteFallback.bivalenceTerrestreEffect = true
        }
        if(marins === terrestres && carteFallback.sousFamille === "Marin"){
          carteFallback.bivalenceMarinEffect = true
        }
        if(marins === terrestres && carteFallback.sousFamille === "Terrestre"){
          carteFallback.bivalenceTerrestreEffect = true
        }
        if(carteFallback.bivalence){
          carteFallback.bivalence(boardPlayer2)
          // Faire réagir les autres cartes à l’arrivée de celle-ci
          boardPlayer2.forEach(c => {
              if (c !== carteFallback && c.bivalence) {
                  c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
              }
          });
        }else{
          // Faire réagir les autres cartes à l’arrivée de celle-ci
          boardPlayer2.forEach(c => {
              if (c !== carteFallback && c.bivalence) {
                  c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
              }
          });
        }
        if(carteFallback.criDeGuerre){
          carteFallback.criDeGuerre(boardPlayer2)
        }
        if(carteFallback.criDeGuerreUnique){
          let cible = boardPlayer2[Math.floor(Math.random() * boardPlayer2.length)];
          carteFallback.criDeGuerreUnique(cible);
        }
        if(carteFallback.aura){
          carteFallback.aura(boardPlayer2)
        }
        if(carteFallback.auraUnique){
          let auraPresent = boardPlayer2.findIndex(carte => carte.aura)
                
          if (auraPresent >= 0){
              let carteAura = boardPlayer2.find(carte => carte.aura)
              carteAura.auraUnique(carteFallback)
          }
        }
        if(carteFallback.effetDeMass){
          carteFallback.effetDeMass(carteFallback, boardPlayer2)
        }

        await sleep(1000);
        const deck = [...deckPlayer2, carteFallback];
        if (deck.length > 0 && boardPlayer2.length < 7) {
          const carteAPoser = deck.find(c => c.id === carteFallback.id);
          if (carteAPoser) {
            jouerCarteDepuisDeck(carteAPoser);
            boardPlayer2.push(carteAPoser)
          }
        }
      }
    }else{
      // ✅ On a trouvé une carte compatible
      console.log(`🛒 Achat de ${carte.nom}`);
      await sleep(800);
      acheterCarte({
        card: carte,
        goldPlayer2,
        setGoldPlayer2,
        deckPlayer2,
        setDeckPlayer2,
        shopCards,
        setShopCards,
        lvlTavernePlayer2,
        actualPlayer: 2
      });
      shopCards = shopCards.filter(c => c !== carte)
      if(marins > terrestres && carte.sousFamille === "Marin"){
        carte.bivalenceMarinEffect = true
      }
      if(marins > terrestres && carte.sousFamille === "Terrestre"){
        carte.bivalenceTerrestreEffect = false
      }
      if(marins < terrestres && carte.sousFamille === "Marin"){
        carte.bivalenceMarinEffect = false
      }
      if(marins < terrestres && carte.sousFamille === "Terrestre"){
        carte.bivalenceTerrestreEffect = true
      }
      if(marins === terrestres && carte.sousFamille === "Marin"){
        carte.bivalenceMarinEffect = true
      }
      if(marins === terrestres && carte.sousFamille === "Terrestre"){
        carte.bivalenceTerrestreEffect = true
      }
      if(carte.bivalence){
        carte.bivalence(boardPlayer2)
        // Faire réagir les autres cartes à l’arrivée de celle-ci
        boardPlayer2.forEach(c => {
            if (c !== carte && c.bivalence) {
                c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
            }
        });
      }else{
        // Faire réagir les autres cartes à l’arrivée de celle-ci
        boardPlayer2.forEach(c => {
            if (c !== carte && c.bivalence) {
                c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
            }
        });
      }
      if(carte.criDeGuerre){
        carte.criDeGuerre(boardPlayer2)
      }
      if(carte.criDeGuerreUnique){
        let cible = boardPlayer2[Math.floor(Math.random() * boardPlayer2.length)];
        carte.criDeGuerreUnique(cible);
      }
      if(carte.aura){
        carte.aura(boardPlayer2)
      }
      if(carte.auraUnique){
        let auraPresent = boardPlayer2.findIndex(carte => carte.aura)
              
        if (auraPresent >= 0){
            let carteAura = boardPlayer2.find(carte => carte.aura)
            carteAura.auraUnique(carte)
        }
      }
      if(carte.effetDeMass){
        carte.effetDeMass(carte, boardPlayer2)
      }

      // 🧩 Poser sur board si possible
      await sleep(1000);
      const deck = [...deckPlayer2, carte];
      if (deck.length > 0 && boardPlayer2.length < 7) {
        const carteAPoser = deck.find(c => c.id === carte.id);
        
        if (carteAPoser) {
          jouerCarteDepuisDeck(carteAPoser);
          boardPlayer2.push(carteAPoser)
        }
        
       
      }
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
      await sleep(1500); // (optionnel) délai de sécurité
      let carte = shopCards.find(c => c.famille === "Croc-Noir" && c.sousFamille === cibleSousType);
      if (!carte) {
        console.log("🔁 Pas de carte Croc-Noir sous-type en shop, actualisation...");

        let newShop = actualiserBoutiqueIA({
            lvlTavernePlayer2, setShopCards: setShopCards, goldPlayer2: gold, actualPlayer: 2, setGoldPlayer2
        });
        shopCards = newShop
        
        await sleep(2000);

        gold = gold -1
        continue; // Reboucle sur nouveau shop
      }
      // ✅ On a trouvé une carte compatible
      console.log(`🛒 Achat de ${carte.nom}`);
      await sleep(800);
      acheterCarte({
        card: carte,
        goldPlayer2: gold,
        setGoldPlayer2,
        deckPlayer2,
        setDeckPlayer2,
        shopCards,
        setShopCards,
        lvlTavernePlayer2,
        actualPlayer: 2
      });
      shopCards = shopCards.filter(c => c !== carte)
      gold = gold -3  
      if(marins > terrestres && carte.sousFamille === "Marin"){
        carte.bivalenceMarinEffect = true
      }
      if(marins > terrestres && carte.sousFamille === "Terrestre"){
        carte.bivalenceTerrestreEffect = false
      }
      if(marins < terrestres && carte.sousFamille === "Marin"){
        carte.bivalenceMarinEffect = false
      }
      if(marins < terrestres && carte.sousFamille === "Terrestre"){
        carte.bivalenceTerrestreEffect = true
      }
      if(marins === terrestres && carte.sousFamille === "Marin"){
        carte.bivalenceMarinEffect = true
      }
      if(marins === terrestres && carte.sousFamille === "Terrestre"){
        carte.bivalenceTerrestreEffect = true
      }
      if(carte.bivalence){
        carte.bivalence(boardPlayer2)
        // Faire réagir les autres cartes à l’arrivée de celle-ci
        boardPlayer2.forEach(c => {
            if (c !== carte && c.bivalence) {
                c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
            }
        });
      }else{
        // Faire réagir les autres cartes à l’arrivée de celle-ci
        boardPlayer2.forEach(c => {
            if (c !== carte && c.bivalence) {
                c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
            }
        });
      }
      if(carte.criDeGuerre){
        carte.criDeGuerre(boardPlayer2)
      }
      if(carte.criDeGuerreUnique){
        let cible = boardPlayer2[Math.floor(Math.random() * boardPlayer2.length)];
        carte.criDeGuerreUnique(cible);
      }
      if(carte.aura){
        carte.aura(boardPlayer2)
      }
      if(carte.auraUnique){
        let auraPresent = boardPlayer2.findIndex(carte => carte.aura)
              
        if (auraPresent >= 0){
            let carteAura = boardPlayer2.find(carte => carte.aura)
            carteAura.auraUnique(carte)
        }
      }
      if(carte.effetDeMass){
        carte.effetDeMass(carte, boardPlayer2)
      }
      // 🧩 Poser sur board si possible
      await sleep(1000);
      const deck = [...deckPlayer2, carte];
      if (deck.length > 0 && boardPlayer2.length < 7) {
        const carteAPoser = deck.find(c => c.id === carte.id);
        
        if (carteAPoser) {
          jouerCarteDepuisDeck(carteAPoser);
          boardPlayer2.push(carteAPoser)
        }
        
       
      }  
    }
    await sleep(1000);
    // 🔻 Si toujours pas de Croc-Noir sous-famille => fallback
    if (gold >= 3) {
      const fallbackCrocs = shopCards.filter(c => c.famille === "Croc-Noir");
      const carteFallback = fallbackCrocs[0] || shopCards.sort((a, b) => b.atk - a.atk)[0];
  
      if (carteFallback) {
        console.log(`⚠️ Fallback IA : achat ${carteFallback.nom}`);
        await sleep(800);
        acheterCarte({
          card: carteFallback,
          goldPlayer2: gold,
          setGoldPlayer2,
          deckPlayer2,
          setDeckPlayer2,
          shopCards,
          setShopCards,
          lvlTavernePlayer2,
          actualPlayer: 2
        });
        gold = gold - 3

        if(marins > terrestres && carteFallback.sousFamille === "Marin"){
          carteFallback.bivalenceMarinEffect = true
        }
        if(marins > terrestres && carteFallback.sousFamille === "Terrestre"){
          carteFallback.bivalenceTerrestreEffect = false
        }
        if(marins < terrestres && carteFallback.sousFamille === "Marin"){
          carteFallback.bivalenceMarinEffect = false
        }
        if(marins < terrestres && carteFallback.sousFamille === "Terrestre"){
          carteFallback.bivalenceTerrestreEffect = true
        }
        if(marins === terrestres && carteFallback.sousFamille === "Marin"){
          carteFallback.bivalenceMarinEffect = true
        }
        if(marins === terrestres && carteFallback.sousFamille === "Terrestre"){
          carteFallback.bivalenceTerrestreEffect = true
        }
        if(carteFallback.bivalence){
          carteFallback.bivalence(boardPlayer2)
          // Faire réagir les autres cartes à l’arrivée de celle-ci
          boardPlayer2.forEach(c => {
              if (c !== carteFallback && c.bivalence) {
                  c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
              }
          });
        }else{
          // Faire réagir les autres cartes à l’arrivée de celle-ci
          boardPlayer2.forEach(c => {
              if (c !== carteFallback && c.bivalence) {
                  c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
              }
          });
        }
        if(carteFallback.criDeGuerre){
          carteFallback.criDeGuerre(boardPlayer2)
        }
        if(carteFallback.criDeGuerreUnique){
          let cible = boardPlayer2[Math.floor(Math.random() * boardPlayer2.length)];
          carteFallback.criDeGuerreUnique(cible);
        }
        if(carteFallback.aura){
          carteFallback.aura(boardPlayer2)
        }
        if(carteFallback.auraUnique){
          let auraPresent = boardPlayer2.findIndex(carte => carte.aura)
                
          if (auraPresent >= 0){
              let carteAura = boardPlayer2.find(carte => carte.aura)
              carteAura.auraUnique(carteFallback)
          }
        }

        if(carteFallback.effetDeMass){
          carteFallback.effetDeMass(carteFallback, boardPlayer2)
        }
        await sleep(1000);
        const deck = [...deckPlayer2, carteFallback];
        if (deck.length > 0 && boardPlayer2.length < 7) {
          const carteAPoser = deck.find(c => c.id === carteFallback.id);
          if (carteAPoser) {
            jouerCarteDepuisDeck(carteAPoser);
            boardPlayer2.push(carteAPoser)
          }
        }
      }
    }
    setTourIa(tourIa + 1);
  }
}