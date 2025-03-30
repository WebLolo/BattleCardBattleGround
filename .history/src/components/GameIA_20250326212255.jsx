import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
import Shop from "@/components/Shop";
import Board from "@/components/Board";
import Deck from "@/components/Deck";
import { cards } from "@/data/cardsData";

export default function GameIA() {
  const [gold, setGold] = useState(10);
  const [deck, setDeck] = useState([]);
  const [boardJoueur, setBoardJoueur] = useState([]);
  const [lvlTaverne, setLvlTaverne] = useState(1);
  const [shopCards, setShopCards] = useState([]);

  // 🧠 Fonctions utilitaires
  const getCartesPourShop = (niveauTaverne) => {
    return cards.filter((c) => c.lvl <= niveauTaverne);
  };

  const getCartesAleatoires = (liste, nombre) => {
    return [...liste].sort(() => 0.5 - Math.random()).slice(0, nombre);
  };

  const getNombreCartesShop = (lvl) => {
    if (lvl === 1) return 3;
    if (lvl === 2 || lvl === 3) return 4;
    if (lvl === 4 || lvl === 5) return 5;
    return 6;
  };

  // 🛍️ Mise à jour du shop selon le niveau de taverne
  useEffect(() => {
    const cartesDispo = getCartesPourShop(lvlTaverne);
    const nb = getNombreCartesShop(lvlTaverne);
    setShopCards(getCartesAleatoires(cartesDispo, nb));
  }, [lvlTaverne]);

  // 💰 Acheter
  const acheterCarte = (card) => {
    if (gold < 3) {
      alert("💰 Pas assez d'or !");
      return;
    }
    setGold(gold - 3);
    setDeck([...deck, card]);
    setShopCards(shopCards.filter((c) => c.id !== card.id));
  };

  // 🎮 Jouer une carte du deck vers le board
  const jouerCarteDepuisDeck = (card) => {
    if (boardJoueur.length >= 7) {
      alert("🛑 Board plein !");
      return;
    }
    setDeck(deck.filter((c) => c.id !== card.id));
    setBoardJoueur([...boardJoueur, card]);
  };

  // 💸 Vendre une carte
  const vendreCarteDuBoard = (card) => {
    setBoardJoueur(boardJoueur.filter((c) => c.id !== card.id));
    setGold(gold + 1);
  };

  // 🧲 Drag & Drop
  const handleDragEnd = (event) => {
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
      acheterCarte(draggedCard);
    } else if (sourceType === "board" && targetType === "header") {
      vendreCarteDuBoard(draggedCard);
    } else if (sourceType === "deck" && targetType === "board-drop") {
      jouerCarteDepuisDeck(draggedCard);
    }
  };

  const fakeBoardIA = [
    { id: 999, nom: "Thomux", atk: 4, hp: 6, imgMinia: "img/cardfight18.png" },
  ];

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <GameLayout
        hudTop={
          <>
            <div id="header-drop" style={{ minHeight: 100 }} />
            <PlayerHUD name="IA" hp={30} level={lvlTaverne} gold={gold} avatar="/img/ia_avatar.png" />
          </>
        }
        boardTop={<Board cards={fakeBoardIA} />}
        shop={<Shop cards={shopCards} origin="shop" />}
        boardBottom={<Board cards={boardJoueur} origin="board" />}
        footer={
          <>
            <div id="footer-drop" style={{ minHeight: 100 }} />
            <Deck cards={deck} />
            <PlayerHUD name="Joueur" hp={30} level={lvlTaverne} gold={gold} avatar="/img/player_avatar.png" />
            <button className="btn btn-sm btn-warning" onClick={() => setLvlTaverne((lvl) => Math.min(lvl + 1, 6))}>
              🔺 Niveau Taverne
            </button>
          </>
        }
      />
    </DndContext>
  );
}
