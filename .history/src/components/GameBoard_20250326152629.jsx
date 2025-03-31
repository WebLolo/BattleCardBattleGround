import React from "react";

const GameBoard = () => {
  return (
    <div className="game-board">
      <h1>Plateau de jeu</h1>
      <div className="shop">🛒 Boutique</div>
      <div className="ia-board">🤖 Board IA</div>
      <div className="player-board">🃏 Board Joueur</div>
    </div>
  );
};

export default GameBoard;
