export default function DeckCard({ card, index }) {
    return (
        <div id={ card.id } className={`cardInDeck${index} text-white`} data-fullimg="img/card1.png">
            <img className="fullCard" data-id={ card.id }  src={ card.img } alt=""/>
        </div>
    );
}



