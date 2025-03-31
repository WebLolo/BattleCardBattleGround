import "@/styles/ShopHUD.css";

export default function ShopHUD() {
  return (
    <div className="shopHud">
      <img type="button" onclick="actualiserBoutique()" class="hudActu" src="img/bouton_actualiser.png" alt=""/>
      <img class="hudPersoShop" src="img/persodariushud1.png" alt="" />
      <img type="button" onclick="lvlUpTaverne(event)" class="hudLvlUp" src="img/bouton_lvlup_taverne.png" alt=""/>
      <div id="taverneCost" class="taverneCost">1</div>
    </div>
  );
}


