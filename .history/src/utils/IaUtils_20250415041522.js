import { sleep } from "@/utils/combatUtils1v1";
import { acheterCarte, lvlUpTaverne, actualiserBoutique } from "@/utils/shopUtils1v1";

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
  
    // 🧠 Identifier la sous-famille dominante sur le board
    const crocs = boardPlayer2.filter(c => c.famille === "Croc-Noir");
    const marins = crocs.filter(c => c.sousType === "marin").length;
    const terrestres = crocs.filter(c => c.sousType === "terrestre").length;
    const cibleSousType = marins >= terrestres ? "marin" : "terrestre";
  
    if (crocs.length === 0) {
      console.log("🛑 Aucun Croc-Noir sur le board. IA passe au plan B");
    }
  
    let gold = goldPlayer2;
  
    while (gold >= 3) {
      // 🔎 Essayer de trouver une carte Croc-Noir de la sous-famille dominante
      let carte = shopCards.find(c => c.famille === "Croc-Noir" && c.sousType === cibleSousType);
  
      if (!carte) {
        console.log("🔁 Pas de carte Croc-Noir sous-type en shop, actualisation...");
        actualiserBoutique({
          lvlTaverne: lvlTavernePlayer2,
          setShopCards,
          gold,
          setGoldPlayer2: (g) => (gold = g),
          actualPlayer: 2
        });
        await sleep(1000);
        continue; // Reboucle sur nouveau shop
      }
  
      // ✅ On a trouvé une carte compatible
      console.log(`🛒 Achat de ${carte.nom}`);
      await sleep(800);
      acheterCarte({
        card: carte,
        goldPlayer2: gold,
        setGoldPlayer2: (g) => (gold = g),
        deckPlayer2,
        setDeckPlayer2,
        shopCards,
        setShopCards,
        lvlTavernePlayer2,
        actualPlayer: 2
      });
  
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
          setGoldPlayer2: (g) => (gold = g),
          deckPlayer2,
          setDeckPlayer2,
          shopCards,
          setShopCards,
          lvlTavernePlayer2,
          actualPlayer: 2
        });
  
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
}