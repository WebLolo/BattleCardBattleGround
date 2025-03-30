import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
import Shop from "@/components/Shop";
const fakeCards = [
    { id: 1, name: "Dragon Rouge", imgMinia: "/img/card1.png" },
    { id: 2, name: "Golem de Pierre", imgMinia: "/img/card2.png" },
    { id: 3, name: "Elfe Mystique", imgMinia: "/img/card3.png" },
  ];

const fakeBoardJoueur1 = [
    { id: 1, name: "Guerrier", atk: 6, hp: 5, imgMinia: "/img/card4.png" },
  ];
  
const fakeBoardJoueur2 = [
    { id: 2, name: "Mage", atk: 3, hp: 7, imgMinia: "/img/card5.png" },
  ];

export default function Game1v1() {
  return (
    <GameLayout
      hudTop={<PlayerHUD name="Joueur 2" hp={30} level={1} gold={3} avatar="/img/player2_avatar.png" />}
      boardTop={<Board cards={fakeBoardJoueur2} />}
      shop={<Shop cards={fakeCards} />}
      boardBottom={<Board cards={fakeBoardJoueur1} />}
      footer={<PlayerHUD name="Joueur 1" hp={30} level={1} gold={3} avatar="/img/player1_avatar.png" />}
    />
  );
}
