import React from "react";

export default function Deck({ cards }) {
  return (
    <div className="playerDeck d-flex gap-2 justify-content-center mt-2">
      {cards.map((card) => (
        <img
          key={card.id}
          src={card.imgMinia}
          alt={card.name}
          title={card.name}
          style={{ width: "80px", height: "auto" }}
        />
      ))}
    </div>
  );
}
