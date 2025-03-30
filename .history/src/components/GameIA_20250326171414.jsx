import { useState } from "react";
import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
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


    const fakeCards = [
        { id: 1, name: "Dragon Rouge", imgMinia: "/img/card1.png" },
        { id: 2, name: "Golem de Pierre", imgMinia: "/img/card2.png" },
        { id: 3, name: "Elfe Mystique", imgMinia: "/img/card3.png" },
      ];
    
    
    
    const fakeBoardIA = [
        { id: 1, name: "Dragon", atk: 4, hp: 6, imgMinia: "/img/card1.png" },
        { id: 2, name: "Golem", atk: 3, hp: 8, imgMinia: "/img/card2.png" },
      ];
      
    const fakeBoardJoueur = [
        { id: 3, name: "Elfe", atk: 5, hp: 4, imgMinia: "/img/card3.png" },
      ];


  return (
    <GameLayout
      hudTop={<PlayerHUD name="IA" hp={30} level={1} gold={gold} avatar="/img/ia_avatar.png" />}
      boardTop={<Board cards={fakeBoardIA} />}
      shop={<Shop cards={fakeCards} />}
      boardBottom={<Board cards={fakeBoardJoueur} />}
      footer={<PlayerHUD name="Joueur" hp={30} level={1} gold={gold} avatar="/img/player_avatar.png" />}
    />
  );
}
