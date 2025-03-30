import "@/styles/GameLayout.css";

export default function GameLayout({ shopHud, IAHUD, ShopBoard, IABoard }) {
  return (
    <div className="game-container">
      <div className="header">
        { IAHUD || shopHud}


      </div>
      <div className="main">

        { ShopBoard || IABoard }

      </div>
      <div className="footer">

      </div>
    </div>
  );
}