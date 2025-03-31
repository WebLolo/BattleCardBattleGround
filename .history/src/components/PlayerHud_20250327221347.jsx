import "@/styles/PlayerHUD.css";

export default function PlayerHUD() {
  return (
    <div className="playerHud">
        <img class="hudPersoPlayer" src="img/persodariushud.png" alt=""/>
        <img class="orlvlimghud" src="img/orlvlimghud.png" alt=""/>
        <div id="playerOr" class="playerOr">10</div>
        <img class="hpimghud" src="img/hpimghud.png" alt=""/>
        <div id="playerPv" class="playerPv">30</div>
        <div id="playerLvl" class="playerLvl">1</div>
    </div>
  );
}