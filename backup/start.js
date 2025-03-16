async function startGame() {
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

function phaseShop() {
    document.querySelector("#playerOr").textContent = orJoueur;
    console.log("🚀 Phase boutique démarrée !");
    phaseActuelle = phases[2];

    for(let carte of cartes){
        cartes[carte.id -1].hp = hpCarte[carte.id -1].hp
        console.log("les hp de ", carte.nom, "ont été réinitialisé à ", carte.hp)
    }
    boardAvantCombat = []
    boardAvantCombatIa = []

   document.querySelector(".playerBoard").innerHTML = ``
   document.querySelector(".iaBoard").innerHTML = ``
   
  
   // supprimer class pour le board en fight

   document.querySelector(".playerBoard").classList.remove('boardFight')
   document.querySelector(".iaBoard").classList.remove('boardFight')

    let tavernierHud = document.querySelector(".iaAndTaverneHud");
    tavernierHud.classList.add("fade-in");
    tavernierHud.innerHTML = genererHud("tavernier", taverniers[0]);

    let boardShop = document.querySelector(".shopBoard");
    boardShop.classList.add("fade-in");

    let nextPhaseButton = document.querySelector(".nextPhaseButton");
    nextPhaseButton.classList.add("fade-in");
    nextPhaseButton.innerHTML = `<button class="btn btn-success btn-phaseSuivante" onclick="phasePreparation()">Phase suivante</button>`;

    // Sélectionner aléatoirement les cartes disponibles
    let cartesDisponibles = Object.values(cartes);
    let nbCartes = Math.min(getNombreCartesShop(lvlTaverne), cartesDisponibles.length); // Utilisation de la fonction
    cartesShop = getCartesAleatoires(cartesDisponibles, nbCartes);

    // 🔄 Met à jour l'affichage de la boutique
    majAffichageShop();

    console.log("✅ Nouvelle boutique générée avec", nbCartes, "cartes !");
}



// 📌 Passer à la phase de préparation
function phasePreparation() {
    console.log("🚀 Phase de préparation démarrée !");
    
    
    phaseActuelle = phases[3];
    tourIA();

    // 🧹 Vider les éléments non nécessaires
    document.querySelector(".shopBoard").innerHTML = "";
    document.querySelector(".iaAndTaverneHud").innerHTML = "";
    document.querySelector(".nextPhaseButton").innerHTML = "";

    // ajout class pour le drop

    document.querySelector(".playerBoard").classList.add('board-dropzone')

    // 🔄 Mettre à jour l'affichage du deck et du board
    majAffichageDeck();
    majAffichageBoardPrepa();
    

    // 🕹️ Ajouter le bouton "Lancer le combat"
    document.querySelector(".nextPhaseButton").innerHTML = `
        <button class="btn btn-danger btn-startCombat" onclick="phaseCombat()">Lancer le combat</button>
    `;

    
    boardAvantCombat = []
    
    for(let carteSave of cartesBoard){
        
        
        boardAvantCombat.push(carteSave)
        console.log("carte save : ", carteSave)

    }
    
    boardAvantCombatIa = []
    for(let carteSaveIa of cartesBoardIA){
        boardAvantCombatIa.push(carteSaveIa)
        console.log("carte save : ",carteSaveIa)

    }



    // 🛠 Réattacher la fonction `startDrag()` aux cartes du deck
    document.querySelectorAll(".playerDeck .card").forEach(card => {
        let carteId = card.dataset.id;
        card.setAttribute("draggable", "true");
        card.addEventListener("dragstart", event => startDrag(event, carteId));
    });
     // 🛠 Réattacher les événements de vente pour les cartes dans le deck
     document.querySelectorAll(".playerDeck .btn-sell").forEach(button => {
        button.removeEventListener("click", vendreCarte); // Évite les doublons d'écouteurs
        button.addEventListener("click", vendreCarte);
    });
}

function phaseCombat(){
    console.log("⚔️ Phase de combat !");
    phaseActuelle = phases[4];
    

    // 🧹 Nettoyer l'affichage
    document.querySelector(".shopBoard").innerHTML = "";
    document.querySelector(".playerDeck").innerHTML = "";
    document.querySelector(".nextPhaseButton").innerHTML = "";

    // suppression class pour le drop

    document.querySelector(".playerBoard").classList.remove('board-dropzone')

    // ajout class pour le board en fight

    document.querySelector(".playerBoard").classList.add('boardFight')
    document.querySelector(".iaBoard").classList.add('boardFight')

    // 🎮 Afficher l'HUD de l'IA
    let iaHud = document.querySelector(".iaAndTaverneHud");
    iaHud.innerHTML = `
        <p id="playerPvIA" class="playerPv">${personnageIA.hp}</p>
        <img src="${personnageIA.imgLink}" alt="">
    `;

    // ✅ Afficher le board du joueur et de l'IA
    console.log("le suis les logs juste avant que  majAffichageBoardCombat et majAffichageBoardIA soit appeler")
    //majAffichageBoardPendantCombat();
    majAffichageBoardCombat();
        majAffichageBoardIA();

    deroulerCombat()


}

async function deroulerCombat() {
    console.log("⚔️ Début du combat !");

    // 1️⃣ Déterminer qui attaque en premier
    let joueurCommence = Math.random() < 0.5; // true = joueur commence, false = IA commence
    console.log(joueurCommence ? "🔄 Le joueur commence !" : "🔄 L'IA commence !");
    let cartesJoueur = []
    let cartesIA = []
    let indexTour = 0; // Permet d'alterner entre les cartes
    cartesJoueur = [...cartesBoard]; // Clone les cartes pour éviter de modifier la liste originale
    cartesIA = [...cartesBoardIA];

    // 2️⃣ Boucle de combat
    while (cartesJoueur.length > 0 && cartesIA.length > 0) {
        let attaquant = joueurCommence ? cartesJoueur : cartesIA;
        let defenseur = joueurCommence ? cartesIA : cartesJoueur;

        if (indexTour >= attaquant.length) indexTour = 0; // Si toutes les cartes ont attaqué, on recommence la boucle

        let carteAttaquante = attaquant[indexTour];

        if (!carteAttaquante) continue; // Vérifie que la carte existe toujours après les attaques

        let cibleIndex = Math.floor(Math.random() * defenseur.length);
        let carteCible = defenseur[cibleIndex];

        console.log(`💥 ${carteAttaquante.nom} attaque ${carteCible.nom} !`);

        // Appliquer les dégâts mutuels
        carteAttaquante.hp -= carteCible.atk;
        carteCible.hp -= carteAttaquante.atk;

        console.log(`💥 ${carteAttaquante.nom} perd ${carteCible.atk} PV ! Il lui reste ${carteAttaquante.hp} PV.`);
        console.log(`💥 ${carteCible.nom} perd ${carteAttaquante.atk} PV ! Il lui reste ${carteCible.hp} PV.`);

        // 🔄 Mettre à jour l'affichage des cartes après les dégâts
        console.log("le suis les logs juste avant que  majAffichageBoardCombat et majAffichageBoardIA soit appeler")
        //majAffichageBoardCombat();
        //majAffichageBoardIA();
        majAffichageBoardPendantCombat(cartesJoueur,cartesIA)

        // Pause courte pour l'effet de combat
        await sleep(1000);

        // Suppression des cartes mortes
        if (carteAttaquante.hp <= 0) {
            console.log(`❌ ${carteAttaquante.nom} est éliminé !`);
            attaquant.splice(indexTour, 1);
        }

        if (carteCible.hp <= 0) {
            console.log(`❌ ${carteCible.nom} est éliminé !`);
            defenseur.splice(cibleIndex, 1);
        }
        console.log("le suis les logs juste avant que  majAffichageBoardCombat et majAffichageBoardIA soit appeler")
        // 🔄 Mise à jour de l'affichage après suppression des cartes
        //majAffichageBoardCombat();
        //majAffichageBoardIA();
        majAffichageBoardPendantCombat(cartesJoueur,cartesIA)

        // Pause courte après chaque attaque
        await sleep(500);

        indexTour++; // Passer à la carte suivante
        joueurCommence = !joueurCommence; // Alterner attaquant/défenseur
    }

    // 3️⃣ Fin du combat : calcul des dégâts au héros perdant
    let joueurGagne = cartesJoueur.length > 0;
    let cartesRestantes = joueurGagne ? cartesJoueur.length : cartesIA.length;
    let degats = lvlTaverne + cartesRestantes;

    if (joueurGagne) {
        personnageIA.hp -= degats;
        console.log(`💀 L'IA perd ${degats} PV ! Il lui reste ${personnageIA.hp} PV.`);
    } else {
        personnageJoueur.hp -= degats;
        console.log(`💀 Le joueur perd ${degats} PV ! Il lui reste ${personnageJoueur.hp} PV.`);
    }

    // 🛠 Mise à jour des PVs affichés
    document.querySelector("#playerPv").textContent = personnageJoueur.hp;
    document.querySelector("#playerPvIA").textContent = personnageIA.hp;

    console.log("⚔️ Combat terminé !");
    afficherResultatCombat(joueurGagne);
}
function afficherResultatCombat(gagnant) {
    let message = gagnant === "joueur" ? "🏆 Victoire ! Vous avez gagné ce combat !" : "❌ Vous avez perdu ce combat !";
    afficherPopup(message);
    document.querySelector(".nextPhaseButton").innerHTML = `
        <button class="btn btn-success" onclick="phaseShop()">Prochain tour</button>
    `;
    orTour1 += 1
    orJoueur = orTour1
    orIA = orTour1
    

    
}




startGame();