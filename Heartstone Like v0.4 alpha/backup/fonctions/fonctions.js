function genererHud(type, data) {
    
    if (type === "joueur") {
        return `
            <p id="playerPv" class="playerPv">${data.hp}</p>
            <img src="${data.imgLink}" alt="${data.nom}">
            <div class="orAndLvlContainer">
                <div class="hudOr">
                    <img class="imgHudOr" src="img/hud_or.png" alt="">
                    <p id="playerOr" class="playerOr">${orJoueur}</p>
                </div>
                <div class="hudlvl">
                    <img class="imgHudLvl" src="img/hud_lvl.png" alt="">
                    <p id="playerLvl" class="playerLvl">${lvlTaverne}</p>
                </div>
            </div>`;
    } else if (type === "tavernier") {
        return `
        
        <button type="button" onclick="actualiserBoutique()" class="btn btn-outline-warning">Actualiser (-1💰)</button>
            <p id="playerLvlTaverne" class="playerLvlTaverne">${lvlTaverne}</p>
            <img src="img/tavernierChoune.png" alt="">
            <div>
                <img class="imgHudOrTaverne" src="img/hud_or.png" alt="">
                <p id="taverneCost" class="taverneCost">${coutLvlTaverne[lvlTaverne]}</p>
            </div>
            
            <button type="button" onclick="lvlUpTaverne(event)" class="btn btn-outline-warning">passer un lvl</button>`;
    } else if (type === "ia") {
        return `<img src="${data.imgLink}" alt="${data.nom}">`;
    }
    
}
// // // // // // // // // // // // // // // // // // // // 
function genererCarte(carte, type = "shop") {
    let bgColor = type === "ia" ? "bg-danger" : type === "joueur" ? "bg-primary" : "bg-dark";
    let bouton = type === "shop" ? `<button class="btn btn-warning btn-buy" data-id="${carte.id}">Acheter (3 💰)</button>` : "";

    return `
        <div class="card text-white ${bgColor} mb-3 me-2" style="width: 15rem;">
            <img class="card-img-top" src="${carte.img}" alt="Image de ${carte.nom}">
            <div class="card-body">
                <h5 class="card-title">${carte.nom}</h5>
                <p class="card-text">${carte.texte}</p>
                <div class="card-footer d-flex justify-content-between">
                    <p>❤️ ${carte.hp}</p>
                    <p>⚔️ ${carte.atk}</p>
                </div>
                ${bouton}
            </div>
        </div>`;
}
// ✅ Fonction pour mettre à jour l'affichage du shop
function majAffichageShop() {
    let shopContainer = document.querySelector(".shopBoard");
    shopContainer.innerHTML = "";
    
    cartesShop.forEach(carte => {
        shopContainer.insertAdjacentHTML("beforeend", genererCarte(carte, "shop"));
    });
    
    document.querySelectorAll(".btn-buy").forEach(button => {
        button.removeEventListener("click", acheterCarte);
        button.addEventListener("click", acheterCarte);
    });
}
// 🛒 Acheter une carte
function acheterCarte(event) {
    let carteId = event.target.dataset.id -1;
    let carte = cartes[carteId];
    let cout = 3;

    if (!carte) {
        console.error("❌ Erreur : Carte introuvable !");
        return;
    }

    if (orJoueur < cout) {
        afficherPopup("💰 Pas assez d'or pour acheter cette carte !");
        return;
    }

    if (cartesDeck.length >= 7) { // ✅ Vérification de la limite du deck
        afficherPopup("⚠️ Votre deck est plein ! (Max: 7 cartes)");
        return;
    }

    console.log(`🛒 Carte ID stockée après achat : ${carteId} - ${carte.nom}`);

    orJoueur -= cout;
    cartesDeck.push(carte);
    cartesShop = cartesShop.filter(c => c.id !== carte.id);
    
    document.querySelector("#playerOr").textContent = orJoueur;
    majAffichageDeck();
    majAffichageShop();
}
// // // // // // // // // // // // // // // // // // 
function genererCarteCombat(carte, emplacement) {
    return `
        <div class="cardfight ${emplacement}" data-id="${carte.id}">
                
                <img class="cardimg " src="${carte.img}" alt="${carte.nom}">

                <div class="hudCardFightAtk">
                    <p>⚔️ ${carte.atk}</p>
                </div>
                    
                <div class="hudCardFightPv">
                    <p> ❤️ ${carte.hp}</p>
                </div>
                
        </div>`;
        
}
// ✅ Fonction pour mettre à jour l'affichage du board du joueur
function majAffichageBoardCombat() {
    let boardContainer = document.querySelector(".playerBoard");
    boardContainer.innerHTML = "";
    
    cartesBoard.forEach(carte => {
        boardContainer.insertAdjacentHTML("beforeend", genererCarteCombat(carte, "boardCard"));
    });
    
    document.querySelectorAll(".btn-sell").forEach(button => {
        button.removeEventListener("click", vendreCarte);
        button.addEventListener("click", vendreCarte);
    });
}
// // // // // // // // // // // // // // // // // // 
function genererCartePendantCombat(carte, emplacement) {
    return `
        <div class="cardfight ${emplacement}" data-id="${carte.id}">
                
                <img class="cardimg " src="${carte.img}" alt="${carte.nom}">

                <div class="hudCardFightAtk">
                    <p>⚔️ ${carte.atk}</p>
                </div>
                    
                <div class="hudCardFightPv">
                    <p> ❤️ ${carte.hp}</p>
                </div>
                
        </div>`;
        
}

