// src/utils/shopUtils.js
import { cards, getUniqueId } from "@/data/cardsData";


export const coutLvlTaverne = {
  1: 5,
  2: 7,
  3: 8,
  4: 10,
  5: 10,
};

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

export const lvlUpTaverne = ({ gold, lvlTaverne, setGold, setLvlTaverne, setShopCards }) => {
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
};

export const acheterCarte = ({ card, gold, setGold, deck, setDeck, shopCards, setShopCards }) => {
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
};
export const acheterCarteIA = ({ cards, goldIA, setGoldIA, boardIA, setboardIA }) => {
  if (goldIA < 3) {

    return;
  }
  if (boardIA.length >= 7) {

    return;
  }
  let carteAcheteIA = cards[0];

  setGoldIA(goldIA - 3);
  setboardIA([...boardIA, clonerCarte({carteAcheteIA, camp: "ia"})]);
};

export const actualiserBoutique = ({ lvlTaverne, setShopCards, gold, setGold  }) => {
  if (gold < 1) {
    alert("💰 Pas assez d'or !");
    return;
  }
  const tirage = getCartesPourShop(lvlTaverne);
  const cartes = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne)).map(carte => clonerCarte({ carte, camp: "shop" }));;
  setShopCards(cartes);
  setGold(gold - 1)
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
      baseHp: carte.hp, // PV de base
      baseAtk: carte.atk, // ATK de base
      buffHp: 0, // Valeur des buffs HP reçus
      buffAtk: 0, // Valeur des buffs ATK reçus
      atkDispo: true,
      criDeGuerre: carte.criDeGuerre ? (cartesBoard) => carte.criDeGuerre(cartesBoard) : null,
      poteLa: carte.poteLa ? (cartesBoard) => carte.poteLa(cartesBoard) : null,
      sangNoble: carte.sangNoble ? (cartesBoard) => carte.sangNoble(cartesBoard) : null,
      effetDeCouple: carte.effetDeCouple ? { ...carte.effetDeCouple } : null,
      effetApplique: carte.effetApplique || false, // ✅ Conserve l'état de l'effet
      camp: camp, // ✅ Ajout du camp
      famille: carte.famille
  };
}



