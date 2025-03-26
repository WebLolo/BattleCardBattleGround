async function startGame1v1() {

    document.querySelector(".playerDeuxBoard").classList.add("d-none");
    let message1 = addImgContentAppend(".shopBoard", "img/message1.png", "imgMessage");
    await sleep(2000);
    removeContent(message1);
    await sleep(2000);
    let message2 = addImgContentAppend(".shopBoard", "img/message2.png", "imgMessage");
    await sleep(2000);
    removeContent(message2);

    // Générer les personnages et ajouter un événement "click" avec les bons paramètres
    personnages.forEach(personnage => {
        let persoImg = addImgContentAppend(".shopBoard", personnage.imgLink);
        persoImg.addEventListener("click", () => joueurDeux(personnage));
    });
    
}

async function joueurDeux(personnage) {
    document.querySelector(".shopBoard").innerHTML = "";

    let message1 = addImgContentAppend(".shopBoard", "img/message1.png", "imgMessage");
    await sleep(2000);
    removeContent(message1);
    await sleep(2000);
    let message2 = addImgContentAppend(".shopBoard", "img/message2.png", "imgMessage");
    await sleep(2000);
    removeContent(message2);

    // Générer les personnages et ajouter un événement "click" avec les bons paramètres
    personnages.forEach(personnage2 => {
        let persoImg = addImgContentAppend(".shopBoard", personnage2.imgLink);
        persoImg.addEventListener("click", () => choisirPersonnage(personnage, personnage2));
    });
}

function choisirPersonnage(personnage, personnage2) {
    musiqueDeFond("audio/Blue-field-pc.mp3")
    personnageJoueur = personnage
    personnageJoueur2 = personnage2
    phaseActuelle = phases[1]


    // Récupérer les personnages affichés

    let shopBoard = document.querySelector(".shopBoard");
    let playerHud = document.querySelector(".playerHud")
    let player2Hud = document.querySelector(".iaAndTaverneHud")
    
    // Ajouter l'animation de disparition
    addFadeOut(shopBoard)
    addFadeOut(playerHud)
    addFadeOut(player2Hud)

    // Attendre 1s (temps de l'animation) avant de passer à la boutique
    setTimeout(() => {

        phaseShop();
    }, 1000);
}

function phaseShop(){
    // Mettre à jour le HUD global
    let playerHud = document.querySelector(".playerHud")
    playerHud.innerHTML = "";
    playerHud.innerHTML = genererHud("joueur", personnageJoueur);
    addFadeIn(playerHud)

    let tavernierHud = document.querySelector(".iaAndTaverneHud")
    tavernierHud.innerHTML = "";
    tavernierHud.innerHTML = genererHud("tavernier", taverniers[0]);
    addFadeIn(tavernierHud)

    let shopBoard = document.querySelector(".shopBoard");
    addFadeIn(shopBoard)

    document.querySelector('.playerDeuxBoard').classList.add("d-none")
    document.querySelector('.playerBoard').classList.remove("d-none")

    document.querySelector('.playerDeuxDeck').classList.add("d-none")
    document.querySelector('.playerDeck').classList.remove("d-none")

    document.querySelector(".annonceJoueur").innerHTML = "";
    document.querySelector(".annonceJoueur").innerHTML = "joueur 1";
    
    cartesBoard.forEach(carte => {
        let carteOriginale = cartes.find(c => c.id === carte.id);
        if (carteOriginale) {
            carte.hp = carteOriginale.hp + carte.buffHp; // Applique les buffs
            carte.atk = carteOriginale.atk + carte.buffAtk;
        }
    });
    

    // 🔄 Restaurer les cartes survivantes du joueur et de l'IA
    if (boardAvantCombat.length > 0) {
        cartesBoard = boardAvantCombat.map(carte => clonerCarte(carte, "joueur"));
    }



    console.log("📌 Board du joueur restauré :", cartesBoard);






    console.log("🔄 PV des cartes réinitialisés pour un nouveau tour !");

    // 🧹 Nettoyage de l'affichage
    document.querySelector(".shopBoard").innerHTML = "";
    
    document.querySelector(".nextPhaseButton").innerHTML = "";

    document.querySelector(".playerBoard").classList.add('board-dropzone');
    document.querySelector(".playerDeuxBoard").classList.add('d-none');
    document.querySelector(".shopBoard").classList.remove('d-none');

    // Ajout de l'effet fade-in au shopBoard 🛒✨
  

   

    let nextPhaseButton = document.querySelector(".nextPhaseButton");
    nextPhaseButton.classList.add("fade-in");
    nextPhaseButton.innerHTML = `<button class="btn btn-danger btn-startCombat" onclick="phaseShopJoueurDeux()">Tour Joueur 2</button>`;

    // 🔄 Filtrer les cartes en fonction du niveau de taverne
    let cartesDisponibles = Object.values(cartes).filter(carte => carte.lvl <= lvlTaverne);
    let nbCartes = Math.min(getNombreCartesShop(lvlTaverne), cartesDisponibles.length);
    cartesShop = getCartesAleatoires(cartesDisponibles, nbCartes);

    // 🔄 Met à jour l'affichage de l'or dès l'entrée en boutique
    document.querySelector("#playerOr").textContent = orJoueur;


    majAffichageShop();
    majAffichageDeck();
    majAffichageBoard()
}