// // // // // // // // // // // // // // // // // // 
function genererCarteCombatIa(carte, emplacement) {
    return `
        <div class="cardfight ${emplacement}" data-id="${carte.id}">
                
                <img class="cardimgIa " src="${carte.img}" alt="${carte.nom}">

                <div class="hudCardFightAtk">
                    <p>⚔️ ${carte.atk}</p>
                </div>
                    
                <div class="hudCardFightPv">
                    <p> ❤️ ${carte.hp}</p>
                </div>
                
        </div>`;
        
}
function genererCartePendantCombatIa(carte, emplacement) {
    return `
        <div class="cardfight ${emplacement}" data-id="${carte.id}">
                
                <img class="cardimgIa " src="${carte.img}" alt="${carte.nom}">

                <div class="hudCardFightAtk">
                    <p>⚔️ ${carte.atk}</p>
                </div>
                    
                <div class="hudCardFightPv">
                    <p> ❤️ ${carte.hp}</p>
                </div>
                
        </div>`;
        
}
function majAffichageBoardPendantCombat(cartesJoueur,cartesIA) {
    let playerBoardContainer = document.querySelector(".playerBoard");
    let iaBoardContainer = document.querySelector(".iaBoard");

    playerBoardContainer.innerHTML = "";
    iaBoardContainer.innerHTML = "";

    cartesJoueur.forEach(carte => {
        playerBoardContainer.insertAdjacentHTML("beforeend", genererCartePendantCombat(carte, 'joueur'));
    });

    cartesIA.forEach(carte => {
        iaBoardContainer.insertAdjacentHTML("beforeend", genererCartePendantCombatIa(carte, 'ia'));
    });
}

