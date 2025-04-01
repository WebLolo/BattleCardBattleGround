import "@/styles/GameLayout1v1.css";

export default function GameLayout({ shopHud, Player2HUD, ShopBoard, Player2Board, PlayerBoard, PlayerDeck, PlayerHUD, Player2Deck, Player2HUDShop }) {
  return (
    <div className="game-container">
      <div className="header">
        { shopHud || Player2HUDShop }


      </div>
      <div className="main">

        { ShopBoard || Player2Board }

        { PlayerBoard } || { Player2Board }

      </div>
      <div className="footer">

        { PlayerDeck } || { Player2Deck }

        { PlayerHUD } || { Player2HUD }

      </div>
    </div>
  );
}