import { coutLvlTaverne, getCartesAleatoires, getCartesPourShop, getNombreCartesShop, clonerCarte } from "@/utils/shopUtils1v1";
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

  

export async function deroulerCombatReact({
  boardPlayer,
  setBoardPlayer,
  boardPlayer2,
  setBoardPlayer2,
  lvlTaverne,
  lvlTavernePlayer2,
  playerPv,
  setplayerPv,
  pvPlayer2,
  goldPlayer2,
  setGoldPlayer2,
  setPvPlayer2,
  setPhase,
  setBoardCombat,
  setBoardCombatPlayer2,
  setCarteAttaquantId,
  setCarteDefenseurId,
  goldTour1,
  setgoldTour1,
  setGold,
  setShopCards,
  navigate
}) {
  console.log("⚔️ Combat lancé !");

  const boardAvantCombat = boardPlayer.map(carte => ({ ...carte }));
  const boardAvantCombatPlayer2 = boardPlayer2.map(carte => ({ ...carte }));
  console.log("📌 Sauvegarde du board Player 1 avant combat :", boardAvantCombat);
  console.log("📌 Sauvegarde du board Player 2 avant combat :", boardAvantCombatPlayer2);


  let cartesJoueur = [...boardPlayer];
  let cartesPlayer2 = [...boardPlayer2];
  setBoardCombat([...cartesJoueur]);
  setBoardCombatPlayer2([...cartesPlayer2]);
  await sleep(1200);

  if (cartesJoueur.length === 0 || cartesIA.length === 0) {
    alert("❌ Combat impossible : un des deux boards est vide !");
    return;
  }

  let tirageAuSort = Math.random() < 0.5;
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
  cartesJoueur[0].atkDispo = true;
  cartesIA[0].atkDispo = true;

  while (cartesJoueur.length > 0 && cartesIA.length > 0) {
    console.log("TOUR", tourCombat)
    let attaquant = joueurAttaquant
      if (joueurAttaquant === true){
        nomAttaquant = "joueur"
        nomDefenseur = "ia"
        attaquant = cartesJoueur[0]
        if (attaquant.atkDispo === false){
          if(attaquant === cartesJoueur[cartesJoueur.length -1]){
              attaquant = cartesJoueur[0]
          }else{
              attaquant = cartesJoueur[cartesJoueur.indexOf(attaquant) + 1]
          }
          
        }
        defenseur = cartesIA[entierAleatoire(0, cartesIA.length -1)]
      }
      if (joueurAttaquant === false){
        nomAttaquant = "ia"
        nomDefenseur = "joueur"
        attaquant = cartesIA[0]
        if (attaquant.atkDispo === false){
            if(attaquant === cartesIA[cartesIA.length -1]){
                attaquant = cartesIA[0]
            }else{
                attaquant = cartesIA[cartesIA.indexOf(attaquant) + 1]
            }
            
        }
        defenseur = cartesJoueur[entierAleatoire(0, cartesJoueur.length -1)]
      } 
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
    
  
    attaquant.degatsRecus = 0;
    defenseur.degatsRecus = 0;

    console.log("pv restant de", attaquant.nom, ":", attaquant.hp, "pv" )
    console.log("pv restant de", defenseur.nom, ":", defenseur.hp, "pv" )
   
    if(attaquant.hp > 0 && nomAttaquant === "joueur"){
      attaquant.atkDispo = false
      if(cartesJoueur.length > 1){
          if(attaquant === cartesJoueur[cartesJoueur.length - 1]){
              cartesJoueur[0].atkDispo = true
          }else{
              cartesJoueur[cartesJoueur.indexOf(attaquant) + 1 ].atkDispo = true
          }
          
      }
      
  }

  if(attaquant.hp > 0 && nomAttaquant === "ia"){
      attaquant.atkDispo = false
      if(cartesIA.length > 1){
          if(attaquant === cartesIA[cartesIA.length - 1]){
              cartesIA[0].atkDispo = true
          }else{
              cartesIA[cartesIA.indexOf(attaquant) + 1 ].atkDispo = true
          }
      }
      

  }

  await sleep(400);
  // 🔪 Ensuite on retire les cartes mortes
  cartesJoueur = cartesJoueur.filter(c => c.hp > 0);
  cartesIA = cartesIA.filter(c => c.hp > 0);
  setBoardCombat([...cartesJoueur]);
  setBoardCombatIA([...cartesIA]);


    joueurAttaquant = !joueurAttaquant;
    await sleep(400);
    tourCombat ++
  }
  console.log("⚔️ Combat terminé !");
      // **Réinitialisation des PV après combat avec les buffs**
      cartesJoueur.forEach((carte) => {
        let carteOriginale = boardAvantCombat.find(c => c.id === carte.id);
        if (carteOriginale) 
          carte.hp = carteOriginale.hp,
          carte.buffHp = carteOriginale.buffHp,
          carte.buffAtk = carteOriginale.buffAtk,
          carte.auraEffect = carteOriginale.auraEffect
        ;
    });

    cartesIA.forEach((carte) => {
        let carteOriginale = boardAvantCombatIA.find(c => c.id === carte.id);
        if (carteOriginale) carte.hp = carteOriginale.hp;
    });

  // Fin du combat
  const survivantsJoueur = cartesJoueur.filter(c => c.hp > 0);
  const survivantsIA = cartesIA.filter(c => c.hp > 0);

  if (survivantsJoueur.length === 0 && survivantsIA.length === 0) {
    alert("⚖️ Match nul !");
  } else {
    const degats = lvlTaverne + (survivantsJoueur.length || survivantsIA.length);
    if (survivantsJoueur.length > 0) {
      setPvIA(prev => prev - degats);
      alert(`🏆 Victoire ! L'IA perd ${degats} PV`);
    } else {
      setplayerPv(prev => prev - degats);
      alert(`❌ Défaite ! Le joueur perd ${degats} PV`);
    }
  }
  console.log(boardAvantCombat)
  // Restauration des boards à l'identique
  setBoardPlayer(
    boardAvantCombat.map(carte => clonerCarte({ carte, camp: "joueur" }))
  );
  setBoardIA(
    boardAvantCombatIA.map(carte => clonerCarte({ carte, camp: "ia" }))
  );
  if (playerPv - (survivantsIA.length > 0 ? (lvlTaverne + survivantsIA.length) : 0) <= 0) {
    alert("💀 Le joueur a perdu la partie !");
    navigate("/#/menu"); // redirection vers ta page Menu.jsx
    return;
  }
  
  if (pvIA - (survivantsJoueur.length > 0 ? (lvlTaverne + survivantsJoueur.length) : 0) <= 0) {
    alert("🏆 Le joueur a gagné la partie !");
    navigate("/#/menu"); // redirection vers ta page Menu.jsx
    return;
  }
const nouveauGold = Math.min(goldTour1 + 1, 10);
setgoldTour1(nouveauGold)
setGoldIA(nouveauGold)
setGold(nouveauGold)
const cartesAleatoires = getCartesAleatoires(getCartesPourShop(lvlTaverne), getNombreCartesShop(lvlTaverne));
setShopCards(cartesAleatoires.map(carte => clonerCarte({ carte, camp: "joueur" })))

coutLvlTaverne[lvlTaverne]--;
}
