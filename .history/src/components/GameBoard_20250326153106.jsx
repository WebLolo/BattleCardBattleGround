import React from "react";
import Shop from "./Shop";
import PlayerBoard from "./PlayerBoard";
import IABoard from "./IABoard";

const GameBoard = () => {
  return (
    <div className="game-board">
      <h1>Plateau de jeu</h1>
      <Shop />
      <IABoard />
      <PlayerBoard />
    </div>
  );
};

export default GameBoard;
