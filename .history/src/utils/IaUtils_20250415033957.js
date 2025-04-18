import { sleep } from "@/utils/combatUtils1v1";
import { acheterCarte, lvlUpTaverne } from "@/utils/shopUtils1v1";

// TourIA avec logique évolutive par tour
export async function TourIa({
  tourIa,
  setTourIa,
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
  jouerCarteDepuisDeck
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
}