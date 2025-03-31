export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getProchaineCarteDispo = (board) => {
    const carte = board.find(c => c.atkDispo === true);
    if (!carte) {
      console.warn("⚠️ Aucune carte dispo pour attaquer !");
      return board[0] || null;
    }
    return carte;
  };
  function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}
  

export async function deroulerCombatReact({
  boardPlayer,
  setBoardPlayer,
  boardIA,
  setBoardIA,
  lvlTaverne,
  playerPv,
  setplayerPv,
  pvIA,
  setPvIA,
  setMessageCombat,
  setPhase,
  setBoardCombat,
  setBoardCombatIA,
  setCarteAttaquantId,
  setCarteDefenseurId,
}) {
  console.log("⚔️ Combat lancé !");
  

  const boardAvantCombat = boardPlayer.map(carte => ({ ...carte }));
  const boardAvantCombatIA = boardIA.map(carte => ({ ...carte }));
  console.log("📌 Sauvegarde du board avant combat :", boardAvantCombat);
  console.log("📌 Sauvegarde du board IA avant combat :", boardAvantCombatIA);

 
  let cartesJoueur = [...boardAvantCombat];
  let cartesIA = [...boardAvantCombatIA];
  setBoardCombat([...cartesJoueur]);
  setBoardCombatIA([...cartesIA]);

  if (cartesJoueur.length === 0 || cartesIA.length === 0) {
    setMessageCombat("❌ Combat impossible : un des deux boards est vide !");
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
    let defenseur = joueurAttaquant
      ? cartesIA[Math.floor(Math.random() * cartesIA.length)]
      : cartesJoueur[Math.floor(Math.random() * cartesJoueur.length)];
    if (!attaquant || !defenseur) break;
    console.log(`${joueurAttaquant ? "Joueur" : "IA"} attaque !`);
    setBoardCombat([...cartesJoueur]);
    setBoardCombatIA([...cartesIA]);

 


    setCarteAttaquantId(attaquant.id);
    setCarteDefenseurId(defenseur.id);
   
    await sleep(400); // le temps de jouer l'anim
    setCarteAttaquantId(null);
    setCarteDefenseurId(null);
    attaquant.degatsRecus = defenseur.atk;
    defenseur.degatsRecus = attaquant.atk;
    
    attaquant.hp -= defenseur.atk;
    defenseur.hp -= attaquant.atk;
    
  
    attaquant.degatsRecus = 0;
    defenseur.degatsRecus = 0;

    await sleep(300)
    console.log(attaquant.nom, "attaque", defenseur.nom, attaquant.nom, "perd", defenseur.atk, "pv, et", defenseur.nom, "perd", attaquant.atk, "pv" );
  
    console.log("Après attaque :");
    console.log("Attaquant :", attaquant.nom, attaquant.hp);
    console.log("Défenseur :", defenseur.nom, defenseur.hp);
   
// 🌀 D’abord gérer la rotation tant que les cartes sont encore là
if (joueurAttaquant && cartesJoueur.length > 1) {
    const index = cartesJoueur.indexOf(attaquant);
    if (index !== -1) cartesJoueur[index].atkDispo = false;
    const prochain = (index + 1) % cartesJoueur.length;
    cartesJoueur[prochain].atkDispo = true;
  }
  
  if (!joueurAttaquant && cartesIA.length > 1) {
    const index = cartesIA.indexOf(attaquant);
    if (index !== -1) cartesIA[index].atkDispo = false;
    const prochain = (index + 1) % cartesIA.length;
    cartesIA[prochain].atkDispo = true;
  }

  
  // 🔪 Ensuite on retire les cartes mortes
  cartesJoueur = cartesJoueur.filter(c => c.hp > 0);
  cartesIA = cartesIA.filter(c => c.hp > 0);
  await sleep(300);
    // Gérer la rotation des attaques
if (joueurAttaquant && cartesJoueur.length > 0) {
    const index = cartesJoueur.indexOf(attaquant);
    if (index !== -1) cartesJoueur[index].atkDispo = false;
  
    if (cartesJoueur.length > 1) {
      const prochain = (index + 1) % cartesJoueur.length;
      cartesJoueur[prochain].atkDispo = true;
    }
  }
  
  if (!joueurAttaquant && cartesIA.length > 0) {
    const index = cartesIA.indexOf(attaquant);
    if (index !== -1) cartesIA[index].atkDispo = false;
  
    if (cartesIA.length > 1) {
      const prochain = (index + 1) % cartesIA.length;
      cartesIA[prochain].atkDispo = true;
    }
  }
  

    console.log("Cartes restantes J:", cartesJoueur.length);
    console.log("Cartes restantes IA:", cartesIA.length);

    joueurAttaquant = !joueurAttaquant;
    await sleep(400);
  }

  // Fin du combat
  const survivantsJoueur = cartesJoueur.filter(c => c.hp > 0);
  const survivantsIA = cartesIA.filter(c => c.hp > 0);

  if (survivantsJoueur.length === 0 && survivantsIA.length === 0) {
    setMessageCombat("⚖️ Match nul !");
  } else {
    const degats = lvlTaverne + (survivantsJoueur.length || survivantsIA.length);
    if (survivantsJoueur.length > 0) {
      setPvIA(prev => prev - degats);
      setMessageCombat(`🏆 Victoire ! L'IA perd ${degats} PV`);
    } else {
      setplayerPv(prev => prev - degats);
      setMessageCombat(`❌ Défaite ! Le joueur perd ${degats} PV`);
    }
  }


  
// Restauration des boards à l'identique
setBoardPlayer(boardAvantCombat);
setBoardIA(boardAvantCombatIA);

  // Retour au shop après petit délai
  await sleep(1000);
  setPhase("shop");
}
