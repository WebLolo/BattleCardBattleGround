import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";

export default function GameIA() {
  return (
    <GameLayout
      hudTop={<PlayerHUD name="IA" hp={30} level={1} gold={3} avatar="/img/ia_avatar.png" />}
      boardTop={<div>Board IA (cartes affichées ici)</div>}
      shop={<div>Shop (cartes disponibles à l'achat)</div>}
      boardBottom={<div>Board Joueur (cartes posées ici)</div>}
      footer={<PlayerHUD name="Joueur" hp={30} level={1} gold={3} avatar="/img/player_avatar.png" />}
    />
  );
}
