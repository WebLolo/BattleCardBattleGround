// src/components/PlayerHUD.jsx
import "@/styles/PlayerHUD.css";

export default function PlayerHUD({ hp, gold, lvl, avatar }) {
  return (
    <>
      <img className="hudPersoPlayer" src={avatar} alt="Joueur" />
      <img className="orlvlimghud" src="/img/orlvlimghud.png" alt="or-lvl" />
      <div className="playerOr">{gold}</div>
      <img className="hpimghud" src="/img/hpimghud.png" alt="hp" />
      <div className="playerPv">{hp}</div>
      <div className="playerLvl">{lvl}</div>
    </>
  );
}
