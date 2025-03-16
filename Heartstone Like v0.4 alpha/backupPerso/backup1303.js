async function deroulerCombat() {
    console.log("⚔️ Début du combat !");

    // 📌 Sauvegarde AVANT le combat des buffs et des stats d'origine
    boardAvantCombat = cartesBoard.map(carte => ({ ...carte }));
    boardAvantCombatIa = cartesBoardIA.map(carte => ({ ...carte }));

    console.log("📌 Sauvegarde du board avant combat :", boardAvantCombat);
    console.log("📌 Sauvegarde du board IA avant combat :", boardAvantCombatIa);

    console.log("🔄 L'ordre d'attaque sera : Joueur -> IA -> Joueur -> IA");

    let cartesJoueur = [...cartesBoard];
    let cartesIA = [...cartesBoardIA];
    majAffichageBoardPendantCombat(cartesJoueur, cartesIA);

    // **🔄 Déterminer qui commence**
    let joueurCommence = Math.random() < 0.5;
    console.log(joueurCommence ? "🔄 Le joueur commence !" : "🔄 L'IA commence !");

    while (cartesJoueur.some(c => c.hp > 0) && cartesIA.some(c => c.hp > 0)) {
        let attaquant = joueurCommence ? cartesJoueur : cartesIA;
        let defenseur = joueurCommence ? cartesIA : cartesJoueur;

        // **Trouver une carte en vie dans le camp attaquant**
        let carteAttaquante = attaquant.find(c => c.hp > 0);
        let cibleValide = defenseur.filter(c => c.hp > 0);

        if (!carteAttaquante || cibleValide.length === 0) {
            // Si aucun attaquant en vie ou aucune cible disponible, on change de tour
            joueurCommence = !joueurCommence;
            continue;
        }

        // **Sélectionner une cible aléatoire parmi les vivants**
        let carteCible = cibleValide[Math.floor(Math.random() * cibleValide.length)];

        console.log(`🎯 ${carteAttaquante.nom} attaque ${carteCible.nom} - Camp ${joueurCommence ? "IA" : "Joueur"}`);

        await new Promise(resolve => animerAttaque(carteAttaquante, carteCible, resolve));

        // **Appliquer les dégâts**
        carteAttaquante.hp -= carteCible.atk;
        carteCible.hp -= carteAttaquante.atk;

        console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
        console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);

        majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
        await sleep(500);

        // **Éliminer les cartes mortes VISUELLEMENT**
        if (carteAttaquante.hp <= 0) {
            console.log(`❌ ${carteAttaquante.nom} est éliminé temporairement !`);
            supprimerCarteVisuellement(carteAttaquante, joueurCommence ? "joueur" : "ia");
            attaquant.splice(attaquant.indexOf(carteAttaquante), 1);
        }

        if (carteCible.hp <= 0) {
            console.log(`❌ ${carteCible.nom} est éliminé temporairement !`);
            supprimerCarteVisuellement(carteCible, joueurCommence ? "ia" : "joueur");
            defenseur.splice(defenseur.indexOf(carteCible), 1);
        }

        majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
        await sleep(500);

        // **Alterner le tour** (Joueur -> IA -> Joueur -> IA)
        joueurCommence = !joueurCommence;
    }

    console.log("⚔️ Combat terminé !");

    let cartesRestantesJoueur = cartesJoueur.filter(c => c.hp > 0);
    let cartesRestantesIA = cartesIA.filter(c => c.hp > 0);

    if (cartesRestantesJoueur.length === 0 && cartesRestantesIA.length === 0) {
        console.log("⚖️ Match nul ! Aucun PV perdu.");
        afficherPopup("⚖️ Match nul !");
    } else {
        let cartesRestantes = cartesRestantesJoueur.length || cartesRestantesIA.length;
        let degats = lvlTaverne + cartesRestantes;

        if (cartesRestantesJoueur.length > 0) {
            personnageIA.hp -= degats;
            console.log(`💀 L'IA perd ${degats} PV ! Il lui reste ${personnageIA.hp} PV.`);
            afficherPopup("🏆 Victoire ! Vous avez gagné ce combat !");
        } else {
            personnageJoueur.hp -= degats;
            console.log(`💀 Le joueur perd ${degats} PV ! Il lui reste ${personnageJoueur.hp} PV.`);
            afficherPopup("❌ Défaite ! Vous avez perdu ce combat !");
        }

        document.querySelector("#playerPv").textContent = personnageJoueur.hp;
        document.querySelector("#playerPvIA").textContent = personnageIA.hp;
    }

    console.log("🔄 Cartes sauvegardées pour le prochain tour :", boardAvantCombat, boardAvantCombatIa);

    document.querySelector(".nextPhaseButton").innerHTML = `
        <button class="btn btn-success" onclick="phaseShop()">Prochain tour</button>
    `;

    orTour1 += 1;
    orJoueur = orTour1;
    orIA = orTour1;
    coutLvlTaverne[lvlTaverne]--;
}








