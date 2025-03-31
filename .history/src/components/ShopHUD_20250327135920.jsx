import "@/styles/ShopHUD.css";

export default function ShopHUD() {
  return (
    <div className="shopHud">
      <img type="button" onclick="actualiserBoutique()" className="hudActu" src="img/bouton_actualiser.png" alt=""/>
      <img className="hudPersoShop" src="img/persodariushud1.png" alt="" />
      <img type="button" onclick="lvlUpTaverne(event)" className="hudLvlUp" src="img/bouton_lvlup_taverne.png" alt=""/>
      <div id="taverneCost" class="taverneCost">1</div>
    </div>
  );
}


