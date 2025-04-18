import { coutLvlTaverne, coutLvlTavernePlayer2, getCartesAleatoires, getCartesPourShop, getNombreCartesShop, clonerCarte } from "@/utils/shopUtils1v1";
import { aoe, boardPositionFight, degatsAdj, oneTicDebutCombat, aoeCible } from "@/utils/mecaUtils";
import { playSound } from '@/utils/soundUtils';
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export  function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}
export async function TourCombat(nomAttaquant, attaquant, nomDefenseur, defenseur, setCarteAttaquantId, setCarteDefenseurId, setBoardCombat, setBoardCombatPlayer2, cartesPlayer, cartesPlayer2, sleep, boardPositionFight, setGriffeEffects){
  console.log(nomAttaquant, "commence")
  console.log("la première carte de",nomAttaquant,attaquant.nom, "attaque la carte de",nomDefenseur, defenseur.nom )

  playSound('sounds/impact.mp3'); // 👈 joue le son à chaque attaque
        setCarteAttaquantId(attaquant.id);
        setCarteDefenseurId(defenseur.id);
     
        await sleep(400); // le temps de jouer l'anim
        setCarteAttaquantId(null);
        setCarteDefenseurId(null);
        
        console.log(attaquant.nom,"à",attaquant.hp, "pv. Il perd", defenseur.atk, "hp" )
        console.log(defenseur.nom,"à",defenseur.hp, "pv. Il perd", attaquant.atk, "hp" )
        // 1. Appliquer les dégâts en premier
        attaquant.hp -= defenseur.atk;
        defenseur.hp -= attaquant.atk;
        
        // 2. Appliquer les effets visuels
        attaquant.degatsRecus = defenseur.atk;
        defenseur.degatsRecus = attaquant.atk;

        // 3. Mettre à jour les boards (React déclenche les useEffect dans Card.jsx)
        setBoardCombat([...cartesPlayer]);
        setBoardCombatPlayer2([...cartesPlayer2]);

        // 4. Attendre l'affichage
        await sleep(400);

        // 5. Réinitialiser les animations
        attaquant.degatsRecus = 0;
        defenseur.degatsRecus = 0;
        
        // 6. Re-update pour que les popup disparaissent
        setBoardCombat([...cartesPlayer]);
        setBoardCombatPlayer2([...cartesPlayer2]);
        
        

        if(attaquant.degatsAdj && attaquant.atkDispo === true){
          degatsAdj(attaquant, defenseur, cartesPlayer, cartesPlayer2, nomDefenseur, setGriffeEffects)
          await sleep(400);
          cartesPlayer.forEach(carte => {
            carte.degatsRecus =0
          });
          cartesPlayer2.forEach(carte => {
            carte.degatsRecus =0
          });

        }
    
  
        

        console.log("pv restant de", attaquant.nom, ":", attaquant.hp, "pv" )
        console.log("pv restant de", defenseur.nom, ":", defenseur.hp, "pv" )

        //Reatribution flag d'attaque après tour de combat
        if(nomAttaquant === "joueur"){
          attaquant.atkDispo = false
          if(cartesPlayer.length > 1){
            if(attaquant === cartesPlayer[cartesPlayer.length - 1]){
              cartesPlayer[0].atkDispo = true
            }else{
              cartesPlayer[cartesPlayer.indexOf(attaquant) + 1 ].atkDispo = true
            } 
          }else{
            cartesPlayer[0].atkDispo = true
          }   
        }

        if(cartesPlayer2.length > 1){
          if (defenseur.hp <= 0 && nomDefenseur === "joueur2" && defenseur.atkDispo === true && defenseur === cartesPlayer2[cartesPlayer2.length - 1] ){
            cartesPlayer2[0].atkDispo = true
          }
          if(defenseur.hp <= 0 && nomDefenseur === "joueur2" && defenseur.atkDispo === true && defenseur !== cartesPlayer2[cartesPlayer2.length - 1]){
            cartesPlayer2[cartesPlayer2.indexOf(defenseur) + 1 ].atkDispo = true
          }
        }else{
          cartesPlayer2[0].atkDispo = true
        }
        

    
        if(nomAttaquant === "joueur2"){
          attaquant.atkDispo = false
          if(cartesPlayer2.length > 1){
            if(attaquant === cartesPlayer2[cartesPlayer2.length - 1]){
              cartesPlayer2[0].atkDispo = true
            }else{
              cartesPlayer2[cartesPlayer2.indexOf(attaquant) + 1 ].atkDispo = true
            } 
          }else{
            cartesPlayer2[0].atkDispo = true
          }   
        }
        
        if(cartesPlayer.length > 1){
          if (defenseur.hp <= 0 && nomDefenseur === "joueur2" && defenseur.atkDispo === true && defenseur === cartesPlayer[cartesPlayer.length - 1] ){
            cartesPlayer[0].atkDispo = true
          }
          if(defenseur.hp <= 0 && nomDefenseur === "joueur2" && defenseur.atkDispo === true && defenseur !== cartesPlayer[cartesPlayer.length - 1]){
            cartesPlayer[cartesPlayer.indexOf(defenseur) + 1 ].atkDispo = true
          }
        }else{
          cartesPlayer[0].atkDispo = true
        }
        //Fin de reatribution flag d'attaque après tour de combat
        boardPositionFight(cartesPlayer)
        boardPositionFight(cartesPlayer2)
      
    
        await sleep(400);
        // 🔪 Ensuite on retire les cartes mortes
        // 1. Identifier les cartes mortes
        const cartesMortesPlayer = cartesPlayer.filter(c => c.hp <= 0);
        const cartesMortesPlayer2 = cartesPlayer2.filter(c => c.hp <= 0);
    
        // 2. Appeler les deathTrigger chez les survivants du même camp
        cartesMortesPlayer.forEach(carteMorte => {
          cartesPlayer.forEach(survivant => {
            if (survivant.deathTrigger) {
              survivant.deathTrigger(carteMorte, cartesPlayer, survivant);
            }
          });
        });
    
        cartesMortesPlayer2.forEach(carteMorte => {
          cartesPlayer2.forEach(survivant => {
            if (survivant.deathTrigger) {
              survivant.deathTrigger(carteMorte, cartesPlayer2, survivant);
            }
          });
        });
    
        // 3. Retirer les morts du board
        cartesPlayer = cartesPlayer.filter(c => c.hp > 0);
        cartesPlayer2 = cartesPlayer2.filter(c => c.hp > 0);
       
        // 4. Mettre à jour les boards affichés
        setBoardCombat([...cartesPlayer]);
        setBoardCombatPlayer2([...cartesPlayer2]);
        await sleep(400);
        cartesMortesPlayer.forEach(carteMorte => {
          if(carteMorte.reincarnation){
            carteMorte.hp = 1
            cartesPlayer.push(carteMorte); // 👈 on les remet directement dans cartesPlayer
            carteMorte.reincarnation = false
          }
        })
        setBoardCombat([...cartesPlayer]);
        await sleep(400);

        return {
          cartesPlayer,
          cartesPlayer2
        };
}

