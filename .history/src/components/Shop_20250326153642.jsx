import React, { useState } from "react";
import { cards } from "../data/cardsData";
import Card from "./Card";

const Shop = () => {
  const [shopCards, setShopCards] = useState(cards); // Cartes en boutique

  return (
    <div className="shop">
      <h2>🛒 Boutique</h2>
      <div className="shop-cards">
        {shopCards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
