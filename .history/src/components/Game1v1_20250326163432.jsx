import GameLayout from "@/components/GameLayout";
import PlayerHUD from "@/components/PlayerHUD";

export default function Game1v1() {
  return (
    <GameLayout
      hudTop={<PlayerHUD name="Joueur 2" hp={30} level={1} gold={3} avatar="/img/player2_avatar.png" />}
      boardTop={<div>Board Joueur 2 (cartes affichées ici)</div>}
      shop={<div>Shop (cartes disponibles à l'achat)</div>}
      boardBottom={<div>Board Joueur 1 (cartes posées ici)</div>}
      footer={<PlayerHUD name="Joueur 1" hp={30} level={1} gold={3} avatar="/img/player1_avatar.png" />}
    />
  );
}