export async function finDeCombat(cartesPlayer, cartesPlayer2, boardAvantCombat, boardAvantCombatPlayer2, lvlTaverne, lvlTavernePlayer2, setBoardPlayer, setBoardPlayer2, goldTour1, setgoldTour1, setGoldPlayer2, setplayerPv, setplayer2Pv, setGold, setShopCards, setActualPlayer, setPhase, playerPv, player2Pv, navigate){
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
async function retirerCartesMortes(cartes) {
  return cartes.filter(c => c.hp > 0);
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
  setActualPlayer,
  setAnimAoEVisuelle,
  setProjectileAnim,
  setGriffeEffects
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
    finDeCombat(cartesPlayer, cartesPlayer2, boardAvantCombat, boardAvantCombatPlayer2, lvlTaverne, lvlTavernePlayer2, setBoardPlayer, setBoardPlayer2, goldTour1, setgoldTour1, setGoldPlayer2, setplayerPv, setplayer2Pv, setGold, setShopCards, setActualPlayer, setPhase, playerPv, player2Pv, navigate)
    return;
  }
  //Effet debut de combat//
  // verif si aoe
  let aoePresent1 = cartesPlayer.findIndex(carte => carte.aoe)
  let aoePresent2 = cartesPlayer2.findIndex(carte => carte.aoe)
  //aoe//
  if(aoePresent1 >= 0 || aoePresent2 >= 0 ){
   
  const aoeResult = await aoe(cartesPlayer, cartesPlayer2);
  // déclenchement visuel
  setAnimAoEVisuelle(true);
  await sleep(600);
  setAnimAoEVisuelle(false);
  
  setBoardCombat([...cartesPlayer]);
  setBoardCombatPlayer2([...cartesPlayer2]);
  
  cartesPlayer = aoeResult.cartesPlayer;
  cartesPlayer2 = aoeResult.cartesPlayer2;
  cartesPlayer.forEach(carte => {
    carte.degatsRecus = 0
  });
  cartesPlayer2.forEach(carte => {
    carte.degatsRecus = 0
  });


  // 💀 Déclencher les deathTriggers post-AoE
  aoeResult.mortsPlayer.forEach(carteMorte => {
    cartesPlayer.forEach(survivant => {
      if (survivant.deathTrigger) {
        survivant.deathTrigger(carteMorte, cartesPlayer, survivant);
      }
    });
  });

  aoeResult.mortsPlayer2.forEach(carteMorte => {
    cartesPlayer2.forEach(survivant => {
      if (survivant.deathTrigger) {
        survivant.deathTrigger(carteMorte, cartesPlayer2, survivant);
      }
    });
  });
  ;
  // Mise à jour des boards après buffs
  setBoardCombat([...cartesPlayer]);
  setBoardCombatPlayer2([...cartesPlayer2]);
  await sleep(1000);
  }
  //fin aoe//

  // verif si oneTicDebutCombat
  let oneTicDebutCombatPresent1 = cartesPlayer.findIndex(carte => carte.oneTicDebutCombat)
  let oneTicDebutCombatPresent2 = cartesPlayer2.findIndex(carte => carte.oneTicDebutCombat)
  // oneTicDebutCombat
  if(oneTicDebutCombatPresent1 >= 0){
    await oneTicDebutCombat(cartesPlayer, cartesPlayer2, setProjectileAnim); // Applique les dégâts
    await sleep(600)
    setBoardCombatPlayer2([...cartesPlayer2]); // Affiche dégâts subis
    const oneTicResult1 = await retirerCartesMortes(cartesPlayer2); // à toi de créer cette fonction
    cartesPlayer2.forEach(carte => {
      carte.degatsRecus = 0
    });
    cartesPlayer2 = oneTicResult1;
    setBoardCombatPlayer2([...cartesPlayer2]);
    await sleep(600);
  }
  if(oneTicDebutCombatPresent2 >= 0){
    // Idem côté joueur 2
    await oneTicDebutCombat(cartesPlayer2, cartesPlayer, setProjectileAnim);
    setBoardCombat([...cartesPlayer]);
    await sleep(600);
    const oneTicResult2 = await retirerCartesMortes(cartesPlayer);
    cartesPlayer.forEach(carte => {
      carte.degatsRecus = 0
    });
    cartesPlayer = oneTicResult2;
    setBoardCombat([...cartesPlayer]);
    await sleep(600);
  }
  //Fin oneTicDebutCombat
  
  // verif si aoeCible
  let aoeCiblePresent1 = cartesPlayer.findIndex(carte => carte.aoeCible)
  let aoeCiblePresent2 = cartesPlayer2.findIndex(carte => carte.aoeCible)
  //aoe//
  if(aoeCiblePresent1 >= 0 || aoeCiblePresent2 >= 0 ){
   
    const aoeCibleResult = await aoeCible(cartesPlayer, cartesPlayer2);
    // déclenchement visuel
    setAnimAoEVisuelle(true);
    await sleep(600);
    setAnimAoEVisuelle(false);
    setBoardCombat([...cartesPlayer]);
    setBoardCombatPlayer2([...cartesPlayer2]);
    
    cartesPlayer = aoeCibleResult.cartesPlayer;
    cartesPlayer2 = aoeCibleResult.cartesPlayer2;
    cartesPlayer.forEach(carte => {
      carte.degatsRecus = 0
    });
    cartesPlayer2.forEach(carte => {
      carte.degatsRecus = 0
    });
    // Mise à jour des boards après buffs
    setBoardCombat([...cartesPlayer]);
    setBoardCombatPlayer2([...cartesPlayer2]);
    await sleep(400);
  }
  //fin aoe//

 

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
          cartesPlayer.forEach((carte) => {
            if(carte.atkDispo === true){
              attaquant = carte
            }
          })  
        }      
        // attribution du defenseur
        const defenseurProvoc = cartesPlayer2.filter(c => c.provocationUse);
        console.log(defenseurProvoc)
        if (defenseurProvoc.length > 0){
          defenseur = defenseurProvoc[Math.floor(Math.random() * defenseurProvoc.length)];
        }else{
          defenseur = cartesPlayer2[entierAleatoire(0, cartesPlayer2.length -1)]
        }        
      }
      if (joueurAttaquant === false){
        nomAttaquant = "joueur2"
        nomDefenseur = "joueur"
        attaquant = cartesPlayer2[0]
        if (attaquant.atkDispo === false){
          cartesPlayer2.forEach((carte) => {
            if(carte.atkDispo === true){
              attaquant = carte
            }
          })    
        }
        
        // attribution du defenseur
        const defenseurProvoc = cartesPlayer.filter(c => c.provocationUse);
        console.log(defenseurProvoc)
        if (defenseurProvoc.length > 0){
          defenseur = defenseurProvoc[Math.floor(Math.random() * defenseurProvoc.length)];
        }else{
          defenseur = cartesPlayer[entierAleatoire(0, cartesPlayer.length -1)]
        }
      }
      console.log(defenseur)

      //tour de combat
      if(attaquant.furieUse){

        ({ cartesPlayer, cartesPlayer2 }  = await TourCombat(nomAttaquant, attaquant, nomDefenseur, defenseur, setCarteAttaquantId, setCarteDefenseurId, setBoardCombat, setBoardCombatPlayer2, cartesPlayer, cartesPlayer2, sleep, boardPositionFight, setGriffeEffects))

        if(cartesPlayer.length > 0 && cartesPlayer2.length > 0 && attaquant.hp > 0){
          if (joueurAttaquant === true){
            // attribution du defenseur
            const defenseurProvoc1 = cartesPlayer2.filter(c => c.provocation);
            if (defenseurProvoc1.length > 0){
              defenseur = defenseurProvoc1[Math.floor(Math.random() * defenseurProvoc1.length)];
            }else{
              defenseur = cartesPlayer2[entierAleatoire(0, cartesPlayer2.length -1)]
            }
          }
          if (joueurAttaquant === false){
            // attribution du defenseur
            const defenseurProvoc1 = cartesPlayer.filter(c => c.provocation);
            if (defenseurProvoc1.length > 0){
              defenseur = defenseurProvoc1[Math.floor(Math.random() * defenseurProvoc1.length)];
            }else{
              defenseur = cartesPlayer[entierAleatoire(0, cartesPlayer.length -1)]
            }
          }
          console.log(nomAttaquant, "attaque une deuxieme fois");

          ({ cartesPlayer, cartesPlayer2 }  = await TourCombat(nomAttaquant, attaquant, nomDefenseur, defenseur, setCarteAttaquantId, setCarteDefenseurId, setBoardCombat, setBoardCombatPlayer2, cartesPlayer, cartesPlayer2, sleep, boardPositionFight, setGriffeEffects))
        }
      }else{
        ({ cartesPlayer, cartesPlayer2 }  = await TourCombat(nomAttaquant, attaquant, nomDefenseur, defenseur, setCarteAttaquantId, setCarteDefenseurId, setBoardCombat, setBoardCombatPlayer2, cartesPlayer, cartesPlayer2, sleep, boardPositionFight, setGriffeEffects))
      }

      

    //fin tour de combat
   



    joueurAttaquant = !joueurAttaquant;
    await sleep(400);
    tourCombat ++
  }
  finDeCombat(cartesPlayer, cartesPlayer2, boardAvantCombat, boardAvantCombatPlayer2, lvlTaverne, lvlTavernePlayer2, setBoardPlayer, setBoardPlayer2, goldTour1, setgoldTour1, setGoldPlayer2, setplayerPv, setplayer2Pv, setGold, setShopCards, setActualPlayer, setPhase, playerPv, player2Pv, navigate)


}
