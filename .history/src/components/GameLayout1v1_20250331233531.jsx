import "@/styles/GameLayout1v1.css";

export default function GameLayout1v1({ ShopHUD, Player2HUD, ShopBoard, Player2Board, Player2BoardFight, PlayerBoard, PlayerDeck, PlayerHUD, Player2Deck, Player2HUDFight }) {
  return (
    <div className="game-container">
      <div className="header">
        { ShopHUD || Player2HUDFight }


      </div>
      <div className="main">

        { ShopBoard || Player2BoardFight }

        { PlayerBoard } || { Player2Board }

      </div>
      <div className="footer">

        { PlayerDeck } || { Player2Deck }

        { PlayerHUD } || { Player2HUD }

      </div>
    </div>
  );
}