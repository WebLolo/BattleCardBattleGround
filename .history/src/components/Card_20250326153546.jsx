import React from "react";

const Card = ({ card }) => {
  return (
    <div className="card">
      <img src={card.img} alt={card.name} className="card-img" />
      <h3>{card.name}</h3>
      <p>ATK: {card.atk} | HP: {card.hp}</p>
    </div>
  );
};

export default Card;
