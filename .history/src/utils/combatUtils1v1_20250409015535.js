import { coutLvlTaverne, coutLvlTavernePlayer2, getCartesAleatoires, getCartesPourShop, getNombreCartesShop, clonerCarte } from "@/utils/shopUtils1v1";
import { aoe, boardPositionFight, degatsAdj } from "@/utils/mecaUtils";
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export  function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function finDeCombat(cartesPlayer, cartesPlayer2, boardAvantCombat, boardAvantCombatPlayer2, lvlTaverne, lvlTavernePlayer2, setBoardPlayer, setBoardPlayer2, goldTour1, setgoldTour1, setGoldPlayer2, setplayerPv, setplayer2Pv, setGold, setShopCards, setActualPlayer, setPhase){
  console.log("⚔️ Combat terminé !");
      // **Réinitialisation des PV après combat avec les buffs**
      cartesPlayer.forEach((carte) => {
        let carteOriginale = boardAvantCombat.find(c => c.id === carte.id);
        if (carteOriginale) 
          carte.hp = carteOriginale.hp,
          carte.buffHp = carteOriginale.buffHp,
          carte.buffAtk = carteOriginale.buffAtk,
          carte.auraEffect = carteOriginale.auraEffect
        ;
    });

    cartesPlayer2.forEach((carte) => {
        let carteOriginale = boardAvantCombatPlayer2.find(c => c.id === carte.id);
        if (carteOriginale) carte.hp = carteOriginale.hp;
    });

  // Fin du combat
  const survivantsJoueur = cartesPlayer.filter(c => c.hp > 0);
  const survivantsPlayer2 = cartesPlayer2.filter(c => c.hp > 0);

  if (survivantsJoueur.length === 0 && survivantsPlayer2.length === 0) {
    alert("⚖️ Match nul !");
  } else {
    const degats = lvlTaverne + (survivantsJoueur.length || survivantsPlayer2.length);
    if (survivantsJoueur.length > 0) {
      setplayer2Pv(prev => prev - degats);
      alert(`🏆 Victoire du Joueur 1, le joueur 2 perd ${degats} PV`);
    } else {
      setplayerPv(prev => prev - degats);
      alert(`🏆 Victoire du joueur 2, le joueur 1 perd ${degats} PV`);
    }
  }
  console.log(boardAvantCombat)
  // Restauration des boards à l'identique
  setBoardPlayer(
    boardAvantCombat.map(carte => clonerCarte({ carte, camp: "joueur" }))
  );
  setBoardPlayer2(
    boardAvantCombatPlayer2.map(carte => clonerCarte({ carte, camp: "joueur" }))
  );
  if (playerPv - (survivantsPlayer2.length > 0 ? (lvlTaverne + survivantsPlayer2.length) : 0) <= 0) {
    alert("🏆 Le joueur 2 a gagné la partie !");
    navigate("/#/menu"); // redirection vers ta page Menu.jsx
    return;
  }
  
  if (player2Pv - (survivantsJoueur.length > 0 ? (lvlTaverne + survivantsJoueur.length) : 0) <= 0) {
    alert("🏆 Le joueur 1 a gagné la partie !");
    navigate("/#/menu"); // redirection vers ta page Menu.jsx
    return;
  }
const nouveauGold = Math.min(goldTour1 + 1, 10);
setgoldTour1(nouveauGold)
setGoldPlayer2(nouveauGold)
setGold(nouveauGold)
const cartesAleatoires = getCartesAleatoires(getCartesPourShop(lvlTaverne), getNombreCartesShop(lvlTaverne));
setShopCards(cartesAleatoires.map(carte => clonerCarte({ carte, camp: "joueur" })))

coutLvlTaverne[lvlTaverne]--;
coutLvlTavernePlayer2[lvlTavernePlayer2]--;
setActualPlayer(1)
await sleep(200);
setPhase("shopPlayer1")
}

  

