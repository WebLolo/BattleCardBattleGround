import "@/styles/ShopBoard.css";

export default function ShopBoard() {
  return (
    <div>
      <div className="cardfight player content-card animate__animated animate__backInLeft" data-id="${carte.id}" data-fullimg="img/card27.png">
        <img className="cardimg" src="img/cardfight27.2.png" alt=""/>
        <p className="hudIntAtk">1</p>
        <button className="btnperso btnSellBoard btn-warning btn-buy" data-id="${carte.id}">3 💰</button>
        <p className="hudIntPv">1</p>                    
      </div>
    </div>

  );
}