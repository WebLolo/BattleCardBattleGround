import "@/styles/PlayerHUD.css";

export default function PlayerHUD() {
  return (
    <div className="playerHud">
      <img type="button" onClick="actualiserBoutique" className="hudActu" src="img/bouton_actualiser.png" alt=""/>
      <img className="hudPersoShop" src="/img/chounette_la_taverniere.png" alt="" />
      <img type="button" onClick="lvlUpTaverne" className="hudLvlUp" src="img/bouton_lvlup_taverne.png" alt=""/>
      <div id="taverneCost" className="taverneCost">1</div>
    </div>
  );
}