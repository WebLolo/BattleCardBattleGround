async function startGame() {
    
    
    document.querySelector(".iaBoard").classList.add("d-none");
    let message1 = addImgContentAppend(".playerBoard", "img/message1.png", "imgMessage");
    await sleep(2000);
    removeContent(message1);
    await sleep(2000);
    let message2 = addImgContentAppend(".playerBoard", "img/message2.png", "imgMessage");
    await sleep(2000);
    removeContent(message2);

    // Générer les personnages et ajouter un événement "click" avec les bons paramètres
    personnages.forEach(personnage => {
        let persoImg = addImgContentAppend(".playerBoard", personnage.imgLink);
        persoImg.addEventListener("click", () => choisirPersonnage(personnage));
    });
}

function choisirPersonnage(personnage) {
    musiqueDeFond("audio/Audio1.wav")
    personnageJoueur = personnage
    phaseActuelle = phases[1]
    // Mettre à jour le HUD du joueur
    document.querySelector(".playerHud").innerHTML = genererHud("joueur", personnage);

    // Récupérer les personnages affichés
    let playerBoard = document.querySelector(".playerBoard");
    
    // Ajouter l'animation de disparition
    playerBoard.classList.add("fade-out");

    // Attendre 1s (temps de l'animation) avant de passer à la boutique
    setTimeout(() => {
        // Supprimer l'affichage des personnages
        playerBoard.innerHTML = "";
        playerBoard.classList.remove("fade-out"); // Enlever la classe pour réutilisation

        // Afficher la boutique avec un effet de fondu
        phaseShop();
    }, 1000);
}

function phaseShop(){
    
    cartesBoard.forEach(carte => {
        let carteOriginale = cartes.find(c => c.id === carte.id);
        if (carteOriginale) {
            carte.hp = carteOriginale.hp + carte.buffHp; // Applique les buffs
            carte.atk = carteOriginale.atk + carte.buffAtk;
        }
    });
    
    cartesBoardIA.forEach(carte => {
        let carteOriginale = cartes.find(c => c.id === carte.id);
        if (carteOriginale) {
            carte.hp = carteOriginale.hp + carte.buffHp;
            carte.atk = carteOriginale.atk + carte.buffAtk;
        }
    });
    

    // 🔄 Restaurer les cartes survivantes du joueur et de l'IA
    if (boardAvantCombat.length > 0) {
        cartesBoard = boardAvantCombat.map(carte => clonerCarte(carte, "joueur"));
    }

    if (boardAvantCombatIa.length > 0) {
        cartesBoardIA = boardAvantCombatIa.map(carte => clonerCarte(carte, "ia"));
    }

    console.log("📌 Board du joueur restauré :", cartesBoard);
    console.log("📌 Board de l'IA restauré :", cartesBoardIA);





    console.log("🔄 PV des cartes réinitialisés pour un nouveau tour !");

    // 🧹 Nettoyage de l'affichage
    document.querySelector(".shopBoard").innerHTML = "";
    document.querySelector(".iaAndTaverneHud").innerHTML = "";
    document.querySelector(".nextPhaseButton").innerHTML = "";

    document.querySelector(".playerBoard").classList.add('board-dropzone');
    document.querySelector(".iaBoard").classList.add('d-none');
    document.querySelector(".shopBoard").classList.remove('d-none');

    // Ajout de l'effet fade-in au shopBoard 🛒✨
    let shopBoard = document.querySelector(".shopBoard");
    shopBoard.classList.add("fade-in");

    let tavernierHud = document.querySelector(".iaAndTaverneHud");
    tavernierHud.classList.add("fade-in");
    tavernierHud.innerHTML = genererHud("tavernier", taverniers[0]);

    let nextPhaseButton = document.querySelector(".nextPhaseButton");
    nextPhaseButton.classList.add("fade-in");
    nextPhaseButton.innerHTML = `<button class="btn btn-success btn-phaseSuivante" onclick="phasePreparation()">Phase suivante</button>`;

    // 🔄 Générer la boutique
    let cartesDisponibles = Object.values(cartes);
    let nbCartes = Math.min(getNombreCartesShop(lvlTaverne), cartesDisponibles.length);
    cartesShop = getCartesAleatoires(cartesDisponibles, nbCartes);

    // 🔄 Met à jour l'affichage de l'or dès l'entrée en boutique
    document.querySelector("#playerOr").textContent = orJoueur;
    tourIA();



    // 🕹️ Ajouter le bouton "Lancer le combat"
    document.querySelector(".nextPhaseButton").innerHTML = `
        <button class="btn btn-danger btn-startCombat" onclick="phaseCombat()">Lancer le combat</button>
    `;

    majAffichageShop();
    majAffichageDeck();
    majAffichageBoard()
}