// // // // // // // // // // // // // // // // // // 
// 🔢 Détermine le nombre de cartes à afficher en boutique selon le niveau de la taverne
function getNombreCartesShop(lvl) {
    if (lvl === 1) return 3;
    if (lvl === 2 || lvl === 3) return 4;
    if (lvl === 4 || lvl === 5) return 5;
    return 6; // Taverne niveau 6
}
function getCartesAleatoires(listeCartes, nombre) {
    if (!Array.isArray(listeCartes) || listeCartes.length === 0) {
        console.error("❌ Erreur : getCartesAleatoires() attend un tableau mais a reçu", listeCartes);
        return [];
    }
    
    let cartesMelangees = [...listeCartes].sort(() => 0.5 - Math.random()); // Mélanger les cartes
    return cartesMelangees.slice(0, nombre); // Prendre les X premières
}
// 🔄 Met à jour la boutique
function actualiserBoutique(force = false) {
    if (!force && orJoueur < 1) {
        afficherPopup("💰 Pas assez d'or !");
        return;
    }

    if (!force) {
        orJoueur -= 1; // Déduire 1 or
        document.querySelector("#playerOr").textContent = orJoueur; // 🔄 Mise à jour de l'affichage de l'or
    }

    console.log("🔄 Boutique réactualisée !");

    if (!cartes || typeof cartes !== "object") {
        console.error("❌ Erreur : 'cartes' n'est pas défini ou n'est pas un objet valide", cartes);
        return;
    }

    let cartesDisponibles = Object.values(cartes);
    let nbCartes = Math.min(getNombreCartesShop(lvlTaverne), cartesDisponibles.length); // Utilisation de la fonction
    cartesShop = getCartesAleatoires(cartesDisponibles, nbCartes);

    // ✅ Met à jour l'affichage du shop
    majAffichageShop();

    console.log("✅ Nouvelle boutique générée avec", nbCartes, "cartes !");
}
function lvlUpTaverne(event) {
    event.stopPropagation(); // Empêche le clic de se propager à d'autres boutons

    if (lvlTaverne >= maxLvlTaverne) {
        afficherPopup("🔒 Niveau maximum atteint !");
        return;
    }

    let cout = coutLvlTaverne[lvlTaverne];

    if (orJoueur < cout) {
        afficherPopup("💰 Pas assez d'or pour améliorer la taverne !");
        return;
    }

    // 🔻 Déduire l'or et monter le niveau
    orJoueur -= cout;
    lvlTaverne++;

    // 🆕 Mettre à jour le coût du prochain niveau
    let nextCost = coutLvlTaverne[lvlTaverne] || "-";

    // 🔄 Mise à jour de l'affichage
    document.querySelector("#playerOr").textContent = orJoueur;
    document.querySelector("#playerLvlTaverne").textContent = `${lvlTaverne}`;
    document.querySelector("#taverneCost").textContent = nextCost;
    document.querySelector("#playerLvl").textContent = `${lvlTaverne}`;

    console.log(`🎉 Taverne montée au niveau ${lvlTaverne} !`);

    // ✅ Forcer l'actualisation de la boutique (on ignore l'or du joueur ici)
    actualiserBoutique(true);
}
function tourIA() {
    console.log("🤖 Tour de l'IA...");

    // 🏆 Sélectionner un personnage aléatoire différent du joueur
    let personnagesDisponibles = personnages.filter(p => p.id !== personnageJoueur.id);
    personnageIA = personnagesDisponibles[Math.floor(Math.random() * personnagesDisponibles.length)];
    console.log(`👾 L'IA a choisi ${personnageIA.nom} !`);

    console.log(`💰 IA reçoit ${orIA} pièces d'or.`);

 

    // 🏪 Génération de la boutique de l'IA (cachée)
    let cartesDisponiblesIa = Object.values(cartes);
    let nbCartesIA = Math.min(getNombreCartesShop(lvlTaverne), cartesDisponiblesIa.length); // Utilisation de la fonction
    let boutiqueIA = getCartesAleatoires(cartes, nbCartesIA); 

    // 🛒 L'IA achète tant qu'elle a de l'or et qu'elle peut poser des cartes
    while (orIA >= 3 && cartesBoardIA.length < 7 && boutiqueIA.length > 0) {
        let carteAchetee = boutiqueIA.shift(); // Prend une carte aléatoire
        if (!carteAchetee) break;

        orIA -= 3;
        cartesBoardIA.push(carteAchetee); // Ajoute directement sur le board IA
        console.log(`🤖 IA achète ${carteAchetee.nom} !`);
    }

    console.log("✅ Fin de l'achat de l'IA.");
}
// // // // // // // // // // // // // // // // // // 
// 💰 Vendre une carte
function vendreCarte(event) {
    let carteId = event.target.dataset.id;
    let carte = cartes.find(c => c.id == carteId);
    
    if (!carte || phaseActuelle === "combat") {
        afficherPopup("❌ Vente impossible !");
        return;
    }

    orJoueur += 1;
    cartesDeck = cartesDeck.filter(c => c.id !== carte.id);
    cartesBoard = cartesBoard.filter(c => c.id !== carte.id);
    
    
    document.querySelector("#playerOr").textContent = orJoueur;
    majAffichageDeck();
    majAffichageBoardPrepa();
}
// // // // // // // // // // // // // // // // // //
///////////////////////////////////////////////////////////
// 📌 Met à jour l'affichage du deck du joueur
function majAffichageDeck() {
    let deckContainer = document.querySelector(".playerDeck");
    deckContainer.innerHTML = "";

    cartesDeck.forEach((carte, index) => {
        let carteHTML = `
            <div class="cardInDeck${index} text-white bg-dark mb-3 me-2 " data-id="${carte.id}" style="width: 15rem;" 
                draggable="true" 
                ondragstart="startDrag(event, ${carte.id})">
                <img class="card-img-top" src="${carte.img}" alt="Image de ${carte.nom}">
                <div class="card-body">
                    <h5 class="card-title">${carte.nom}</h5>
                    <div class="card-footer d-flex justify-content-between">
                        <p>❤️ ${carte.hp}</p>
                        <p>⚔️ ${carte.atk}</p>
                    </div>
                    <button class="btn btn-danger btn-sell" data-id="${carte.id}">Vendre (+1💰)</button>
                </div>
            </div>`;
        
        deckContainer.insertAdjacentHTML("beforeend", carteHTML);
    });

    // 🔄 Attacher les événements aux nouvelles cartes
    document.querySelectorAll(".cardInDeck").forEach(carte => {
        carte.addEventListener("dragstart", event => {
            let carteId = carte.dataset.id;
            startDrag(event, carteId);
        });
    });

    // 🔄 Réattacher les événements de vente après mise à jour du deck
    document.querySelectorAll(".btn-sell").forEach(button => {
        button.removeEventListener("click", vendreCarte);
        button.addEventListener("click", vendreCarte);
    });
}


