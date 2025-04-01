import "@/styles/Player2HUD.css";

export default function Player2HUD({ goldPlayer2, lvlTavernePlayer2, player2Pv }) {
  return (
    <div className="player2Hud">
        <img className="hudPersoPlayer2" src="img/ia_avatar.png" alt=""/>
        <img className="orlvlimghudP2" src="img/orlvlimghud.png" alt=""/>
        <div id="player2Or" className="player2Or">{ goldPlayer2 }</div>
        <img className="hpimghudP2" src="img/hpimghud.png" alt=""/>
        <div id="player2Pv" className="player2Pv">30</div>
        <div id="player2Lvl" className="player2Lvl">1</div>
    </div>
  );
}