function phaseShopJoueurDeux(){
    // Mettre à jour le HUD du joueur2
    let playerHud = document.querySelector(".playerHud")
    addFadeOut(playerHud)
    playerHud.innerHTML = "";
    playerHud.innerHTML = genererHud("joueur2", personnageJoueur2);
    addFadeIn(playerHud)

    let tavernierHud = document.querySelector(".iaAndTaverneHud")
    addFadeOut(tavernierHud)
    tavernierHud.innerHTML = "";
    tavernierHud.innerHTML = genererHud("tavernierJoueur2", taverniers[0]);
    addFadeIn(tavernierHud)

    let shopBoard = document.querySelector(".shopBoard");
    addFadeOut(shopBoard)
    addFadeIn(shopBoard)


    document.querySelector('.playerBoard').classList.add("d-none")
    document.querySelector('.playerDeuxBoard').classList.remove("d-none")
    document.querySelector(".playerDeuxBoard").classList.remove('fight')

    document.querySelector('.playerDeck').classList.add("d-none")
    document.querySelector('.playerDeuxDeck').classList.remove("d-none")

    document.querySelector(".annonceJoueur").innerHTML = "";
    document.querySelector(".annonceJoueur").innerHTML = "joueur 2";
    document.querySelector(".playerBoard").innerHTML = "";
    document.querySelector(".playerDeck").innerHTML = "";
    
    cartesBoardJoueur2.forEach(carte => {
        let carteOriginale = cartesJoueur2.find(c => c.id === carte.id);
        if (carteOriginale) {
            carte.hp = carteOriginale.hp + carte.buffHp; // Applique les buffs
            carte.atk = carteOriginale.atk + carte.buffAtk;
        }
    });
    

    // 🔄 Restaurer les cartes survivantes du joueur et de l'IA
    if (boardAvantCombatJoueur2.length > 0) {
        cartesBoardJoueur2 = boardAvantCombatJoueur2.map(carte => clonerCarteJoueurDeux(carte, "joueur2"));
    }



    console.log("📌 Board du joueur2 restauré :", cartesBoardJoueur2);






    console.log("🔄 PV des cartes réinitialisés pour un nouveau tour !");

    // 🧹 Nettoyage de l'affichage
    document.querySelector(".shopBoard").innerHTML = "";
    document.querySelector(".nextPhaseButton").innerHTML = "";

    document.querySelector(".playerDeuxBoard").classList.add('board-dropzone');
    document.querySelector(".shopBoard").classList.remove('d-none');




    let nextPhaseButton = document.querySelector(".nextPhaseButton");
    nextPhaseButton.classList.add("fade-in");
    nextPhaseButton.innerHTML = `<button class="btn btn-danger btn-startCombat" onclick="phaseCombat()">Lancer le combat</button>`;

    // 🔄 Filtrer les cartes en fonction du niveau de taverne
    let cartesDisponibles = Object.values(cartesJoueur2).filter(carte => carte.lvl <= lvlTaverneJoueur2);
    let nbCartes = Math.min(getNombreCartesShop(lvlTaverneJoueur2), cartesDisponibles.length);
    cartesShopJoueur2 = getCartesAleatoires(cartesDisponibles, nbCartes);

    // 🔄 Met à jour l'affichage de l'or dès l'entrée en boutique
    document.querySelector("#playerTwoOr").textContent = orJoueur2;


    majAffichageShopJoueurDeux();
    majAffichageDeckJoueurDeux();
    majAffichageBoardJoueurDeux()
}

