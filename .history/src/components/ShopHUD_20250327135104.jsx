import "@/styles/ShopHUD.css";

export default function ShopHUD() {
  return (
    <div className="shopHud">
      <img type="button" onclick="actualiserBoutique()" class="hudActu" src="img/bouton_actualiser.png" alt=""/>
      <img class="hudPersoShop" src="img/persodariushud1.png" alt="" />
      <img type="button" onclick="lvlUpTaverne(event)" class="hudLvlUp" src="img/bouton_lvlup_taverne.png" alt=""/>
      <div className="shop-actions">
        <button className="btn btn-warning" onClick={onRefresh}>
          🔁 Actualiser (1💰)
        </button>
        <button className="btn btn-success" onClick={onLvlUp}>
          ⬆️ Lvl Up Taverne ({coutLvlSuivant ?? "MAX"})
        </button>
      </div>
    </div>
  );
}


