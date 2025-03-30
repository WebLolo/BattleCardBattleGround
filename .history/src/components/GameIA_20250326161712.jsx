import GameLayout from "@/components/GameLayout";

export default function GameIA() {
  return (
    <GameLayout
      hudTop={<div>HUD IA (Nom, HP, Niveau...)</div>}
      boardTop={<div>Board IA (cartes affichées ici)</div>}
      shop={<div>Shop (cartes disponibles à l'achat)</div>}
      boardBottom={<div>Board Joueur (cartes posées ici)</div>}
      footer={<div>HUD Joueur + Bouton Next Phase</div>}
    />
  );
}
