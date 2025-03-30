import "@/styles/Deck.css";
export default function Deck({ cards, onPlay }) {
  return (
    <div className="playerDeck">
      {cards.map((card) => (
        <div key={card.id} className="text-center">
          <img
            src={card.img} // 👉 Utilise l'image complète ici
            alt={card.nom}
            title={card.nom}
            style={{ width: "80px", height: "auto" }}
          />
          {/* Le bouton est désactivé car on utilise le drag & drop */}
          {/* <button className="btn btn-sm btn-success mt-1" onClick={() => onPlay(card)}>
            Jouer
          </button> */}
        </div>
      ))}
    </div>
  );
}
