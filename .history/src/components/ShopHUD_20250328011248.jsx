import "@/styles/ShopHUD.css";

export default function ShopHUD({ cout, onRefresh, onLvlUp }) {
  return (
    <div className="shopHud">
      <img type="button" onClick={ onRefresh } className="hudActu" src="img/bouton_actualiser.png" alt=""/>
      <img className="hudPersoShop" src="/img/chounette_la_taverniere.png" alt="" />
      <img type="button" onClick={ onLvlUp } className="hudLvlUp" src="img/bouton_lvlup_taverne.png" alt=""/>
      <div id="taverneCost" className="taverneCost">{ cout }</div>
    </div>
  );
}


