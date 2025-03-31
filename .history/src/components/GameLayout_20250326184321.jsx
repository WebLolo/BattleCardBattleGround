import "@/styles/GameLayout.css";

export default function GameLayout({ children, hudTop, boardTop, boardBottom, shop, footer }) {
  return (
    <div className="game-container">
      {/* HUD du haut (IA ou Joueur 2) */}
      <div className="hud-top">{hudTop}</div>

      {/* Plateau */}
      <div className="board">
        <div className="board-top">{boardTop}</div>
        {shop && <div className="shop">{shop}</div>}
        <div className="board-bottom">{boardBottom}</div>
      </div>

      {/* Footer (HUD Joueur, bouton next phase) */}
      <div className="footer">
        {footer}
      </div>

      {/* Contenu spécifique du mode (GameIA ou Game1v1) */}
      {children}
    </div>
  );
}
