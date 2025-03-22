function genererHud(type, data) {
    
    if (type === "joueur") {
        return `
            <img class="hudPersoShop" src="${data.imgLink}" alt="${data.nom}">
            <div id="playerOr" class="playerOr">${orJoueur}</div>
            <img class="hpimghud" src="img/hpimghud.png" alt="">
            <div id="playerPv" class="playerPv">${data.hp}</div>
            <div id="playerLvl" class="playerLvl">${lvlTaverne}</div>`;
    } else if (type === "tavernier") {
        return `       
            <img type="button" onclick="actualiserBoutique()" class="hudActu" src="img/bouton_actualiser.png" alt="">
            <img class="hudPersoShop" src="img/chounette_la_taverniere.png" alt="">
            <img type="button" onclick="lvlUpTaverne(event)" class="hudLvlUp" src="img/bouton_lvlup_taverne.png" alt="">
            <div id="taverneCost" class="taverneCost">${coutLvlTaverne[lvlTaverne]}</div>`;
    } else if (type === "ia") {
        return `<img class="hudPersoShop" src="${data.imgLink}" alt="${data.nom}">
                <img class="hpimghudIa" src="img/hpimghud.png" alt="">
                <div id="playerPvIA" class="iaPv">${data.hp}</div>`;
    }
    
}

// // // // // // // // // // // // // // // // // // 
function genererCarteShop(carte, emplacement) {
    return `
            <div class="cardfight ${emplacement} content-card" data-id="${carte.id}">
                <img class="cardimg" src="${carte.imgMinia}" alt="${carte.nom}">
                <div class="hudIntAtk">${carte.atk}</div>
                <button class="btnperso btnSellBoard btn-warning btn-buy" data-id="${carte.id}">3 💰</button>
                <div class="hudIntPv">${carte.hp}</div>                    
            </div>
        `;

        
}
// // // // // // // // // // // // // // // // // // 
function genererCarteVendable(carte, emplacement) {
    return `
            <div class="cardfight ${emplacement} content-card" data-id="${carte.id}">
                <img class="cardimg" src="${carte.imgMinia}" alt="${carte.nom}">
                <div class="hudIntAtk">${carte.atk}</div>
                <button class="btnperso btnSellBoard btn-danger btn-sell" data-id="${carte.id}">+1💰</button>
                <div class="hudIntPv">${carte.hp}</div>
            </div>        
        `;

        
}

function genererCartePendantCombat(carte, emplacement) {
    return `
            <div class="cardfight ${emplacement}" data-id="${carte.id}">
                <img class="cardimg" src="${carte.imgMinia}" alt="${carte.nom}">
                <div class="hudIntAtk">${carte.atk}</div>
                <div class="hudIntPv">${carte.hp}</div>                    
            </div>
        
        `;
        
}

// // // // // // // // // // // // // // // // // // 
function genererCarteIa(carte, emplacement) {
    return `
            <div class="cardfight ${emplacement}" data-id="${carte.id}">
                <img class="cardimg" src="${carte.imgMinia}" alt="${carte.nom}">
                <div class="hudIntAtk">${carte.atk}</div>
                <div class="hudIntPv">${carte.hp}</div>
            </div>`;

        
}
function genererCarteDeck(carte, index){
    return `
            <div class="cardInDeck${index} text-white mb-3 me-2" data-id="${carte.id}" draggable="true" 
                ondragstart="startDrag(event, ${carte.id})">
                
                <img class="fullCard" data-id="${carte.id}" src="${carte.img}" alt="${carte.nom}">
            
            
            </div>`;

}



