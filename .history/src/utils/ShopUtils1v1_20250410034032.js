import { cards, getUniqueId, getBoardPosition } from "@/data/cardsData";
import { degatsAdj, oneTicDebutCombat } from "./mecaUtils";

export const getCartesPourShop = (niveauTaverne) => {
  return cards.filter((c) => c.lvl <= niveauTaverne);
};

export const getNombreCartesShop = (lvl) => {
  if (lvl === 1) return 3;
  if (lvl === 2 || lvl === 3) return 4;
  if (lvl === 4 || lvl === 5) return 5;
  return 6;
};

export const getCartesAleatoires = (liste, nombre) => {
  return [...liste].sort(() => 0.5 - Math.random()).slice(0, nombre);
};

export const clonerCarte = ({ carte, camp }) => {
  return {
      id: getUniqueId(), // Génère un ID unique
      nom: carte.nom,
      hp: carte.hp, // PV actuels
      atk: carte.atk, // ATK actuelle
      img: carte.img,
      imgMinia: carte.imgMinia,
      texte: carte.texte,
      baseHp: carte.baseHp !== undefined ? carte.baseHp : carte.hp,
      baseAtk: carte.baseAtk !== undefined ? carte.baseAtk : carte.atk,
      buffHp: carte.buffHp !== undefined ? carte.buffHp : 0,
      buffAtk: carte.buffAtk !== undefined ? carte.buffAtk : 0,
      buffHpBivalence: carte.buffHpBivalence !== undefined ? carte.buffHpBivalence : 0,
      buffAtkBivalence: carte.buffAtkBivalence !== undefined ? carte.buffAtkBivalence : 0,
      bivalenceEffect: carte.bivalenceEffect !== undefined ? carte.bivalenceEffect : false,
      atkDispo: false,
      auraEffect: carte.auraEffect !== undefined ? carte.auraEffect : false,
      criDeGuerre: carte.criDeGuerre ? (cartesBoard) => carte.criDeGuerre(cartesBoard) : null,
      criDeGuerreUnique: carte.criDeGuerreUnique ? (carteAleatoire) => carte.criDeGuerreUnique(carteAleatoire) : null,
      poteLa: carte.poteLa ? (cartesBoard) => carte.poteLa(cartesBoard) : null,
      sangNoble: carte.sangNoble ? (cartesBoard) => carte.sangNoble(cartesBoard) : null,
      aura: carte.aura ? (cartesBoard) => carte.aura(cartesBoard) : null,
      auraSell: carte.auraSell ? (cartesBoard) => carte.auraSell(cartesBoard) : null,
      auraUnique: carte.auraUnique ? (cartesBoard) => carte.auraUnique(cartesBoard) : null,
      effetDeMass: carte.effetDeMass || null,
      aoe: carte.aoe ? (cartesBoard) => carte.aoe(cartesBoard) : null,
      oneTicDebutCombat: carte.oneTicDebutCombat ? (carteCible, carteSource) => carte.oneTicDebutCombat(carteCible, carteSource) : null,
      bivalence: carte.bivalence ? (cartesBoard) => carte.bivalence(cartesBoard) : null,
      bivalenceSell: carte.bivalenceSell ? (cartesBoard) => carte.bivalenceSell(cartesBoard) : null,
      deathTrigger: carte.deathTrigger ? (mortCarte, cartesBoard, self) => carte.deathTrigger(mortCarte, cartesBoard, self) : null,
      effetDeCouple: carte.effetDeCouple ? { ...carte.effetDeCouple } : null,
      effetApplique: carte.effetApplique || false, // ✅ Conserve l'état de l'effet
      camp: camp, // ✅ Ajout du camp
      famille: carte.famille,
      sousFamille: carte.sousFamille !== undefined ? carte.sousFamille : null,
      bivalenceMarinEffect: carte.bivalenceMarinEffect !== undefined ? carte.bivalenceMarinEffect : false,
      bivalenceTerrestreEffect: carte.bivalenceTerrestreEffect !== undefined ? carte.bivalenceTerrestreEffect : false,
      piocherCarte: carte.piocherCarte !== undefined ? carte.piocherCarte : false,
      piocherCarteSpe: carte.piocherCarteSpe !== undefined ? carte.piocherCarteSpe : false,
      boardPosition: carte.boardPosition !== undefined ? carte.boardPosition : carte.boardPosition,
      carteSpe: carte.carteSpe !== undefined ? carte.carteSpe : null,
      bivalenceSources : carte.bivalenceSources !== undefined ? carte.bivalenceSources : [] ,
      provocation: carte.provocation !== undefined ? carte.provocation : false,
      furie: carte.furie !== undefined ? carte.furie : false,
      provocationUse: carte.provocationUse !== undefined ? carte.provocationUse : false,
      furieUse: carte.furieUse !== undefined ? carte.furieUse : false,
      degatsAdj: carte.degatsAdj !== undefined ? carte.degatsAdj : false,
      
  };
}

