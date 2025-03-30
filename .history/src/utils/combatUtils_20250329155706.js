import { acheterCarteIA, coutLvlTaverne } from "@/utils/shopUtils";
import { cards } from "@/data/cardsData";
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


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
  goldIA,
  setGoldIA,
  setPvIA,
  setMessageCombat,
  setPhase,
  setBoardCombat,
  setBoardCombatIA,
  setCarteAttaquantId,
  setCarteDefenseurId,
  goldTour1,
  setgoldTour1,
  setGold
}) {
  console.log("⚔️ Combat lancé !");
  acheterCarteIA ({ cards, goldIA, setGoldIA, boardIA, setBoardIA })
  console.log(boardIA)

  const boardAvantCombat = boardPlayer.map(carte => ({ ...carte }));
  const boardAvantCombatIA = boardIA.map(carte => ({ ...carte }));
  console.log("📌 Sauvegarde du board avant combat :", boardAvantCombat);
  console.log("📌 Sauvegarde du board IA avant combat :", boardAvantCombatIA);


  let cartesJoueur = [...boardPlayer];
  let cartesIA = [...boardIA];
  setBoardCombat([...cartesJoueur]);
  setBoardCombatIA([...cartesIA]);
  await sleep(1000);

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
        if (carteOriginale) carte.hp = carteOriginale.hp;
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
  // Restauration des boards à l'identique
setBoardPlayer(boardAvantCombat);
setBoardIA(boardAvantCombatIA);
setgoldTour1(prev => prev + 1)
setGoldIA(goldTour1)
setGold(goldTour1)

coutLvlTaverne[lvlTaverne]--;
}