export async function deroulerCombat1v1({
  boardPlayer,
  setBoardPlayer,
  boardPlayer2,
  setBoardPlayer2,
  lvlTaverne,
  lvlTavernePlayer2,
  playerPv,
  setplayerPv,
  player2Pv,
  setGoldPlayer2,
  setplayer2Pv,
  setPhase,
  setBoardCombat,
  setBoardCombatPlayer2,
  setCarteAttaquantId,
  setCarteDefenseurId,
  goldTour1,
  setgoldTour1,
  setGold,
  setShopCards,
  navigate,
  setActualPlayer
}) {
  console.log("⚔️ Combat lancé !");

  const boardAvantCombat = boardPlayer.map(carte => ({ ...carte }));
  const boardAvantCombatPlayer2 = boardPlayer2.map(carte => ({ ...carte }));
  console.log("📌 Sauvegarde du board Player 1 avant combat :", boardAvantCombat);
  console.log("📌 Sauvegarde du board Player 2 avant combat :", boardAvantCombatPlayer2);


  let cartesPlayer = [...boardPlayer];
  let cartesPlayer2 = [...boardPlayer2];
  setBoardCombat([...cartesPlayer]);
  setBoardCombatPlayer2([...cartesPlayer2]);
  await sleep(1200);

  if (cartesPlayer.length === 0 || cartesPlayer2.length === 0) {
    finDeCombat(cartesPlayer, cartesPlayer2, boardAvantCombat, boardAvantCombatPlayer2, lvlTaverne, lvlTavernePlayer2, setBoardPlayer, setBoardPlayer2, goldTour1, setgoldTour1, setGoldPlayer2, setplayerPv, setplayer2Pv, setGold, setShopCards, setActualPlayer, setPhase)
    return;
  }
  //Effet debut de combat//
  const aoeResult = await aoe(cartesPlayer, cartesPlayer2);
  cartesPlayer = aoeResult.cartesPlayer;
  cartesPlayer2 = aoeResult.cartesPlayer2;
  setBoardCombat([...cartesPlayer]);
  setBoardCombatPlayer2([...cartesPlayer2]);

  
  await sleep(1000);
  if (cartesPlayer.length === 0 || cartesPlayer2.length === 0) {
    finDeCombat(cartesPlayer, cartesPlayer2, boardAvantCombat, boardAvantCombatPlayer2, lvlTaverne, lvlTavernePlayer2, setBoardPlayer, setBoardPlayer2, goldTour1, setgoldTour1, setGoldPlayer2, setplayerPv, setplayer2Pv, setGold, setShopCards, setActualPlayer, setPhase)
    return;
  }
  


  // Fin effet debut de combat

  let tirageAuSort = entierAleatoire(0,1);
  let joueurAttaquant = null
  if (tirageAuSort === 0){
    joueurAttaquant = true
  }else{
    joueurAttaquant = false
  }
  let attaquant = null
  let defenseur = null
  let nomAttaquant = ""
  let nomDefenseur = ""
  let tourCombat = 1
  cartesPlayer[0].atkDispo = true;
  cartesPlayer2[0].atkDispo = true;

  while (cartesPlayer.length > 0 && cartesPlayer2.length > 0) {
    console.log("TOUR", tourCombat)
    let attaquant = joueurAttaquant
      if (joueurAttaquant === true){
        nomAttaquant = "joueur"
        nomDefenseur = "joueur2"
        attaquant = cartesPlayer[0]
        if (attaquant.atkDispo === false){
          if(attaquant === cartesPlayer[cartesPlayer.length -1]){
              attaquant = cartesPlayer[0]
          }else{
              attaquant = cartesPlayer[cartesPlayer.indexOf(attaquant) + 1]
          }
          
        }
        defenseur = cartesPlayer2[entierAleatoire(0, cartesPlayer2.length -1)]
      }
      if (joueurAttaquant === false){
        nomAttaquant = "joueur2"
        nomDefenseur = "joueur"
        attaquant = cartesPlayer2[0]
        if (attaquant.atkDispo === false){
            if(attaquant === cartesPlayer2[cartesPlayer2.length -1]){
                attaquant = cartesPlayer2[0]
            }else{
                attaquant = cartesPlayer2[cartesPlayer2.indexOf(attaquant) + 1]
            }
            
        }
        defenseur = cartesPlayer[entierAleatoire(0, cartesPlayer.length -1)]
      }
      console.log(defenseur)
      console.log(nomAttaquant, "commence")
      console.log("la première carte de",nomAttaquant,attaquant.nom, "attaque la carte de",nomDefenseur, defenseur.nom )


      setCarteAttaquantId(attaquant.id);
      setCarteDefenseurId(defenseur.id);
     
      await sleep(400); // le temps de jouer l'anim
      setCarteAttaquantId(null);
      setCarteDefenseurId(null);

      console.log(attaquant.nom,"à",attaquant.hp, "pv. Il perd", defenseur.atk, "hp" )
      console.log(defenseur.nom,"à",defenseur.hp, "pv. Il perd", attaquant.atk, "hp" )

    attaquant.degatsRecus = defenseur.atk;
    defenseur.degatsRecus = attaquant.atk;
    
    attaquant.hp -= defenseur.atk;
    defenseur.hp -= attaquant.atk;

    degatsAdj(attaquant, defenseur, cartesPlayer, cartesPlayer2, nomDefenseur)
    
  
    attaquant.degatsRecus = 0;
    defenseur.degatsRecus = 0;

    console.log("pv restant de", attaquant.nom, ":", attaquant.hp, "pv" )
    console.log("pv restant de", defenseur.nom, ":", defenseur.hp, "pv" )
   
    if(attaquant.hp > 0 && nomAttaquant === "joueur"){
      attaquant.atkDispo = false
      if(cartesPlayer.length > 1){
          if(attaquant === cartesPlayer[cartesPlayer.length - 1]){
            cartesPlayer[0].atkDispo = true
          }else{
            cartesPlayer[cartesPlayer.indexOf(attaquant) + 1 ].atkDispo = true
          }
          
      }
      
  }

  if(attaquant.hp > 0 && nomAttaquant === "joueur2"){
      attaquant.atkDispo = false
      if(cartesPlayer2.length > 1){
          if(attaquant === cartesPlayer2[cartesPlayer2.length - 1]){
            cartesPlayer2[0].atkDispo = true
          }else{
            cartesPlayer2[cartesPlayer2.indexOf(attaquant) + 1 ].atkDispo = true
          }
      }
      

  }
  boardPositionFight(cartesPlayer)
  boardPositionFight(cartesPlayer2)
  

  await sleep(400);
  // 🔪 Ensuite on retire les cartes mortes
  cartesPlayer = cartesPlayer.filter(c => c.hp > 0);
  cartesPlayer2 = cartesPlayer2.filter(c => c.hp > 0);
  setBoardCombat([...cartesPlayer]);
  setBoardCombatPlayer2([...cartesPlayer2]);

    joueurAttaquant = !joueurAttaquant;
    await sleep(400);
    tourCombat ++
  }
  finDeCombat(cartesPlayer, cartesPlayer2, boardAvantCombat, boardAvantCombatPlayer2, lvlTaverne, lvlTavernePlayer2, setBoardPlayer, setBoardPlayer2, goldTour1, setgoldTour1, setGoldPlayer2, setplayerPv, setplayer2Pv, setGold, setShopCards, setActualPlayer, setPhase)


}
