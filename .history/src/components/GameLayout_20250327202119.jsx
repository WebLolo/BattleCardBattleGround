import "@/styles/GameLayout.css";

export default function GameLayout({ shopHud, IAHUD }) {
  return (
    <div className="game-container">
      <div className="header">
        { IAHUD || shopHud}


      </div>
      <div className="main">

      </div>
      <div className="footer">

      </div>
    </div>
  );
}