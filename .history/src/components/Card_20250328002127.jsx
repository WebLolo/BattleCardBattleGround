

export default function Card({ key, card, index }) {
    console.log(index)
  return (
    <div className="cardfight player content-card animate__animated animate__backInLeft" data-id="${carte.id}" data-fullimg="img/card27.png">
        <img className="cardimg" src={card.imgMinia} alt=""/>
        <p className="hudIntAtk">1</p>
        <p className="hudIntPv">1</p>                    
    </div>

  );
}