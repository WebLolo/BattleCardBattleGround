import { sleep } from '@/utils/combatUtils1v1';
import { acheterCarte } from "@/utils/shopUtils1v1";
export async function TourIa(goldPlayer2, setGoldPlayer2, shopCards, setShopCards, deckPlayer2, setDeckPlayer2) {
    console.log("🤖 Tour de l'IA");
  
    if (goldPlayer2 >= 3) {
      const meilleuresCartes = shopCards
        .filter(c => c.famille === "Croc-Noir")
        .sort((a, b) => b.atk - a.atk);
  
      const cible = meilleuresCartes[0] || shopCards.sort((a, b) => b.atk - a.atk)[0];
      
      if (!cible) return;
  
      // Simuler l’achat via drag & drop
      await sleep(500);
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
  
      await sleep(500);
      // Pose automatique si possible
      const deck = [...deckPlayer2];
      const board = [...boardPlayer2];
  
      if (deck.length > 0 && board.length < 7) {
        const carteAPoser = deck.find(c => c.id === cible.id);
        if (carteAPoser) {
          jouerCarteDepuisDeck(carteAPoser); // ton système actuel
        }
      }
    }
  }