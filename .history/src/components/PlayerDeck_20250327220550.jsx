import "@/styles/PlayerDeck.css";

export default function PlayerDeck() {
  return (
    <div className="playerDeck">
        <div id="1" className="cardInDeck0 text-white mb-3 me-2" data-fullimg="img/card1.png">
            <img className="fullCard" data-id="${carte.id}"  src="img/card1.png" alt=""/>
        </div>
        <div id="2" className="cardInDeck1 text-white mb-3 me-2" data-fullimg="img/card1.png">
            <img className="fullCard" data-id="${carte.id}"  src="img/card1.png" alt=""/>
        </div>
        <div id="3" className="cardInDeck2 text-white mb-3 me-2" data-fullimg="img/card1.png">
            <img className="fullCard" data-id="${carte.id}"  src="img/card1.png" alt=""/>
        </div>
        <div id="4" className="cardInDeck3 text-white mb-3 me-2" data-fullimg="img/card1.png">
            <img className="fullCard" data-id="${carte.id}"  src="img/card1.png" alt=""/>
        </div>
        <div id="5" className="cardInDeck4 text-white mb-3 me-2" data-fullimg="img/card1.png">
            <img className="fullCard" data-id="${carte.id}"  src="img/card1.png" alt=""/>
        </div>
        <div id="6" className="cardInDeck5 text-white mb-3 me-2" data-fullimg="img/card1.png">
            <img className="fullCard" data-id="${carte.id}"  src="img/card1.png" alt=""/>
        </div>
        <div id="7" className="cardInDeck6 text-white mb-3 me-2" data-fullimg="img/card1.png">
            <img className="fullCard" data-id="${carte.id}"  src="img/card1.png" alt=""/>
        </div>
    </div>

  );
}