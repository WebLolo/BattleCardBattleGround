// src/utils/shopUtils.js
import { cards } from "@/data/cardsData";

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
  setShopCards(getCartesAleatoires(tirage, getNombreCartesShop(nouveauLvl)));
};

export const acheterCarte = ({ card, gold, setGold, deck, setDeck, shopCards, setShopCards }) => {
  if (gold < 3) {
    alert("💰 Pas assez d'or !");
    return;
  }

  setGold(gold - 3);
  setDeck([...deck, card]);
  setShopCards(shopCards.filter((c) => c.id !== card.id));
};

export const actualiserBoutique = ({ lvlTaverne, setShopCards, gold, setGold  }) => {
  if (gold < 1) {
    alert("💰 Pas assez d'or !");
    return;
  }
  const tirage = getCartesPourShop(lvlTaverne);
  const cartes = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne));
  setShopCards(cartes);
  setGold(gold - 1)
};

const jouerCarteDepuisDeck = (card) => {
  if (boardJoueur.length >= 7) {
    alert("🛑 Board plein !");
    return;
  }
  setDeck(deck.filter((c) => c.id !== card.id));
  setBoardJoueur([...boardJoueur, card]);
};

const vendreCarteDuBoard = (card) => {
  setBoardJoueur(boardJoueur.filter((c) => c.id !== card.id));
  setGold(gold + 1);
};

    export const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;
      
        const [sourceType, sourceId] = active.id.split("-");
        const targetType = over.id;
        const id = parseInt(sourceId);
      
        let draggedCard;
        if (sourceType === "shop") {
          draggedCard = shopCards.find((c) => c.id === id);
        } else if (sourceType === "board") {
          draggedCard = boardJoueur.find((c) => c.id === id);
        } else if (sourceType === "deck") {
          draggedCard = deck.find((c) => c.id === id);
        }
      
        if (!draggedCard) return;
      
        if (sourceType === "shop" && targetType === "footer") {
          acheterCarte({
            card: draggedCard,
            gold,
            setGold,
            deck,
            setDeck,
            shopCards,
            setShopCards,
          });
        } else if (sourceType === "board" && targetType === "header") {
          vendreCarteDuBoard(draggedCard);
        } else if (sourceType === "deck" && targetType === "board-drop") {
          jouerCarteDepuisDeck(draggedCard);
        }
    };