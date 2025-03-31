// src/components/ShopHUD.jsx
import "@/styles/ShopHUD.css";

export default function ShopHUD({ coutLvlSuivant, onRefresh, onLvlUp }) {
  return (
    <>
      <img
        type="button"
        onClick={onRefresh}
        className="hudActu"
        src="/img/bouton_actualiser.png"
        alt="Actualiser"
      />
      <img
        className="hudPersoShop"
        src="/img/chounette_la_taverniere.png"
        alt="Tavernière"
      />
      <img
        type="button"
        onClick={onLvlUp}
        className="hudLvlUp"
        src="/img/bouton_lvlup_taverne.png"
        alt="LvlUp"
      />
      <div className="taverneCost">{coutLvlSuivant}</div>
    </>
  );
}
