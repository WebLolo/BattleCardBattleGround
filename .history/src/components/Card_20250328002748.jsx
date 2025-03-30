

export default function Card({ card, index }) {
  return (
    <div className="cardfight player content-card animate__animated animate__backInLeft" data-id="${carte.id}" data-fullimg="img/card27.png">
        <img className="cardimg" src={ card.imgMinia } alt=""/>
        <p className="hudIntAtk">{ card.atk }</p>
        <p className="hudIntPv">{ card.hp }</p>                    
    </div>

  );
}