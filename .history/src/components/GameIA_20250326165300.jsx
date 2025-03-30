import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";
import Shop from "@/components/Shop";
const fakeCards = [
    { id: 1, name: "Dragon Rouge", imgMinia: "/img/card1.png" },
    { id: 2, name: "Golem de Pierre", imgMinia: "/img/card2.png" },
    { id: 3, name: "Elfe Mystique", imgMinia: "/img/card3.png" },
  ];

export default function GameIA() {
  return (
    <GameLayout
      hudTop={<PlayerHUD name="IA" hp={30} level={1} gold={3} avatar="/img/ia_avatar.png" />}
      boardTop={<div>Board IA (cartes affichées ici)</div>}
      shop={<Shop cards={fakeCards} />}
      boardBottom={<div>Board Joueur (cartes posées ici)</div>}
      footer={<PlayerHUD name="Joueur" hp={30} level={1} gold={3} avatar="/img/player_avatar.png" />}
    />
  );
}
