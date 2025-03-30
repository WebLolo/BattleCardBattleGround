import "@/styles/PlayerBoard.css";

export default function PlayerBoard() {
  return (
    <div className="playerBoard">
      <div className="cardfight player content-card animate__animated animate__backInLeft" data-id="${carte.id}" data-fullimg="img/card27.png">
        <img className="cardimg" src="img/cardfight27.2.png" alt=""/>
        <p className="hudIntAtk">1</p>
        <p className="hudIntPv">1</p>                    
      </div>
    </div>

  );
}