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
    while (cartesJoueur.some(c => c.hp > 0) && cartesIA.some(c => c.hp > 0)) {
        console.log(`🌀 Début d'un nouveau tour de combat`);

        let maxTours = Math.max(cartesJoueur.length, cartesIA.length);

        for (let i = 0; i < maxTours; i++) {
            // **Tour du joueur**
            if (i < cartesJoueur.length && cartesJoueur[i] && cartesJoueur[i].hp > 0) {
                let carteAttaquante = cartesJoueur[i];
                let cibleValide = cartesIA.filter(c => c.hp > 0);
                
                if (cibleValide.length > 0) {
                    let carteCible = cibleValide[0]; // Toujours attaquer la première carte vivante du board adverse

                    console.log(`🎯 ${carteAttaquante.nom} attaque ${carteCible.nom} - Camp IA`);
                    await new Promise(resolve => animerAttaque(carteAttaquante, carteCible, resolve));

                    // **Vérifier si les deux cartes sont toujours vivantes avant d'appliquer les dégâts**
                    if (carteAttaquante.hp > 0 && carteCible.hp > 0) {
                        carteAttaquante.hp -= carteCible.atk;
                        carteCible.hp -= carteAttaquante.atk;

                        console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
                        console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);
                    }
                    // **Éliminer les cartes mortes VISUELLEMENT**
                    if (carteAttaquante.hp <= 0) {
                        console.log(`❌ ${carteAttaquante.nom} est éliminé temporairement !`);
                        supprimerCarteVisuellement(carteAttaquante, "joueur");
                        await sleep(100);
                       
                    }
    
                    if (carteCible.hp <= 0) {
                        console.log(`❌ ${carteCible.nom} est éliminé temporairement !`);
                        supprimerCarteVisuellement(carteCible, "ia");
                        await sleep(100);
                       
                    }

                    majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
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

                    // **Vérifier si les deux cartes sont toujours vivantes avant d'appliquer les dégâts**
                    if (carteAttaquante.hp > 0 && carteCible.hp > 0) {
                        carteAttaquante.hp -= carteCible.atk;
                        carteCible.hp -= carteAttaquante.atk;

                        console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
                        console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);
                    }
                    // **Éliminer les cartes mortes VISUELLEMENT**
                    if (carteAttaquante.hp <= 0) {
                        console.log(`❌ ${carteAttaquante.nom} est éliminé temporairement !`);
                        await sleep(100);
                        supprimerCarteVisuellement(carteAttaquante, "ia");
                        
   
                    }
    
                    if (carteCible.hp <= 0) {
                        console.log(`❌ ${carteCible.nom} est éliminé temporairement !`);
                        await sleep(100);
                        supprimerCarteVisuellement(carteCible, "joueur");
                        

                    }

                    majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
                    await sleep(500);
                }
            }
        }

        // **Supprimer les cartes mortes APRÈS le tour**
        cartesJoueur = cartesJoueur.filter(c => c.hp > 0);
        cartesIA = cartesIA.filter(c => c.hp > 0);

        // Vérifier si un camp est vidé
        if (cartesJoueur.length === 0 || cartesIA.length === 0) {
            console.log("⚔️ Fin du combat, un des deux camps n'a plus de cartes !");
            break;
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
        let degats = lvlTaverne + cartesRestantesJoueur.length;

        if (cartesRestantesJoueur.length > 0) {
            personnageIA.hp -= degats;
            console.log(`💀 L'IA perd ${degats} PV ! Il lui reste ${personnageIA.hp} PV.`);
            afficherPopup("🏆 Victoire !");
        } else {
            personnageJoueur.hp -= degats;
            console.log(`💀 Le joueur perd ${degats} PV ! Il lui reste ${personnageJoueur.hp} PV.`);
            afficherPopup("❌ Défaite !");
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