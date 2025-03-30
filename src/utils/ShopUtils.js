// src/utils/shopUtils.js
import { cards, getUniqueId } from "@/data/cardsData";

let cartesEffetDeCoupleAppliqueIA = new Set();


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

export const acheterCarte = ({ card, gold, setGold, deck, setDeck, shopCards, setShopCards, lvlTaverne }) => {
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

export const random = (min, max) => {
  return min + Math.random() * (max - min);
}


export const acheterCarteIA = ({ cards, goldIA, setGoldIA, boardIA, setBoardIA }) => {
  if (goldIA < 3) {

    return;
  }
  if (boardIA.length >= 7) {

    return;
  }
  let rand = Math.round(random(0, cards.length))
  let carteAcheteIA = cards[rand];

  setGoldIA(prev => prev - 3);
  let carteAcheter =  clonerCarte({ carte: carteAcheteIA, camp: "ia" })

  if (carteAcheteIA.criDeGuerre) {
    console.log(`📢 Cri de guerre activé pour ${carteAcheteIA.nom}`);
    
    carteAcheteIA.criDeGuerre(boardIA); // Effet sur tout le board
  }

  if (carteAcheteIA.criDeGuerreUnique && boardIA.length > 0 ) {
    console.log(`🎯 Cri de guerre ciblé sur UNE seule carte pour ${carteAcheteIA.nom}`);
    let cible = boardIA[Math.floor(Math.random() * boardIA.length)];
    carteAcheteIA.criDeGuerreUnique(cible); // Effet sur tout le board
  }

  if (carteAcheteIA.sangNoble) {
    console.log(`📢 Sang Noble activé pour ${carteAcheteIA.nom}`);
    carteAcheteIA.sangNoble(boardIA)

  }
  if (carteAcheteIA.effetDeCouple){
    if (!carteAcheteIA.effetDeCouple || cartesEffetDeCoupleAppliqueIA.has(carteAcheteIA.id)) {
      
    }else{
      let partenaireTrouve = boardIA.find(c => c.nom === carteAcheteIA.effetDeCouple.partenaire);

      if (partenaireTrouve) {
          console.log(`💑 Effet de couple activé pour ${carteAcheteIA.nom} (partenaire : ${partenaireTrouve.nom})`);
    
          // 🆕 Appliquer l'effet UNIQUEMENT à la carte posée, pas à toutes
          carteAcheteIA.effetDeCouple.effet(boardIA);
    
          // 🔒 Marquer la carte comme ayant déjà appliqué son effet
          cartesEffetDeCoupleAppliqueIA.add(carteAcheteIA.id);
      }   
    }
  }
  if (carteAcheteIA.poteLa) {
    console.log(`📢 Pote la ! activé pour ${carteAcheteIA.nom}`);
    carteAcheteIA.poteLa(boardIA)

  }


  boardIA.push(carteAcheter)
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
      baseHp: carte.baseHp !== undefined ? carte.baseHp : carte.hp,
      baseAtk: carte.baseAtk !== undefined ? carte.baseAtk : carte.atk,
      buffHp: 0, // Valeur des buffs HP reçus
      buffAtk: 0, // Valeur des buffs ATK reçus
      atkDispo: true,
      criDeGuerre: carte.criDeGuerre ? (cartesBoard) => carte.criDeGuerre(cartesBoard) : null,
      criDeGuerreUnique: carte.criDeGuerreUnique ? (carteAleatoire) => carte.criDeGuerreUnique(carteAleatoire) : null,
      poteLa: carte.poteLa ? (cartesBoard) => carte.poteLa(cartesBoard) : null,
      sangNoble: carte.sangNoble ? (cartesBoard) => carte.sangNoble(cartesBoard) : null,
      effetDeCouple: carte.effetDeCouple ? { ...carte.effetDeCouple } : null,
      effetApplique: carte.effetApplique || false, // ✅ Conserve l'état de l'effet
      camp: camp, // ✅ Ajout du camp
      famille: carte.famille
  };
}