export const coutLvlTaverne = {
  1: 5,
  2: 7,
  3: 8,
  4: 10,
  5: 10,
};
export const coutLvlTavernePlayer2 = {
  1: 5,
  2: 7,
  3: 8,
  4: 10,
  5: 10,
};

export const actualiserBoutique = ({ lvlTaverne, setShopCards, gold, setGold, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2 }) => {
  if(actualPlayer === 1){
    if (gold < 1) {
      alert("💰 Pas assez d'or !");
      return;
    }
    const tirage = getCartesPourShop(lvlTaverne);
    const cartes = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne)).map(carte => clonerCarte({ carte, camp: "shop" }));;
    setShopCards(cartes);
    setGold(gold - 1)
  }
  if(actualPlayer === 2){
    if (goldPlayer2 < 1) {
      alert("💰 Pas assez d'or !");
      return;
    }
    const tirage = getCartesPourShop(lvlTavernePlayer2);
    const cartes = getCartesAleatoires(tirage, getNombreCartesShop(lvlTavernePlayer2)).map(carte => clonerCarte({ carte, camp: "shop" }));;
    setShopCards(cartes);
    setGoldPlayer2(goldPlayer2 - 1)
  }

};

export const lvlUpTaverne = ({ gold, lvlTaverne, setGold, setLvlTaverne, setShopCards, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2,setLvlTavernePlayer2 }) => {
  
  if(actualPlayer === 1){
    const cout = coutLvlTaverne[lvlTaverne];
    if (gold < cout) {
      alert("💰 Pas assez d'or pour monter de niveau !");
      return;
    }
  
    if (lvlTaverne >= 6) {
      alert("🔒 Niveau max atteint !");
      return;
    }
  
    const nouveauLvl = lvlTaverne + 1;
    setGold(gold - cout);
    setLvlTaverne(nouveauLvl);
  
    const tirage = getCartesPourShop(nouveauLvl);
    const cartes = getCartesAleatoires(tirage, getNombreCartesShop(nouveauLvl))
      .map(carte => clonerCarte({ carte, camp: "shop" }));
  
    setShopCards(cartes);
  }
  if(actualPlayer === 2){
    const cout = coutLvlTavernePlayer2[lvlTavernePlayer2];
    if (goldPlayer2 < cout) {
      alert("💰 Pas assez d'or pour monter de niveau !");
      return;
    }
  
    if (lvlTavernePlayer2 >= 6) {
      alert("🔒 Niveau max atteint !");
      return;
    }
  
    const nouveauLvl = lvlTavernePlayer2 + 1;
    setGoldPlayer2(goldPlayer2 - cout);
    setLvlTavernePlayer2(nouveauLvl);
  
    const tirage = getCartesPourShop(nouveauLvl);
    const cartes = getCartesAleatoires(tirage, getNombreCartesShop(nouveauLvl))
      .map(carte => clonerCarte({ carte, camp: "shop" }));
  
    setShopCards(cartes);
  }

};

export const acheterCarte = ({ card, gold, setGold, deck, setDeck, shopCards, setShopCards, lvlTaverne, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2 }) => {
  if(actualPlayer === 1){
    if (gold < 3) {
      alert("💰 Pas assez d'or !");
      return;
    }
    if (deck.length >= 7) {
      alert("🛑 Board plein !");
      return;
    }
  
    setGold(gold - 3);
    setDeck([...deck, card]);
    setShopCards(shopCards.filter((c) => c.id !== card.id));
  }
  if(actualPlayer === 2){
    if (goldPlayer2 < 3) {
      alert("💰 Pas assez d'or !");
      return;
    }
    if (deckPlayer2.length >= 7) {
      alert("🛑 Board plein !");
      return;
    }
  
    setGoldPlayer2(goldPlayer2 - 3);
    setDeckPlayer2([...deckPlayer2, card]);
    setShopCards(shopCards.filter((c) => c.id !== card.id));
  }

};

