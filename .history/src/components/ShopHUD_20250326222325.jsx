// src/components/ShopHUD.jsx
import "@/styles/ShopHUD.css";

export default function ShopHUD({ onRefresh, onLevelUp, level = 1, gold = 0 }) {
  return (
    <div className="shop-hud">
      <img
        src="/img/chounette_la_taverniere.png"
        alt="Tavernier"
        className="shop-avatar"
      />

      <div className="shop-actions">
        <button className="btn btn-outline-light me-2" onClick={onRefresh}>
          🔄 Actualiser
        </button>
        <button className="btn btn-outline-warning">⬆️ Niveau Taverne</button>
      </div>

      <div className="shop-status">
        <p>⭐ Niveau : {level}</p>
        <p>💰 Or : {gold}</p>
      </div>
    </div>
  );
}