// ✅ Fonction pour mettre à jour l'affichage du board du joueur
function majAffichageBoardPrepa() {
    let boardContainer = document.querySelector(".playerBoard");
    boardContainer.innerHTML = "";
    
    cartesBoard.forEach(carte => {
        boardContainer.insertAdjacentHTML("beforeend", genererCarteBoardPrepa(carte, "boardCard"));
    });
    // 🔄 Réattacher les événements de vente après mise à jour du deck
    document.querySelectorAll(".btn-sell").forEach(button => {
        button.removeEventListener("click", vendreCarte);
        button.addEventListener("click", vendreCarte);
    });
}
function genererCarteBoardPrepa(carte, emplacement) {
    return `
        <div class="cardfight ${emplacement}" data-id="${carte.id}">
                
                <img class="cardimg " src="${carte.img}" alt="${carte.nom}">

                <div class="hudCardFightAtk">
                    <p>⚔️ ${carte.atk}</p>
                </div>
                    
                <div class="hudCardFightPv">
                    <p> ❤️ ${carte.hp}</p>
                </div>
                <div class="hudsell">
                    <button class="btn btn-danger btn-sell" data-id="${carte.id}">Vendre (+1💰)</button>
                </div>
                
        </div>`;
        
}


// ✅ Fonction pour mettre à jour l'affichage du board de l'IA
function majAffichageBoardIA() {
    let iaBoardContainer = document.querySelector(".iaBoard");
    iaBoardContainer.innerHTML = "";
    
    cartesBoardIA.forEach(carte => {
        iaBoardContainer.insertAdjacentHTML("beforeend", genererCarteCombatIa(carte, "ia"));
    });
}
////////////////////////////////////////////////////////////////////

// 📌 Début du drag & drop
function startDrag(event, carteId) {
    console.log("🎯 Start Drag - Carte ID :", carteId);
    event.dataTransfer.setData("text/plain", carteId); // Stocke l'ID en texte
}

// Permet de lâcher une carte sur le board
function allowDrop(event) {
    event.preventDefault();
}

// 📌 Gère le lâcher d'une carte sur le board
function dropCard(event) {
    event.preventDefault();
    
    let carteId = event.dataTransfer.getData("text/plain");
    carteId = parseInt(carteId, 10); // Convertir en nombre

    console.log("📥 Drop - Carte ID après conversion :", carteId);

    // Vérifier que la carte existe bien dans le deck
    let carteIndex = cartesDeck.findIndex(c => c.id === carteId);
    if (carteIndex === -1) {
        afficherPopup("❌ Erreur : Carte introuvable dans le deck !");
        return;
    }

    let carte = cartesDeck[carteIndex];

    let board = document.querySelector(".playerBoard");

    // Vérifier que le board n'a pas déjà 7 cartes
    if (cartesBoard.length >= 7) {
        afficherPopup("⚠️ Board plein ou erreur !");
        return;
    }

    // 🃏 Ajouter la carte au board
    cartesBoard.push(carte);
    
    cartesDeck.splice(carteIndex, 1); // Supprimer la carte du deck

    console.log(`📤 Carte déplacée du deck au board : ${carte.nom}`);

    // 🔄 Mettre à jour l'affichage du deck et du board
    majAffichageDeck();
    majAffichageBoardPrepa();
}
// // // // // // // // // // // // // // // // // //
function addImgContentAppend(host, link, className = "", id = null) {
    let MainContent = document.querySelector(host);
    let imgElement = document.createElement('img');
    imgElement.className = className;
    imgElement.src = link;
    imgElement.alt = "...";
    if (id) imgElement.dataset.id = id; // Ajout d'un `data-id`
    MainContent.append(imgElement);
    return imgElement;
}
// // // // // // // // // // // // // // // // // //
function removeContent(content){
    
    content.remove()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function removeBoard(deletedDiv){
    deletedDiv.innerHTML = "";
}

// Fonction pour afficher le popup
function afficherPopup(message) {
    document.querySelector("#popupMessage").textContent = message;
    document.querySelector("#popupErreur").style.display = "block";
}

// Fonction pour fermer le popup
function fermerPopup() {
    document.querySelector("#popupErreur").style.display = "none";
}
// // // // // // // // // // // // // // // // // //