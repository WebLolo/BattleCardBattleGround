import "@/styles/ShopHUD.css";

export default function ShopHUD({ gold, lvlTaverne, coutLvlSuivant, onRefresh, onLvlUp }) {
  return (
    <div className="shop-hud">
      <img src="/img/chounette_la_taverniere.png" alt="Tavernière" className="taverniere-img" />
      <div className="shop-actions">
        <button className="btn btn-warning" onClick={onRefresh}>
          🔁 Actualiser (1💰)
        </button>
        <button className="btn btn-success" onClick={onLvlUp}>
          ⬆️ Lvl Up Taverne ({coutLvlSuivant ?? "MAX"})
        </button>
        <div className="gold-display">💰 {gold}</div>
      </div>
    </div>
  );
}
