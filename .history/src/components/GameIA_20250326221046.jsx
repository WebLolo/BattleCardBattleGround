import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
import Shop from "@/components/Shop";
import Board from "@/components/Board";
import Deck from "@/components/Deck";
import DropZone from "@/components/DropZone";
import { cards } from "@/data/cardsData";

export default function GameIA() {
  const [goldJoueur, setGoldJoueur] = useState(10);
  const [goldIA, setGoldIA] = useState(10);
  const [deck, setDeck] = useState([]);
  const [boardJoueur, setBoardJoueur] = useState([]);
  const [phase, setPhase] = useState("shop");

  const getCartesPourShop = (niveauTaverne) => {
    return cards.filter((c) => c.lvl <= niveauTaverne);
  };

  const getCartesAleatoires = (liste, nombre) => {
    return [...liste].sort(() => 0.5 - Math.random()).slice(0, nombre);
  };

  const [shopCards, setShopCards] = useState(getCartesAleatoires(getCartesPourShop(6), 3));

  const jouerCarteDepuisDeck = (card) => {
    if (boardJoueur.length >= 7) {
      alert("🛑 Board plein !");
      return;
    }
    setDeck(deck.filter((c) => c.id !== card.id));
    setBoardJoueur([...boardJoueur, card]);
  };

  const acheterCarte = (card) => {
    if (goldJoueur < 3) {
      alert("💰 Pas assez d'or !");
      return;
    }
    setGoldJoueur(goldJoueur - 3);
    setDeck([...deck, card]);
    setShopCards(shopCards.filter((c) => c.id !== card.id));
  };

  const vendreCarteDuBoard = (card) => {
    setBoardJoueur(boardJoueur.filter((c) => c.id !== card.id));
    setGoldJoueur(goldJoueur + 1);
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

  const tavernierHUD = (
    <div className="tavernier-hud">
      <img src="/img/chounette_la_taverniere.png" alt="Tavernier" height="100" />
      <button className="btn btn-warning mx-2" onClick={() => setShopCards(getCartesAleatoires(getCartesPourShop(6), 3))}>
        🔄 Actualiser
      </button>
      <button className="btn btn-info">⬆️ Améliorer</button>
    </div>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <GameLayout
        hudTop={
          <DropZone id="header" className="drop-header">
            {phase === "shop" ? tavernierHUD : <PlayerHUD name="IA" hp={30} level={1} gold={goldIA} avatar="/img/ia_avatar.png" />}
          </DropZone>
        }
        boardTop={phase === "shop" ? <Shop cards={shopCards} origin="shop" /> : <Board cards={fakeBoardIA} />}
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
            <PlayerHUD name="Joueur" hp={30} level={1} gold={goldJoueur} avatar="/img/player_avatar.png" />
          </>
        }
      />
    </DndContext>
  );
}
