import "@/styles/Player2HUD.css";

export default function Player2HUD({ gold, lvlTaverne, playerPv }) {
  return (
    <div className="player2Hud">
        <img className="hudPersoPlayer" src="img/ia_avatar.png" alt=""/>
        <img className="orlvlimghud" src="img/orlvlimghud.png" alt=""/>
        <div id="playerOr" className="playerOr">{ gold }</div>
        <img className="hpimghud" src="img/hpimghud.png" alt=""/>
        <div id="playerPv" className="playerPv">{ playerPv }</div>
        <div id="playerLvl" className="playerLvl">{ lvlTaverne }</div>
    </div>
  );
}