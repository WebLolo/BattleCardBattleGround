async function deroulerCombat() {
    console.log("⚔️ Début du combat !");

    // 📌 Sauvegarde des buffs AVANT le combat
    cartesBoard.forEach(carte => {
        carte.buffHp = carte.hp - (cartes.find(c => c.id === carte.id)?.hp || 0);
        carte.buffAtk = carte.atk - (cartes.find(c => c.id === carte.id)?.atk || 0);
    });
    
    cartesBoardIA.forEach(carte => {
        carte.buffHp = carte.hp - (cartes.find(c => c.id === carte.id)?.hp || 0);
        carte.buffAtk = carte.atk - (cartes.find(c => c.id === carte.id)?.atk || 0);
    });
    

    

    let joueurCommence = Math.random() < 0.5;
    console.log(joueurCommence ? "🔄 Le joueur commence !" : "🔄 L'IA commence !");


    let cartesJoueur = cartesBoard.map(carte => ({ ...carte }));
    let cartesIA = cartesBoardIA.map(carte => ({ ...carte }));
    majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
    let indexTour = 0;

    while (cartesJoueur.length > 0 && cartesIA.length > 0) {
        let attaquant = joueurCommence ? cartesJoueur : cartesIA;
        let defenseur = joueurCommence ? cartesIA : cartesJoueur;

        if (indexTour >= attaquant.length) indexTour = 0;
        let carteAttaquante = attaquant[indexTour];

        if (!carteAttaquante || carteAttaquante.hp <= 0) {
            indexTour++;
            continue;
        }

        let cibleValide = defenseur.filter(c => c.hp > 0 && c.camp !== attaquant[0].camp);

        console.log("🔍 Vérification des cibles :", defenseur);

        if (cibleValide.length === 0) {
            console.error("🚨 Erreur : Aucune cible valide trouvée !");
            console.error("📌 Board joueur :", cartesBoard);
            console.error("📌 Board IA :", cartesBoardIA);
            return; 
        }
        if (cibleValide.length === 0) {
            console.log("🚨 Aucune cible disponible, fin du combat.");
            break;
        }
        

        // Sélectionner une cible au hasard parmi les ennemis
        let cibleIndex = Math.floor(Math.random() * cibleValide.length);
        let carteCible = cibleValide[cibleIndex];

        if (!carteCible || carteCible.hp <= 0 || carteCible.camp === carteAttaquante.camp) {
            console.error(`🚨 ERREUR CRITIQUE : ${carteAttaquante.nom} tente d'attaquer une alliée (${carteCible.nom}) !`);
            continue; // Ignore l'attaque et passe à la suivante
        }


        console.log(`🎯 [DEBUG] ${carteAttaquante.nom} attaque ${carteCible.nom} - Camp ${joueurCommence ? "IA" : "Joueur"}`);


        

        // Lancer l'animation AVANT d'appliquer les dégâts
        await new Promise(resolve => animerAttaque(carteAttaquante, carteCible, resolve));

        // Appliquer les dégâts après l'animation
        carteAttaquante.hp -= carteCible.atk;
        carteCible.hp -= carteAttaquante.atk;

        console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
        console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);

        majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
        await sleep(500);

        if (carteAttaquante.hp <= 0) {
            console.log(`❌ ${carteAttaquante.nom} est éliminé temporairement !`);
            attaquant.splice(indexTour, 1);
        }

        if (carteCible.hp <= 0) {
            console.log(`❌ ${carteCible.nom} est éliminé temporairement !`);
            defenseur.splice(cibleIndex, 1);
        }

        majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
        await sleep(500);

        indexTour++;
        joueurCommence = !joueurCommence;
    }

    console.log("⚔️ Combat terminé !");

    let joueurGagne = cartesJoueur.length > 0;
    let iaGagne = cartesIA.length > 0;

    if (!joueurGagne && !iaGagne) {
        console.log("⚖️ Match nul ! Aucun PV perdu.");
        afficherPopup("⚖️ Match nul !");
    } else {
        let cartesRestantes = joueurGagne ? cartesJoueur.length : cartesIA.length;
        let degats = lvlTaverne + cartesRestantes;

        if (joueurGagne) {
            personnageIA.hp -= degats;
            console.log(`💀 L'IA perd ${degats} PV ! Il lui reste ${personnageIA.hp} PV.`);
        } else {
            personnageJoueur.hp -= degats;
            console.log(`💀 Le joueur perd ${degats} PV ! Il lui reste ${personnageJoueur.hp} PV.`);
        }

        // 📌 ✅ Mise à jour de l'affichage des PV
        document.querySelector("#playerPv").textContent = personnageJoueur.hp;
        document.querySelector("#playerPvIA").textContent = personnageIA.hp;
    }

    // 📌 Sauvegarde des cartes pour le prochain tour
    boardAvantCombat = cartesBoard.map(carte => ({ ...carte }));
    boardAvantCombatIa = cartesBoardIA.map(carte => ({ ...carte }));

    console.log("🔄 Cartes sauvegardées pour le prochain tour !");

    // 📢 Déterminer le message du combat
    let messageCombat = "⚔️ Combat terminé ! ";
    if (cartesJoueur.length > 0 && cartesIA.length === 0) {
        messageCombat += "🏆 Victoire ! Vous avez gagné ce combat !";
    } else if (cartesIA.length > 0 && cartesJoueur.length === 0) {
    messageCombat += "❌ Défaite ! Vous avez perdu ce combat !";
    } else {
    messageCombat += "⚖️ Égalité ! Personne ne gagne ce combat.";
    }

    // 🏆 Affichage de la pop-up
    afficherPopup(messageCombat);

    document.querySelector(".nextPhaseButton").innerHTML = `
    <button class="btn btn-success" onclick="phaseShop()">Prochain tour</button>
    `;
    orTour1 += 1;
    orJoueur = orTour1;
    orIA = orTour1;
    coutLvlTaverne[lvlTaverne]--
}