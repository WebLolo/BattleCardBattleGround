import GameLayout from "@/components/GameLayout";

export default function Game1v1() {
  return (
    <GameLayout
      hudTop={<div>HUD Joueur 2</div>}
      boardTop={<div>Board Joueur 2 (cartes affichées ici)</div>}
      shop={<div>Shop (cartes disponibles à l'achat)</div>}
      boardBottom={<div>Board Joueur 1 (cartes posées ici)</div>}
      footer={<div>HUD Joueur 1 + Bouton Next Phase</div>}
    />
  );
}
