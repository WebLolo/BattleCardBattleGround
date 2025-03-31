import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
import Shop from "@/components/Shop";
import Board from "@/components/Board";
import Deck from "@/components/Deck";
import { cards } from "@/data/cardsData";

import DropZone from "@/components/DropZone";

export default function GameIA() {
  const [gold, setGold] = useState(10);
  const [deck, setDeck] = useState([]);
  const [boardJoueur, setBoardJoueur] = useState([]);
  

  const [shopCards, setShopCards] = useState(cards);

  // 👉 Lancer achat si carte glissée dans "deck"
  const handleDrop = (event) => {
    const { active, over } = event;
    const cardId = parseInt(active.id, 10);

    const cardFromShop = shopCards.find((c) => c.id === cardId);
    const cardFromBoard = boardJoueur.find((c) => c.id === cardId);

    if (over?.id === "deck-drop" && cardFromShop) {
      if (gold < 3) return alert("💰 Pas assez d'or !");
      setGold(gold - 3);
      setDeck((prev) => [...prev, cardFromShop]);
      setShopCards((prev) => prev.filter((c) => c.id !== cardId));
    }

    if (over?.id === "sell-zone" && cardFromBoard) {
      setGold(gold + 1);
      setBoardJoueur((prev) => prev.filter((c) => c.id !== cardId));
    }
  };

  return (
    <DndContext onDragEnd={handleDrop}>
      <GameLayout
        hudTop={
          <DropZone id="sell-zone">
            <PlayerHUD name="IA" hp={30} level={1} gold={gold} avatar="/img/ia_avatar.png" />
          </DropZone>
        }
        boardTop={<Board cards={fakeBoardIA} />}
        shop={<Shop cards={shopCards} />}
        boardBottom={
          <Board cards={boardJoueur} />
        }
        footer={
          <DropZone id="deck-drop">
            <>
              <Deck cards={deck} onPlay={jouerCarteDepuisDeck} />
              <PlayerHUD name="Joueur" hp={30} level={1} gold={gold} avatar="/img/player_avatar.png" />
            </>
          </DropZone>
        }
      />
    </DndContext>
  );
}