function phaseCombat(){
    console.log("⚔️ Phase de combat !");
    phaseActuelle = phases[4];
    // 🗃️ Sauvegarde du board pour le prochain tour
    boardAvantCombat = cartesBoard.map(carte => clonerCarte(carte, "joueur"));
    boardAvantCombatJoueur2 = cartesBoardJoueur2.map(carte => clonerCarteJoueurDeux(carte, "joueur2"));
    
        console.log("📌 Sauvegarde du board avant combat !", boardAvantCombat);
        console.log("📌 Sauvegarde du board IA avant combat :", boardAvantCombatJoueur2);
    

    // 🧹 Nettoyer l'affichage
    document.querySelector(".shopBoard").innerHTML = "";
    document.querySelector(".shopBoard").classList.add("d-none")
    document.querySelector(".playerDeuxDeck").innerHTML = "";
    document.querySelector(".playerBoard").classList.remove("d-none")
    document.querySelector(".nextPhaseButton").innerHTML = "";

    // suppression class pour le drop

    document.querySelector(".playerBoard").classList.remove('board-dropzone')
    document.querySelector(".playerDeuxBoard").classList.remove('board-dropzone')

    document.querySelector(".playerDeuxBoard").classList.add('fight')

   

    // 🎮 Afficher l'HUD des joueurs
    let joueur1Hud = document.querySelector(".playerHud");
    let joueur2Hud = document.querySelector(".iaAndTaverneHud");
    joueur1Hud.innerHTML = genererHud("joueur", personnageJoueur);
    joueur2Hud.innerHTML = "";
    joueur2Hud.innerHTML = genererHud("joueur2", personnageJoueur2);
    document.querySelector(".hpimghudPlayerDeux").classList.add("hpimghudPlayerDeuxFight")
    document.querySelector(".playerDeuxPv").classList.add("playerDeuxPvFight")
    document.querySelector(".playerTwoOr").classList.add("playerTwoOrFight")
    document.querySelector(".playerTwoLvl").classList.add("playerTwoLvlFight")
    document.querySelector(".orlvlimghud").classList.add("orlvlimghudFight")

    // ✅ Afficher le board du joueur et de l'IA
    //majAffichageBoardPendantCombat();
    majAffichageBoardPendantCombatUnVsUn(boardAvantCombat,boardAvantCombatJoueur2)

    deroulerCombat()


}