async function deroulerCombat() {
    console.log("⚔️ Début du combat !");

    // 📌 Sauvegarde AVANT le combat des buffs et des stats d'origine
    let boardAvantCombat = cartesBoard.map(carte => ({ ...carte }));
    let boardAvantCombatIa = cartesBoardIA.map(carte => ({ ...carte }));

    console.log("📌 Sauvegarde du board avant combat :", boardAvantCombat);
    console.log("📌 Sauvegarde du board IA avant combat :", boardAvantCombatIa);

    let cartesJoueur = [...cartesBoard];
    let cartesIA = [...cartesBoardIA];
    majAffichageBoardPendantCombat(cartesJoueur, cartesIA);

    // **🔄 Déterminer qui commence**
    let joueurCommence = Math.random() < 0.5;
    console.log(joueurCommence ? "🔄 Le joueur commence !" : "🔄 L'IA commence !");

    let indexJoueur = 0, indexIA = 0;

    // 🔄 **Tant que les deux joueurs ont encore des cartes vivantes, le combat continue**
    while (cartesJoueur.some(c => c.hp > 0) && cartesIA.some(c => c.hp > 0)) {
        console.log(`🌀 Début d'un nouveau tour de combat`);

        if (joueurCommence) {
            // Tour du joueur
            if (indexJoueur < cartesJoueur.length && cartesJoueur[indexJoueur].hp > 0) {
                let carteAttaquante = cartesJoueur[indexJoueur];
                let cibleValide = cartesIA.filter(c => c.hp > 0);

                if (cibleValide.length > 0) {
                    let carteCible = cibleValide[0]; // Toujours attaquer la première carte vivante
                    console.log(`🎯 ${carteAttaquante.nom} attaque ${carteCible.nom} - Camp IA`);
                    
                    await new Promise(resolve => animerAttaque(carteAttaquante, carteCible, resolve));

                    // **Appliquer les dégâts**
                    carteAttaquante.hp -= carteCible.atk;
                    carteCible.hp -= carteAttaquante.atk;

                    console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
                    console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);

                    majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
                    await sleep(500);

                    // **Éliminer les cartes mortes VISUELLEMENT**
                    if (carteAttaquante.hp <= 0) {
                        console.log(`❌ ${carteAttaquante.nom} est éliminé temporairement !`);
                        supprimerCarteVisuellement(carteAttaquante, "joueur");
                    }

                    if (carteCible.hp <= 0) {
                        console.log(`❌ ${carteCible.nom} est éliminé temporairement !`);
                        supprimerCarteVisuellement(carteCible, "ia");
                    }
                }
                indexJoueur++; // Passer à la prochaine carte
            }
        } else {
            // Tour de l'IA
            if (indexIA < cartesIA.length && cartesIA[indexIA].hp > 0) {
                let carteAttaquante = cartesIA[indexIA];
                let cibleValide = cartesJoueur.filter(c => c.hp > 0);

                if (cibleValide.length > 0) {
                    let carteCible = cibleValide[0];
                    console.log(`🎯 ${carteAttaquante.nom} attaque ${carteCible.nom} - Camp Joueur`);
                    
                    await new Promise(resolve => animerAttaque(carteAttaquante, carteCible, resolve));

                    // **Appliquer les dégâts**
                    carteAttaquante.hp -= carteCible.atk;
                    carteCible.hp -= carteAttaquante.atk;

                    console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
                    console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);

                    majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
                    await sleep(500);

                    // **Éliminer les cartes mortes VISUELLEMENT**
                    if (carteAttaquante.hp <= 0) {
                        console.log(`❌ ${carteAttaquante.nom} est éliminé temporairement !`);
                        supprimerCarteVisuellement(carteAttaquante, "ia");
                    }

                    if (carteCible.hp <= 0) {
                        console.log(`❌ ${carteCible.nom} est éliminé temporairement !`);
                        supprimerCarteVisuellement(carteCible, "joueur");
                    }
                }
                indexIA++; // Passer à la prochaine carte
            }
        }

        joueurCommence = !joueurCommence; // **Alterner les attaques (Joueur -> IA -> Joueur -> IA)**

        // **Si on a atteint la fin des index, recommencer à zéro**
        if (indexJoueur >= cartesJoueur.length) indexJoueur = 0;
        if (indexIA >= cartesIA.length) indexIA = 0;

        // **Vérification si un des deux camps n'a plus de cartes vivantes**
        if (!cartesJoueur.some(c => c.hp > 0) || !cartesIA.some(c => c.hp > 0)) {
            console.log("⚔️ Fin du combat, un des deux camps n'a plus de cartes !");
            break;
        }

        await sleep(500);
    }

    console.log("⚔️ Combat terminé !");

    let cartesRestantesJoueur = cartesJoueur.filter(c => c.hp > 0);
    let cartesRestantesIA = cartesIA.filter(c => c.hp > 0);

    if (cartesRestantesJoueur.length === 0 && cartesRestantesIA.length === 0) {
        console.log("⚖️ Match nul ! Aucun PV perdu.");
        afficherPopup("⚖️ Match nul !");
    } else {
        let cartesRestantes = cartesRestantesJoueur.length || cartesRestantesIA.length;
        let degats = lvlTaverne + cartesRestantes;

        if (cartesRestantesJoueur.length > 0) {
            personnageIA.hp -= degats;
            console.log(`💀 L'IA perd ${degats} PV ! Il lui reste ${personnageIA.hp} PV.`);
            afficherPopup("🏆 Victoire ! Vous avez gagné ce combat !");
        } else {
            personnageJoueur.hp -= degats;
            console.log(`💀 Le joueur perd ${degats} PV ! Il lui reste ${personnageJoueur.hp} PV.`);
            afficherPopup("❌ Défaite ! Vous avez perdu ce combat !");
        }

        document.querySelector("#playerPv").textContent = personnageJoueur.hp;
        document.querySelector("#playerPvIA").textContent = personnageIA.hp;
    }

    console.log("🔄 Cartes sauvegardées pour le prochain tour :", cartesJoueur, cartesIA);

    document.querySelector(".nextPhaseButton").innerHTML = `
        <button class="btn btn-success" onclick="phaseShop()">Prochain tour</button>
    `;

    orTour1 += 1;
    orJoueur = orTour1;
    orIA = orTour1;
    coutLvlTaverne[lvlTaverne]--;
}






