import "@/styles/PlayerHUD.css";

export default function PlayerHUD({ name, hp, level, gold, avatar }) {
  return (
    <div className="player-hud">
      <img className="avatar" src={avatar} alt={`${name} Avatar`} />
      <div className="info">
        <h3>{name}</h3>
        <p>❤️ {hp} PV</p>
        <p>⭐ Niveau {level}</p>
        <p>💰 {gold} or</p>
      </div>
    </div>
  );
}
