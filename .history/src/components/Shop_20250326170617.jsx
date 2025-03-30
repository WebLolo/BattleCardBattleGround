import { useState } from "react";
import Card from "@/components/Card";
import "@/styles/Shop.css";

export default function Shop({ cards, onBuy }) {
  return (
    <div className="shop">
      {cards.map((card) => (
        <div key={card.id} className="shop-card">
          <Card card={card} />
          <button className="buy-button" onClick={() => onBuy(card)}>
            Acheter (3💰)
          </button>
        </div>
      ))}
    </div>
  );
}
