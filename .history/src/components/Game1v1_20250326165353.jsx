import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
import Shop from "@/components/Shop";
const fakeCards = [
    { id: 1, name: "Dragon Rouge", imgMinia: "/img/card1.png" },
    { id: 2, name: "Golem de Pierre", imgMinia: "/img/card2.png" },
    { id: 3, name: "Elfe Mystique", imgMinia: "/img/card3.png" },
  ];

export default function Game1v1() {
  return (
    <GameLayout
      hudTop={<PlayerHUD name="Joueur 2" hp={30} level={1} gold={3} avatar="/img/player2_avatar.png" />}
      boardTop={<div>Board Joueur 2 (cartes affichées ici)</div>}
      shop={<Shop cards={fakeCards} />}
      boardBottom={<div>Board Joueur 1 (cartes posées ici)</div>}
      footer={<PlayerHUD name="Joueur 1" hp={30} level={1} gold={3} avatar="/img/player1_avatar.png" />}
    />
  );
}
