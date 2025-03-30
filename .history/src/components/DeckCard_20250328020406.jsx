export default function DeckCard({ card, index }) {
    return (
        <div id={ card.id } className={`cardInDeck${index} text-white`} data-fullimg={ card.img }>
            <img className="fullCard" data-id={ card.id }  src={ card.img } alt=""/>
        </div>
    );
}