async function deroulerCombat() {
    console.log("⚔️ Début du combat !");

    // 📌 Sauvegarde AVANT le combat des buffs et des stats d'origine
    let boardAvantCombat = cartesBoard.map(carte => ({ ...carte }));
    let boardAvantCombatJoueur2 = cartesBoardJoueur2.map(carte => ({ ...carte }));

    console.log("📌 Sauvegarde du board avant combat :", boardAvantCombat);
    console.log("📌 Sauvegarde du board IA avant combat :", boardAvantCombatJoueur2);

    console.log("🔄 L'ordre d'attaque sera : Joueur -> IA -> Joueur -> IA");

    let cartesJoueur = [...cartesBoard];
    let cartesJoueur2 = [...cartesBoardJoueur2];
    majAffichageBoardPendantCombatUnVsUn(cartesJoueur, cartesJoueur2);

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
    cartesJoueur2[0].atkDispo = true
    while(cartesJoueur.length > 0 && cartesJoueur2.length > 0){
        console.log("TOUR", tourCombat)
        if (joueurAttaquant === true){
            nomAttaquant = "joueur"
            nomDefenseur = "joueur2"
            attaquant = cartesJoueur[0]
            if (attaquant.atkDispo === false){
                if(attaquant === cartesJoueur[cartesJoueur.length -1]){
                    attaquant = cartesJoueur[0]
                }else{
                    attaquant = cartesJoueur[cartesJoueur.indexOf(attaquant) + 1]
                }
                
            }
            defenseur = cartesJoueur2[entierAleatoire(0, cartesJoueur2.length -1)]  
             
        }
        if (joueurAttaquant === false){
            nomAttaquant = "joueur2"
            nomDefenseur = "joueur"
            attaquant = cartesJoueur2[0]
            if (attaquant.atkDispo === false){
                if(attaquant === cartesJoueur2[cartesJoueur2.length -1]){
                    attaquant = cartesJoueur2[0]
                }else{
                    attaquant = cartesJoueur2[cartesJoueur2.indexOf(attaquant) + 1]
                }
                
            }
            defenseur = cartesJoueur[entierAleatoire(0, cartesJoueur.length -1)]
    
        
        }
    
        
        console.log(nomAttaquant, "commence")
        console.log("la première carte de",nomAttaquant,attaquant.nom, "attaque la carte de",nomDefenseur, defenseur.nom )
        await new Promise(resolve => animerAttaque1v1(attaquant, defenseur, resolve));
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
    
        if(attaquant.hp > 0 && nomAttaquant === "joueur2"){
            attaquant.atkDispo = false
            if(cartesJoueur2.length > 1){
                if(attaquant === cartesJoueur2[cartesJoueur2.length - 1]){
                    cartesJoueur2[0].atkDispo = true
                }else{
                    cartesJoueur2[cartesJoueur2.indexOf(attaquant) + 1 ].atkDispo = true
                }
            }
            
    
        }
    
        
        majAffichageBoardPendantCombatUnVsUn(cartesJoueur, cartesJoueur2);
        await sleep(200);
        // Puis, à la fin du combat, on vérifie pour attaquant et défenseur :
        checkForDeathAndRemove1v1(attaquant, nomAttaquant, cartesJoueur, cartesJoueur2);
        checkForDeathAndRemove1v1(defenseur, nomDefenseur, cartesJoueur, cartesJoueur2);
        await sleep(200);
        majAffichageBoardPendantCombatUnVsUn(cartesJoueur, cartesJoueur2);
        console.log("board du joueur 2 après suppression:", cartesJoueur2);
        console.log("board du joueur après suppression:", cartesJoueur);
        console.log("il reste ", cartesJoueur.length, "cartes sur le board joueur", )
        console.log("il reste ", cartesJoueur2.length, "cartes sur le board joueur2", )
    
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

    cartesJoueur2.forEach((carte) => {
        let carteOriginale = boardAvantCombatJoueur2.find(c => c.id === carte.id);
        if (carteOriginale) carte.hp = carteOriginale.hp;
    });

    let cartesRestantesJoueur = cartesJoueur.filter(c => c.hp > 0);
    let cartesRestantesJoueur2 = cartesJoueur2.filter(c => c.hp > 0);

    if (cartesRestantesJoueur.length === 0 && cartesRestantesJoueur2.length === 0) {
        console.log("⚖️ Match nul ! Aucun PV perdu.");
        afficherPopup("⚖️ Match nul !");
    } else {
        let degats1 = lvlTaverne + cartesRestantesJoueur.length;
        let degats2 = lvlTaverneJoueur2 + cartesRestantesJoueur2.length;

        if (cartesRestantesJoueur.length > 0) {
            personnageJoueur2.hp -= degats1;
            console.log(`💀 Le joueur 2 perd ${degats1} PV ! Il lui reste ${personnageJoueur2.hp} PV.`);
            afficherPopup("🏆 Victoire !");
        } else {
            personnageJoueur.hp -= degats2;
            console.log(`💀 Le joueur perd ${degats2} PV ! Il lui reste ${personnageJoueur.hp} PV.`);
            afficherPopup("❌ Défaite !");
        }

        document.querySelector("#playerPv").textContent = personnageJoueur.hp;
        document.querySelector("#playerDeuxPv").textContent = personnageJoueur2.hp;
    }

    console.log("🔄 Cartes sauvegardées pour le prochain tour :", cartesJoueur, cartesJoueur2);

    document.querySelector(".nextPhaseButton").innerHTML = `
        <button class="btn btn-success" onclick="phaseShop()">Prochain tour</button>
    `;

    orTour1 += 1;
    orJoueur = orTour1;
    orJoueur2 = orTour1;
    coutLvlTaverne[lvlTaverne]--;
    coutLvlTaverneJoueur2[lvlTaverneJoueur2]--;
    if(orJoueur > 10){
        orJoueur = 10
    }
    if(orJoueur2 > 10){
        orJoueur2 = 10
    }
}



startGame1v1()