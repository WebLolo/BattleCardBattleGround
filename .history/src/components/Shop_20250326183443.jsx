import { useState } from "react";
import Card from "@/components/Card";
import "@/styles/Shop.css";

export default function Shop({ cards, onBuy, onDragStart }) {
  return (
    <div className="shop">
      {cards.map((card) => (
        <div key={card.id} className="shop-card">
          <Card card={card} onDragStart={onDragStart} />
        </div>
      ))}
    </div>
  );
}