// 📌 Met à jour l'affichage du deck du joueur
function majAffichageDeck() {
    let deckContainer = document.querySelector(".playerDeck");
    deckContainer.innerHTML = "";

    cartesDeck.forEach((carte, index) => {
        let carteHTML = genererCarteDeck(carte, index)
        
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
function majAffichageBoard() {
    let boardContainer = document.querySelector(".playerBoard");
    boardContainer.innerHTML = "";
    
    cartesBoard.forEach(carte => {
        boardContainer.insertAdjacentHTML("beforeend", genererCarteVendable(carte, "boardCard"));
    });
    
    document.querySelectorAll(".btn-sell").forEach(button => {
        button.removeEventListener("click", vendreCarte);
        button.addEventListener("click", vendreCarte);
    });
}

function majAffichageBoardPendantCombat(cartesJoueur,cartesIA) {
    if (!cartesJoueur) cartesJoueur = [];
    if (!cartesIA) cartesIA = [];

    let playerBoardContainer = document.querySelector(".playerBoard");
    let iaBoardContainer = document.querySelector(".iaBoard");

    playerBoardContainer.innerHTML = "";
    iaBoardContainer.innerHTML = "";

    cartesJoueur.forEach(carte => {
        if (carte) playerBoardContainer.insertAdjacentHTML("beforeend", genererCartePendantCombat(carte, 'joueur'));
    });

    cartesIA.forEach(carte => {
        if (carte) iaBoardContainer.insertAdjacentHTML("beforeend", genererCarteIa(carte, 'ia'));
    });
}

// ✅ Fonction pour mettre à jour l'affichage du board de l'IA
function majAffichageBoardIA() {
    let iaBoardContainer = document.querySelector(".iaBoard");
    iaBoardContainer.innerHTML = "";
    
    cartesBoardIA.forEach(carte => {
        iaBoardContainer.insertAdjacentHTML("beforeend", genererCarteIa(carte, "ia"));
    });
}










// ✅ Fonction pour mettre à jour l'affichage du shop
function majAffichageShop() {
    let shopContainer = document.querySelector(".shopBoard");
    shopContainer.innerHTML = "";
    
    cartesShop.forEach(carte => {
        shopContainer.insertAdjacentHTML("beforeend", genererCarteShop(carte, "shop"));
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
    cartesDeck.push(clonerCarte(carte, "joueur"));
    cartesShop = cartesShop.filter(c => c.id !== carte.id);
    
    document.querySelector("#playerOr").textContent = orJoueur;
    majAffichageDeck();
    majAffichageShop();
}






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
    if (isNaN(carteId)) {
        console.error("❌ Erreur : L'ID de la carte est invalide après conversion !");
        return;
    }
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
    cartesBoard.push(clonerCarte(carte, "joueur"));
    
    cartesDeck.splice(carteIndex, 1); // Supprimer la carte du deck

    console.log(`📤 Carte déplacée du deck au board : ${carte.nom}`);
     // Vérifier si la carte a un Cri de guerre
     if (carte.criDeGuerre) {
        console.log(`📢 Cri de guerre activé pour ${carte.nom}`);
        carte.criDeGuerre(cartesBoard)
        majAffichageBoard();
    }
    

    // 🔄 Mettre à jour l'affichage du deck et du board
    majAffichageDeck();
    majAffichageBoard();
   
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
function clonerCarte(carte, camp) {
    return {
        id: uniqueIdCounter++, // Génère un ID unique
        nom: carte.nom,
        hp: carte.hp, // PV actuels
        atk: carte.atk, // ATK actuelle
        img: carte.img,
        imgMinia: carte.imgMinia,
        texte: carte.texte,
        baseHp: carte.hp, // PV de base
        baseAtk: carte.atk, // ATK de base
        buffHp: 0, // Valeur des buffs HP reçus
        buffAtk: 0, // Valeur des buffs ATK reçus
        atkDispo: true,
        criDeGuerre: carte.criDeGuerre ? (cartesBoard) => carte.criDeGuerre(cartesBoard) : null,
        camp: camp // ✅ Ajout du camp
    };
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
    document.querySelector("#taverneCost").textContent = nextCost;
    document.querySelector("#playerLvl").textContent = `${lvlTaverne}`;

    console.log(`🎉 Taverne montée au niveau ${lvlTaverne} !`);

    // ✅ Forcer l'actualisation de la boutique (on ignore l'or du joueur ici)
    actualiserBoutique(true);
}


///////////////////////////

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
        cartesBoardIA.push(clonerCarte(carteAchetee, "ia")); // Ajoute directement sur le board IA
        console.log(`🤖 IA achète ${carteAchetee.nom} !`);
    }

    console.log("✅ Fin de l'achat de l'IA.");
}

// // // // // // // // // // // // // // // // // // 
// 💰 Vendre une carte du deck ou du board
function vendreCarte(event) {
    let carteElement = event.target.closest(".cardfight, .cardInDeck0, .cardInDeck1, .cardInDeck2, .cardInDeck3, .cardInDeck4, .cardInDeck5, .cardInDeck6"); 
    let carteId = parseInt(event.target.dataset.id, 10); // Récupérer l'ID en nombre

    if (!carteElement) {
        afficherPopup("❌ Erreur : Impossible de trouver la carte !");
        return;
    }

    // 📌 VENTE DANS LE BOARD
    if (carteElement.closest(".playerBoard")) {
        let indexBoard = cartesBoard.findIndex(c => c.id === carteId);
        if (indexBoard !== -1) {
            let carteVendue = cartesBoard.splice(indexBoard, 1)[0]; // Supprime UNE SEULE carte du board
            orJoueur += 1;
            document.querySelector("#playerOr").textContent = orJoueur;
            majAffichageBoard();
            console.log(`💰 Vente réussie : ${carteVendue.nom} du board !`);
            return;
        }
    }

    // 📌 VENTE DANS LE DECK
    if (carteElement.closest(".playerDeck")) {
        let deckClasses = Array.from(carteElement.classList);
        let deckIndexClass = deckClasses.find(cls => cls.startsWith("cardInDeck")); // Trouve la classe `cardInDeckX`

        if (deckIndexClass) {
            let deckIndex = parseInt(deckIndexClass.replace("cardInDeck", ""), 10); // Extrait l'index

            if (!isNaN(deckIndex) && deckIndex < cartesDeck.length) {
                let carteVendue = cartesDeck.splice(deckIndex, 1)[0]; // Supprime la carte précise du deck
                orJoueur += 1;
                document.querySelector("#playerOr").textContent = orJoueur;
                majAffichageDeck();
                console.log(`💰 Vente réussie : ${carteVendue.nom} du deck !`);
                return;
            }
        }
    }

    // ❌ Si la carte n'a pas été trouvée
    afficherPopup("❌ Erreur : Carte introuvable !");
}

function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction utilitaire pour éviter de répéter le même code :
function checkForDeathAndRemove(entity, entityRole, boardJoueurTest, boardIaTest) {
    if (entity.hp < 1) {
        console.log("la carte", entity.nom, "est morte dans d'atroces souffrances");

        if (entityRole === "joueur") {
            let index = boardJoueurTest.indexOf(entity);
            if (index !== -1) {
                boardJoueurTest.splice(index, 1);
            }
        } else if (entityRole === "ia") {
            let index = boardIaTest.indexOf(entity);
            if (index !== -1) {
                boardIaTest.splice(index, 1);
            }
        }
    }
}

function musiqueDeFond(url){
    let musique = document.getElementById("musiqueAmbiance");
    musique.src = url;
    musique.volume = 0.5;
    musique.load();
    musique.play()
}




