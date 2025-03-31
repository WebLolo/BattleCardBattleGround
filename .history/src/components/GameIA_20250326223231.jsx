import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
import Shop from "@/components/Shop";
import Board from "@/components/Board";
import Deck from "@/components/Deck";
import DropZone from "@/components/DropZone";
import ShopHUD from "@/components/ShopHUD";
import { cards } from "@/data/cardsData";

export default function GameIA() {
  const [gold, setGold] = useState(10);
  const [goldIA, setGoldIA] = useState(10);
  const [deck, setDeck] = useState([]);
  const [boardJoueur, setBoardJoueur] = useState([]);
  const [shopCards, setShopCards] = useState([]);
  const [lvlTaverne, setLvlTaverne] = useState(1);

  const getCartesPourShop = (niveauTaverne) => {
    return cards.filter((c) => c.lvl <= niveauTaverne);
  };

  const getCartesAleatoires = (liste, nombre) => {
    return [...liste].sort(() => 0.5 - Math.random()).slice(0, nombre);
  };

  const rafraichirBoutique = () => {
    const nouvellesCartes = getCartesAleatoires(getCartesPourShop(lvlTaverne), 3);
    setShopCards(nouvellesCartes);
  };

  const lvlUpTaverne = () => {
    if (gold < 5) {
      alert("Pas assez d'or pour améliorer la taverne !");
      return;
    }
    setGold(gold - 5);
    setLvlTaverne(lvlTaverne + 1);
    rafraichirBoutique();
  };

  const jouerCarteDepuisDeck = (card) => {
    if (boardJoueur.length >= 7) {
      alert("🛑 Board plein !");
      return;
    }
    setDeck(deck.filter((c) => c.id !== card.id));
    setBoardJoueur([...boardJoueur, card]);
  };

  const acheterCarte = (card) => {
    if (gold < 3) {
      alert("💰 Pas assez d'or !");
      return;
    }
    setGold(gold - 3);
    setDeck([...deck, card]);
    setShopCards(shopCards.filter((c) => c.id !== card.id));
  };

  const vendreCarteDuBoard = (card) => {
    setBoardJoueur(boardJoueur.filter((c) => c.id !== card.id));
    setGold(gold + 1);
  };

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
    { id: 1, name: "Dragon", atk: 4, hp: 6, imgMinia: "/img/card1.png" },
    { id: 2, name: "Golem", atk: 3, hp: 8, imgMinia: "/img/card2.png" },
  ];

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <GameLayout
        hudTop={
          <DropZone id="header" className="drop-header">
            <ShopHUD gold={gold} lvl={lvlTaverne} onRefresh={rafraichirBoutique} onLvlUp={lvlUpTaverne} />
          </DropZone>
        }
        boardTop={<Board cards={fakeBoardIA} />}
        shop={<Shop cards={shopCards} origin="shop" />}
        boardBottom={
          <DropZone id="board-drop">
            <Board cards={boardJoueur} origin="board" />
          </DropZone>
        }
        footer={
          <>
            <DropZone id="footer" className="drop-footer">
              <Deck cards={deck} onPlay={jouerCarteDepuisDeck} />
            </DropZone>
            <PlayerHUD name="Joueur" hp={30} level={1} gold={gold} avatar="/img/player_avatar.png" />
          </>
        }
      />
    </DndContext>
  );
}
