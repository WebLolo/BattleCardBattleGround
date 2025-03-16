async function deroulerCombat() {
    console.log("⚔️ Début du combat !");

    // 📌 Sauvegarde des buffs AVANT le combat
    cartesBoard.forEach(carte => {
        let carteOriginale = cartes.find(c => c.id === carte.id);
        if (carteOriginale) {
            carte.buffHp = carte.hp - carteOriginale.hp;
            carte.buffAtk = carte.atk - carteOriginale.atk;
        }
    });

    cartesBoardIA.forEach(carte => {
        let carteOriginale = cartes.find(c => c.id === carte.id);
        if (carteOriginale) {
            carte.buffHp = carte.hp - carteOriginale.hp;
            carte.buffAtk = carte.atk - carteOriginale.atk;
        }
    });

    console.log("🔄 L'ordre d'attaque sera strict : Joueur -> IA -> Joueur -> IA");

    let cartesJoueur = [...cartesBoard];
    let cartesIA = [...cartesBoardIA];

    majAffichageBoardPendantCombat(cartesJoueur, cartesIA);

    let maxTours = Math.max(cartesJoueur.length, cartesIA.length);

    for (let i = 0; i < maxTours; i++) {
        let cartesASupprimer = [];

        // **Tour du joueur**
        if (i < cartesJoueur.length && cartesJoueur[i] && cartesJoueur[i].hp > 0) {
            let carteAttaquante = cartesJoueur[i];
            let cibleValide = cartesIA.filter(c => c.hp > 0);

            if (cibleValide.length > 0) {
                let carteCible = cibleValide[Math.floor(Math.random() * cibleValide.length)];

                console.log(`🎯 ${carteAttaquante.nom} attaque ${carteCible.nom} - Camp IA`);

                await new Promise(resolve => animerAttaque(carteAttaquante, carteCible, resolve));

                carteAttaquante.hp -= carteCible.atk;
                carteCible.hp -= carteAttaquante.atk;

                console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
                console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);

                if (carteAttaquante.hp <= 0) cartesASupprimer.push({ carte: carteAttaquante, camp: "joueur" });
                if (carteCible.hp <= 0) cartesASupprimer.push({ carte: carteCible, camp: "ia" });
                majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
                await sleep(500);
            }
        }

        // **Tour de l'IA**
        if (i < cartesIA.length && cartesIA[i] && cartesIA[i].hp > 0) {
            let carteAttaquante = cartesIA[i];
            let cibleValide = cartesJoueur.filter(c => c.hp > 0);

            if (cibleValide.length > 0) {
                let carteCible = cibleValide[Math.floor(Math.random() * cibleValide.length)];

                console.log(`🎯 ${carteAttaquante.nom} attaque ${carteCible.nom} - Camp Joueur`);

                await new Promise(resolve => animerAttaque(carteAttaquante, carteCible, resolve));

                carteAttaquante.hp -= carteCible.atk;
                carteCible.hp -= carteAttaquante.atk;

                console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
                console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);

                if (carteAttaquante.hp <= 0) cartesASupprimer.push({ carte: carteAttaquante, camp: "ia" });
                if (carteCible.hp <= 0) cartesASupprimer.push({ carte: carteCible, camp: "joueur" });
                majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
                await sleep(500);
            }
        }

        // **🔄 Suppression propre des cartes mortes (ATTENDRE LA FIN DU TOUR)**
        await sleep(200); // Laisser le temps à l'affichage avant suppression
        cartesASupprimer.forEach(({ carte, camp }) => {
            supprimerCarteVisuellement(carte, camp);
        });

        // **Mise à jour des listes après suppression**
        cartesJoueur = cartesJoueur.filter(c => c.hp > 0);
        cartesIA = cartesIA.filter(c => c.hp > 0);

        if (cartesJoueur.length === 0 || cartesIA.length === 0) {
            console.log("⚔️ Fin du combat, un des deux camps n'a plus de cartes !");
            break;
        }

        // **Mettre à jour l'affichage après suppression**
        await sleep(300);
        majAffichageBoardPendantCombat(cartesJoueur, cartesIA);

        // **🚨 Sécurité : Vérifier que les cartes restantes sont bien mises à jour**
        if (cartesJoueur.length === 0 || cartesIA.length === 0) {
            break;
        }
    }

    console.log("⚔️ Combat terminé !");

    let cartesJoueurRestantes = cartesJoueur.filter(c => c.hp > 0);
    let cartesIARestantes = cartesIA.filter(c => c.hp > 0);

    if (cartesJoueurRestantes.length === 0 && cartesIARestantes.length === 0) {
        console.log("⚖️ Match nul ! Aucun PV perdu.");
        afficherPopup("⚖️ Match nul !");
    } else {
        let cartesRestantes = cartesJoueurRestantes.length || cartesIARestantes.length;
        let degats = lvlTaverne + cartesRestantes;

        if (cartesJoueurRestantes.length > 0) {
            personnageIA.hp -= degats;
            console.log(`💀 L'IA perd ${degats} PV ! Il lui reste ${personnageIA.hp} PV.`);
        } else {
            personnageJoueur.hp -= degats;
            console.log(`💀 Le joueur perd ${degats} PV ! Il lui reste ${personnageJoueur.hp} PV.`);
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
