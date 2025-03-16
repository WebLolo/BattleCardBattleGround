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

    console.log("🔄 L'ordre d'attaque sera strict : Joueur -> IA -> Joueur -> IA");

    let cartesJoueur = cartesBoard.map(carte => ({ ...carte }));
    let cartesIA = cartesBoardIA.map(carte => ({ ...carte }));
    majAffichageBoardPendantCombat(cartesJoueur, cartesIA);

    let maxTours = Math.max(cartesJoueur.length, cartesIA.length); // On prend le plus grand nombre de cartes

    for (let i = 0; i < maxTours; i++) {
        // **Tour du joueur**
        if (i < cartesJoueur.length && cartesJoueur[i].hp > 0) {
            let carteAttaquante = cartesJoueur[i];
            let cibleValide = cartesIA.filter(c => c.hp > 0);
            if (cibleValide.length > 0) {
                let carteCible = cibleValide[Math.floor(Math.random() * cibleValide.length)];
                console.log(`🎯 ${carteAttaquante.nom} attaque ${carteCible.nom} - Camp IA`);

                await new Promise(resolve => animerAttaque(carteAttaquante, carteCible, resolve));

                // Appliquer les dégâts
                carteAttaquante.hp -= carteCible.atk;
                carteCible.hp -= carteAttaquante.atk;

                console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
                console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);

                if (carteAttaquante.hp <= 0) {
                    console.log(`❌ ${carteAttaquante.nom} est éliminé temporairement !`);
                }
                if (carteCible.hp <= 0) {
                    console.log(`❌ ${carteCible.nom} est éliminé temporairement !`);
                }

                majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
                await sleep(500);
            }
        }

        // **Tour de l'IA**
        if (i < cartesIA.length && cartesIA[i].hp > 0) {
            let carteAttaquante = cartesIA[i];
            let cibleValide = cartesJoueur.filter(c => c.hp > 0);
            if (cibleValide.length > 0) {
                let carteCible = cibleValide[Math.floor(Math.random() * cibleValide.length)];
                console.log(`🎯 ${carteAttaquante.nom} attaque ${carteCible.nom} - Camp Joueur`);

                await new Promise(resolve => animerAttaque(carteAttaquante, carteCible, resolve));

                // Appliquer les dégâts
                carteAttaquante.hp -= carteCible.atk;
                carteCible.hp -= carteAttaquante.atk;

                console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
                console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);

                if (carteAttaquante.hp <= 0) {
                    console.log(`❌ ${carteAttaquante.nom} est éliminé temporairement !`);
                }
                if (carteCible.hp <= 0) {
                    console.log(`❌ ${carteCible.nom} est éliminé temporairement !`);
                }

                majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
                await sleep(500);
            }
        }
    }

    console.log("⚔️ Combat terminé !");

    let joueurGagne = cartesJoueur.some(c => c.hp > 0);
    let iaGagne = cartesIA.some(c => c.hp > 0);

    if (!joueurGagne && !iaGagne) {
        console.log("⚖️ Match nul ! Aucun PV perdu.");
        afficherPopup("⚖️ Match nul !");
    } else {
        let cartesRestantes = cartesJoueur.filter(c => c.hp > 0).length || cartesIA.filter(c => c.hp > 0).length;
        let degats = lvlTaverne + cartesRestantes;

        if (joueurGagne) {
            personnageIA.hp -= degats;
            console.log(`💀 L'IA perd ${degats} PV ! Il lui reste ${personnageIA.hp} PV.`);
        } else {
            personnageJoueur.hp -= degats;
            console.log(`💀 Le joueur perd ${degats} PV ! Il lui reste ${personnageJoueur.hp} PV.`);
        }

        document.querySelector("#playerPv").textContent = personnageJoueur.hp;
        document.querySelector("#playerPvIA").textContent = personnageIA.hp;
    }

    // 📌 Sauvegarde des cartes pour le prochain tour
    boardAvantCombat = cartesBoard.map(carte => ({ ...carte }));
    boardAvantCombatIa = cartesBoardIA.map(carte => ({ ...carte }));

    console.log("🔄 Cartes sauvegardées pour le prochain tour !");
    
    let messageCombat = "⚔️ Combat terminé ! ";
    if (cartesJoueur.some(c => c.hp > 0) && !cartesIA.some(c => c.hp > 0)) {
        messageCombat += "🏆 Victoire ! Vous avez gagné ce combat !";
    } else if (cartesIA.some(c => c.hp > 0) && !cartesJoueur.some(c => c.hp > 0)) {
        messageCombat += "❌ Défaite ! Vous avez perdu ce combat !";
    } else {
        messageCombat += "⚖️ Égalité ! Personne ne gagne ce combat.";
    }

    afficherPopup(messageCombat);

    document.querySelector(".nextPhaseButton").innerHTML = `
        <button class="btn btn-success" onclick="phaseShop()">Prochain tour</button>
    `;

    orTour1 += 1;
    orJoueur = orTour1;
    orIA = orTour1;
    coutLvlTaverne[lvlTaverne]--;
}