async function deroulerCombat() {
    console.log("⚔️ Début du combat !");

    // 📌 Sauvegarde AVANT le combat des buffs et des stats d'origine
    let boardAvantCombat = cartesBoard.map(carte => ({ ...carte }));
    let boardAvantCombatIa = cartesBoardIA.map(carte => ({ ...carte }));

    console.log("📌 Sauvegarde du board avant combat :", boardAvantCombat);
    console.log("📌 Sauvegarde du board IA avant combat :", boardAvantCombatIa);

    console.log("🔄 L'ordre d'attaque sera : Joueur -> IA -> Joueur -> IA");

    let cartesJoueur = [...cartesBoard];
    let cartesIA = [...cartesBoardIA];
    majAffichageBoardPendantCombat(cartesJoueur, cartesIA);

    // **🔄 Déterminer qui commence**
    let joueurCommence = Math.random() < 0.5;
    console.log(joueurCommence ? "🔄 Le joueur commence !" : "🔄 L'IA commence !");

    // **Déterminer le nombre de tours nécessaires**
    let maxTours = Math.max(cartesJoueur.length, cartesIA.length);
    while (cartesJoueur.some(c => c.hp > 0) && cartesIA.some(c => c.hp > 0)){
        for (let i = 0; i < maxTours; i++) {
            console.log(`🌀 Tour ${i + 1} - Vérification des cartes disponibles`);
    
            // **Tour du joueur**
            if (i < cartesJoueur.length && cartesJoueur[i] && cartesJoueur[i].hp > 0) {
                let carteAttaquante = cartesJoueur[i];
                let cibleValide = cartesIA.filter(c => c.hp > 0);
                
                if (cibleValide.length > 0) {
                    let carteCible = cibleValide[0]; // Toujours attaquer la première carte vivante du board adverse
                    console.log(`🎯 ${carteAttaquante.nom} attaque ${carteCible.nom} - Camp IA`);
                    await new Promise(resolve => animerAttaque(carteAttaquante, carteCible, resolve));
    
                    // **Appliquer les dégâts**
                    carteAttaquante.hp -= carteCible.atk;
                    carteCible.hp -= carteAttaquante.atk;
    
                    console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
                    console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);
    
                    majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
                    await sleep(500);
    
                    // **Éliminer les cartes mortes VISUELLEMENT**
                    if (carteAttaquante.hp <= 0) {
                        console.log(`❌ ${carteAttaquante.nom} est éliminé temporairement !`);
                        supprimerCarteVisuellement(carteAttaquante, "joueur");

                        cartesJoueur.splice(cartesJoueur.indexOf(carteAttaquante), 1);
                    }
    
                    if (carteCible.hp <= 0) {
                        console.log(`❌ ${carteCible.nom} est éliminé temporairement !`);
                        supprimerCarteVisuellement(carteCible, "ia");

                        cartesIA.splice(cartesIA.indexOf(carteCible), 1);
                    }
    
                    await sleep(500);
                }
            }
    
            // **Tour de l'IA**
            if (i < cartesIA.length && cartesIA[i] && cartesIA[i].hp > 0) {
                let carteAttaquante = cartesIA[i];
                let cibleValide = cartesJoueur.filter(c => c.hp > 0);
                
                if (cibleValide.length > 0) {
                    let carteCible = cibleValide[0]; // Toujours attaquer la première carte vivante du board adverse
                    console.log(`🎯 ${carteAttaquante.nom} attaque ${carteCible.nom} - Camp Joueur`);
                    await new Promise(resolve => animerAttaque(carteAttaquante, carteCible, resolve));
    
                    // **Appliquer les dégâts**
                    carteAttaquante.hp -= carteCible.atk;
                    carteCible.hp -= carteAttaquante.atk;
    
                    console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
                    console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);
    
                    majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
                    await sleep(500);
    
                    // **Éliminer les cartes mortes VISUELLEMENT**
                    if (carteAttaquante.hp <= 0) {
                        console.log(`❌ ${carteAttaquante.nom} est éliminé temporairement !`);
                        supprimerCarteVisuellement(carteAttaquante, "ia");

                        cartesIA.splice(cartesIA.indexOf(carteAttaquante), 1);
                    }
    
                    if (carteCible.hp <= 0) {
                        console.log(`❌ ${carteCible.nom} est éliminé temporairement !`);
                        supprimerCarteVisuellement(carteCible, "joueur");

                        cartesJoueur.splice(cartesJoueur.indexOf(carteCible), 1);
                    }
    
                    await sleep(500);
                }
            }
    
            // Vérifier si un camp est vidé
            if (cartesJoueur.length === 0 || cartesIA.length === 0) {
                console.log("⚔️ Fin du combat, un des deux camps n'a plus de cartes !");
                break;
            }
    
            await sleep(500);
        }

    }

    

    console.log("⚔️ Combat terminé !");

    // **Réinitialisation des PV après combat avec les buffs**
    cartesJoueur.forEach((carte) => {
        let carteOriginale = boardAvantCombat.find(c => c.id === carte.id);
        if (carteOriginale) carte.hp = carteOriginale.hp;
    });

    cartesIA.forEach((carte) => {
        let carteOriginale = boardAvantCombatIa.find(c => c.id === carte.id);
        if (carteOriginale) carte.hp = carteOriginale.hp;
    });

    let cartesRestantesJoueur = cartesJoueur.filter(c => c.hp > 0);
    let cartesRestantesIA = cartesIA.filter(c => c.hp > 0);

    if (cartesRestantesJoueur.length === 0 && cartesRestantesIA.length === 0) {
        console.log("⚖️ Match nul ! Aucun PV perdu.");
        afficherPopup("⚖️ Match nul !");
    } else {
        let cartesRestantes = cartesRestantesJoueur.length || cartesRestantesIA.length;
        let degats = lvlTaverne + cartesRestantes;

        if (cartesRestantesJoueur.length > 0) {
            personnageIA.hp -= degats;
            console.log(`💀 L'IA perd ${degats} PV ! Il lui reste ${personnageIA.hp} PV.`);
            afficherPopup("🏆 Victoire ! Vous avez gagné ce combat !");
        } else {
            personnageJoueur.hp -= degats;
            console.log(`💀 Le joueur perd ${degats} PV ! Il lui reste ${personnageJoueur.hp} PV.`);
            afficherPopup("❌ Défaite ! Vous avez perdu ce combat !");
        }

        document.querySelector("#playerPv").textContent = personnageJoueur.hp;
        document.querySelector("#playerPvIA").textContent = personnageIA.hp;
    }

    console.log("🔄 Cartes sauvegardées pour le prochain tour :", cartesJoueur, cartesIA);

    document.querySelector(".nextPhaseButton").innerHTML = `
        <button class="btn btn-success" onclick="phaseShop()">Prochain tour</button>
    `;

    orTour1 += 1;
    orJoueur = orTour1;
    orIA = orTour1;
    coutLvlTaverne[lvlTaverne]--;
}