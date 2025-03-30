import "@/styles/BoardShop.css";

export default function BoardShop() {
  return (
    <div class="cardfight player content-card animate__animated animate__backInLeft" data-id="${carte.id}" data-fullimg="img/card27.png">
        <img class="cardimg" src="img/cardfight27.2.png" alt=""/>
        <p class="hudIntAtk">1</p>
        <button class="btnperso btnSellBoard btn-warning btn-buy" data-id="${carte.id}">3 💰</button>
        <p class="hudIntPv">1</p>                    
    </div>
  );
}