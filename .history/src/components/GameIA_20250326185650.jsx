import { DndContext, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
import Shop from "@/components/Shop";
import Board from "@/components/Board";
import Deck from "@/components/Deck";
import {

    useDraggable,
  } from "@dnd-kit/core";

export default function GameIA() {
  const [gold, setGold] = useState(10);
  const [deck, setDeck] = useState([]);
  const [boardJoueur, setBoardJoueur] = useState([]);

  const [shopCards, setShopCards] = useState([
    { id: 1, name: "Dragon", atk: 4, hp: 6, imgMinia: "/img/card1.png" },
    { id: 2, name: "Golem", atk: 3, hp: 8, imgMinia: "/img/card2.png" },
    { id: 3, name: "Elfe", atk: 5, hp: 4, imgMinia: "/img/card3.png" },
  ]);

  const jouerCarteDepuisDeck = (card) => {
    if (boardJoueur.length >= 7) {
      alert("🛑 Board plein !");
      return;
    }
  
    setDeck(deck.filter(c => c.id !== card.id));
    setBoardJoueur([...boardJoueur, card]);
  };

  function DropZoneFooter({ onDrop }) {
    const { setNodeRef, isOver } = useDroppable({
      id: "footer-dropzone",
    });
  
    return (
      <div
        ref={setNodeRef}
        style={{
          border: isOver ? "2px dashed gold" : "2px dashed transparent",
          padding: "10px",
          minHeight: "50px",
        }}
      >
        {/* Tu peux styliser comme tu veux */}
      </div>
    );
  }

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
    setBoardJoueur(boardJoueur.filter(c => c.id !== card.id));
    setGold(gold + 1);
  };
  

  const fakeBoardIA = [
    { id: 1, name: "Dragon", atk: 4, hp: 6, imgMinia: "/img/card1.png" },
    { id: 2, name: "Golem", atk: 3, hp: 8, imgMinia: "/img/card2.png" },
  ];


  return (
<DndContext
  onDragEnd={(event) => {
    const { over, active } = event;
    if (!over) return;

    const droppedOn = over.id;
    const draggedCard = active.data.current?.card;
    const source = active.data.current?.source;

    if (droppedOn === "footer-dropzone" && source === "shop") {
      acheterCarte(draggedCard);
    }
  }}
>
  <GameLayout
    hudTop={<PlayerHUD name="IA" hp={30} level={1} gold={gold} avatar="/img/ia_avatar.png" />}
    boardTop={<Board cards={fakeBoardIA} />}
    shop={<Shop cards={shopCards} />}
    boardBottom={<Board cards={boardJoueur} />}
    footer={
      <>
        <DropZoneFooter />
        <Deck cards={deck} onPlay={jouerCarteDepuisDeck} />
        <PlayerHUD name="Joueur" hp={30} level={1} gold={gold} avatar="/img/player_avatar.png" />
      </>
    }
  />
</DndContext>
  );
}
