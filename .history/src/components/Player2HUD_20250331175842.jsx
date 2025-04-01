import "@/styles/Player2HUD.css";

export default function Player2HUD({ goldPlayer2, lvlTavernePlayer2, player2Pv }) {
  return (
    <div className="player2Hud">
        <img className="hudPersoPlayer2" src="img/ia_avatar.png" alt=""/>
        <img className="orlvlimghudP2" src="img/orlvlimghud.png" alt=""/>
        <div id="player2Or" className="player2Or">{ goldPlayer2 }</div>
        <img className="hpimghud" src="img/hpimghud.png" alt=""/>
        <div id="playerPv" className="playerPv">{ player2Pv }</div>
        <div id="playerLvl" className="playerLvl">{ lvlTavernePlayer2 }</div>
    </div>
  );
}