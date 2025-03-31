import "@/styles/GameLayout.css";

export default function GameLayout({ shopHud }) {
  return (
    <div className="game-container">
      <div className="header">
        <div className="iaHud">

        </div>

        <div className="shopHud">
        { shopHud }
        </div>

      </div>
      <div className="main">

      </div>
      <div className="footer">

      </div>
    </div>
  );
}