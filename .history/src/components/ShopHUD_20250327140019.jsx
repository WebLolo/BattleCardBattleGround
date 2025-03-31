import "@/styles/ShopHUD.css";

export default function ShopHUD() {
  return (
    <div className="shopHud">
      <img type="button" onClick="actualiserBoutique" className="hudActu" src="img/bouton_actualiser.png" alt=""/>
      <img className="hudPersoShop" src="img/persodariushud1.png" alt="" />
      <img type="button" onClick="lvlUpTaverne" className="hudLvlUp" src="img/bouton_lvlup_taverne.png" alt=""/>
      <div id="taverneCost" className="taverneCost">1</div>
    </div>
  );
}


