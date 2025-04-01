import "@/styles/GameLayout1v1.css";

export default function GameLayout({ shopHud, IAHUD, ShopBoard, IABoard, PlayerBoard, PlayerDeck, PlayerHUD }) {
  return (
    <div className="game-container">
      <div className="header">
        { IAHUD || shopHud}


      </div>
      <div className="main">

        { ShopBoard || IABoard }

        { PlayerBoard }

      </div>
      <div className="footer">

        { PlayerDeck }

        { PlayerHUD }

      </div>
    </div>
  );
}