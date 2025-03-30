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
  const [playerGold, setPlayerGold] = useState(10);
  const [iaGold, setIaGold] = useState(10);
  const [deck, setDeck] = useState([]);
  const [boardJoueur, setBoardJoueur] = useState([]);

  const getCartesPourShop = (niveauTaverne) => {
    return cards.filter((c) => c.lvl <= niveauTaverne);
  };

  const getCartesAleatoires = (liste, nombre) => {
    return [...liste].sort(() => 0.5 - Math.random()).slice(0, nombre);
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
    if (playerGold < 3) {
      alert("💰 Pas assez d'or !");
      return;
    }
    setPlayerGold(playerGold - 3);
    setDeck([...deck, card]);
    setShopCards(shopCards.filter((c) => c.id !== card.id));
  };

  const vendreCarteDuBoard = (card) => {
    setBoardJoueur(boardJoueur.filter((c) => c.id !== card.id));
    setPlayerGold(playerGold + 1);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("🧲 Drag terminé :", { active: active.id, over: over.id });
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
      console.log("🎯 Drop du deck vers le board détecté !");
      jouerCarteDepuisDeck(draggedCard);
    }
  };

  const [shopCards, setShopCards] = useState(
    getCartesAleatoires(getCartesPourShop(1), 3)
  );

  const fakeBoardIA = [
    { id: 1, name: "Dragon", atk: 4, hp: 6, imgMinia: "/img/card1.png" },
    { id: 2, name: "Golem", atk: 3, hp: 8, imgMinia: "/img/card2.png" },
  ];

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <GameLayout
        hudTop={
          <DropZone id="header" className="drop-header">
            <PlayerHUD
              name="IA"
              hp={30}
              level={1}
              gold={iaGold}
              avatar="/img/ia_avatar.png"
            />
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
            <PlayerHUD
              name="Joueur"
              hp={30}
              level={1}
              gold={playerGold}
              avatar="/img/player_avatar.png"
            />
          </>
        }
      />
    </DndContext>
  );
}
