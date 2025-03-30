import "@/styles/PlayerHUD.css";

export default function PlayerHUD() {
  return (
    <div className="playerHud">
        <img className="hudPersoPlayer" src="img/ia_avatar.png" alt=""/>
        <img className="orlvlimghud" src="img/orlvlimghud.png" alt=""/>
        <div id="playerOr" className="playerOr">10</div>
        <img className="hpimghud" src="img/hpimghud.png" alt=""/>
        <div id="playerPv" className="playerPv">30</div>
        <div id="playerLvl" className="playerLvl">1</div>
    </div>
  );
}