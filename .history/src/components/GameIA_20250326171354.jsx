import { useState } from "react";
import Shop from "@/components/Shop";
import Board from "@/components/Board";

export default function GameIA() {
  const [gold, setGold] = useState(10);
  const [deck, setDeck] = useState([]);
  const [shopCards, setShopCards] = useState([
    { id: 1, name: "Dragon", atk: 4, hp: 6, imgMinia: "/img/card1.png" },
    { id: 2, name: "Golem", atk: 3, hp: 8, imgMinia: "/img/card2.png" },
    { id: 3, name: "Elfe", atk: 5, hp: 4, imgMinia: "/img/card3.png" },
  ]);

  const acheterCarte = (card) => {
    if (gold < 3) {
      alert("Pas assez d'or !");
      return;
    }

    setGold(gold - 3);
    setDeck([...deck, card]);
    setShopCards(shopCards.filter((c) => c.id !== card.id));
  };

  return (
    <GameLayout
      hudTop={<div>Or : {gold} 💰</div>}
      boardTop={<Board cards={[]} />}
      boardBottom={<Board cards={deck} />}
      shop={<Shop cards={shopCards} onBuy={acheterCarte} />}
    />
  );
}
