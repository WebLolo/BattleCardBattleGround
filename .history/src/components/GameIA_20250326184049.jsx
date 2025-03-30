import { useState } from "react";
import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
import Shop from "@/components/Shop";
import Board from "@/components/Board";
import Deck from "@/components/Deck";

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

  const handleDragStart = (e, card, source) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ card, source }));
  };
  
  const handleDropFromShop = (card) => {
    if (gold < 3) {
      alert("💰 Pas assez d'or !");
      return;
    }
  
    setGold(gold - 3);
    setDeck((prev) => [...prev, card]);
    setShopCards((prev) => prev.filter((c) => c.id !== card.id));

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
    <GameLayout
        hudTop={<PlayerHUD name="IA" hp={30} level={1} gold={gold} avatar="/img/ia_avatar.png" />}
        boardTop={<Board cards={fakeBoardIA} />}
        shop={<Shop cards={shopCards} onBuy={acheterCarte} onDragStart={handleDragStart} />}
        boardBottom={<Board cards={boardJoueur} />}
        footer={
            <>
            <Deck cards={deck} onPlay={jouerCarteDepuisDeck} />
            <PlayerHUD name="Joueur" hp={30} level={1} gold={gold} avatar="/img/player_avatar.png" />
            </>
        }
        onDropFromShop={handleDropFromShop}
        />
  );
}
