import "@/styles/GameLayout.css";

export default function GameLayout({ children, hudTop, boardTop, boardBottom, shop, shopHud, footer }) {
  return (
    <div className="game-container">
      {/* HUD du haut (IA ou Tavernier) */}
      <div className="hud-top">
        {shopHud || hudTop}
      </div>

      {/* Plateau */}
      <div className="board">
        {shop && <div className="shop">{shop}</div>}
        <div className="board-top">{boardTop}</div>
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