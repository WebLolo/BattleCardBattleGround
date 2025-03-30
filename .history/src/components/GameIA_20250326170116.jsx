import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
import Shop from "@/components/Shop";
import Board from "@/components/Board";
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

export default function GameIA() {
  return (
    <GameLayout
      hudTop={<PlayerHUD name="IA" hp={30} level={1} gold={3} avatar="/img/ia_avatar.png" />}
      boardTop={<Board cards={fakeBoardIA} />}
      shop={<Shop cards={fakeCards} />}
      boardBottom={<Board cards={fakeBoardJoueur} />}
      footer={<PlayerHUD name="Joueur" hp={30} level={1} gold={3} avatar="/img/player_avatar.png" />}
    />
  );
}
