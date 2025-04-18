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

  
      // 🧩 Poser sur board si possible
      await sleep(1000);
      const deck = [...deckPlayer2, carte];
      if (deck.length > 0 && boardPlayer2.length < 7) {
        const carteAPoser = deck.find(c => c.id === carte.id);
        if (carteAPoser) {
          jouerCarteDepuisDeck(carteAPoser);
        }
      }
  
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

  
        await sleep(1000);
        const deck = [...deckPlayer2, carteFallback];
        if (deck.length > 0 && boardPlayer2.length < 7) {
          const carteAPoser = deck.find(c => c.id === carteFallback.id);
          if (carteAPoser) {
            jouerCarteDepuisDeck(carteAPoser);
          }
        }
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
        console.log(shopCards)
        let newShop = actualiserBoutiqueIA({
            lvlTavernePlayer2, setShopCards: setShopCards, goldPlayer2: gold, actualPlayer: 2, setGoldPlayer2
        });
        shopCards = newShop
        
        await sleep(2000);
        console.log(shopCards)
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
    console.log("verif taverne avant lvlup", lvlTavernePlayer2,);
    console.log("verif or avant lvlup", goldPlayer2,);
    console.log("verif shop avant lvlup", shopCards,);
    lvlUpTaverne({
      goldPlayer2,
      lvlTavernePlayer2,
      setGoldPlayer2,
      setLvlTavernePlayer2,
      setShopCards,
      actualPlayer: 2,
    });
    console.log("verif taverne apres lvlup", lvlTavernePlayer2,);
    console.log("verif or apres lvlup", goldPlayer2,);
    console.log("verif shop apres lvlup", shopCards,);
  }
}