function phaseCombat(){
    console.log("⚔️ Phase de combat !");
    phaseActuelle = phases[4];
    // 🗃️ Sauvegarde du board pour le prochain tour
    boardAvantCombat = cartesBoard.map(carte => clonerCarte(carte, "joueur"));
    boardAvantCombatIa = cartesBoardIA.map(carte => clonerCarte(carte, "ia"));
    
        console.log("📌 Sauvegarde du board avant combat !", boardAvantCombat);
        console.log("📌 Sauvegarde du board IA avant combat :", boardAvantCombatIa);
    

    // 🧹 Nettoyer l'affichage
    document.querySelector(".shopBoard").innerHTML = "";
    document.querySelector(".shopBoard").classList.add("d-none")
    document.querySelector(".playerDeck").innerHTML = "";
    document.querySelector(".iaBoard").classList.remove("d-none")
    document.querySelector(".nextPhaseButton").innerHTML = "";

    // suppression class pour le drop

    document.querySelector(".playerBoard").classList.remove('board-dropzone')

   

    // 🎮 Afficher l'HUD de l'IA
    let iaHud = document.querySelector(".iaAndTaverneHud");
    iaHud.innerHTML = genererHud("ia", personnageIA);

    // ✅ Afficher le board du joueur et de l'IA
    //majAffichageBoardPendantCombat();
    majAffichageBoard();
    majAffichageBoardIA();

    deroulerCombat()


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

    let tirageAuSort = entierAleatoire(0,1)
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
    cartesJoueur[0].atkDispo = true
    cartesIA[0].atkDispo = true
    while(cartesJoueur.length > 0 && cartesIA.length > 0){
        console.log("TOUR", tourCombat)
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
        await new Promise(resolve => animerAttaque(attaquant, defenseur, resolve));
        console.log(attaquant.nom,"à",attaquant.hp, "pv. Il perd", defenseur.atk, "hp" )
        console.log(defenseur.nom,"à",defenseur.hp, "pv. Il perd", attaquant.atk, "hp" )
        attaquant.hp -= defenseur.atk
        defenseur.hp -= attaquant.atk
        
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
    
        
        majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
        await sleep(200);
        // Puis, à la fin du combat, on vérifie pour attaquant et défenseur :
        checkForDeathAndRemove(attaquant, nomAttaquant, cartesJoueur, cartesIA);
        checkForDeathAndRemove(defenseur, nomDefenseur, cartesJoueur, cartesIA);
        await sleep(200);
        majAffichageBoardPendantCombat(cartesJoueur, cartesIA);
        console.log("boardIaTest après suppression:", cartesIA);
        console.log("boardJoueurTest après suppression:", cartesJoueur);
        console.log("il reste ", cartesJoueur.length, "cartes sur le board joueur", )
        console.log("il reste ", cartesIA.length, "cartes sur le board ia", )
    
        joueurAttaquant = !joueurAttaquant
        await sleep(200);
    
        
        await sleep(200);
        tourCombat ++
    
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




startGame();