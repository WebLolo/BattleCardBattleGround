// // // // // // // // // // // // // // // // // // 
function genererCarteJoueurDeux(carte, emplacement) {
    return `
            <div class="cardfight ${emplacement} " data-id="${carte.id}" data-fullimg="${carte.img}">
                <img class="cardimg" src="${carte.imgMinia}" alt="${carte.nom}">
                <div class="hudIntAtk">${carte.atk}</div>
                <div class="hudIntPv">${carte.hp}</div>
            </div>`;

        
}
// // // // // // // // // // // // // // // // // // 
function genererCarteShopJoueurDeux(carte, emplacement) {
    return `
            <div class="cardfight ${emplacement} content-card animate__animated animate__backInLeft" data-id="${carte.id}" data-fullimg="${carte.img}">
                <img class="cardimg" src="${carte.imgMinia}" alt="${carte.nom}">
                <div class="hudIntAtk">${carte.atk}</div>
                <button class="btnperso btnSellBoard btn-warning btn-buy" data-id="${carte.id}">3 💰</button>
                <div class="hudIntPv">${carte.hp}</div>                    
            </div>
        `;

        
}
function genererCarteDeckJoueurDeux(carte, index){
    return `
            <div class="cardInDeck${index} text-white mb-3 me-2" data-fullimg="${carte.img}" data-id="${carte.id}" draggable="true" 
                ondragstart="startDragJoueurDeux(event, ${carte.id})">
                
                <img class="fullCard" data-id="${carte.id}" src="${carte.img}" alt="${carte.nom}">
            
            
            </div>`;

}

function genererCarteVendableJoueurDeux(carte, emplacement) {
    return `
            <div class="cardfight ${emplacement} content-card animate__animated animate__backInLeft" data-id="${carte.id}" data-fullimg="${carte.img}">
                <img class="cardimg" src="${carte.imgMinia}" alt="${carte.nom}">
                <div class="hudIntAtk">${carte.atk}</div>
                <button class="btnperso btnSellBoard btn-danger btn-sell" data-id="${carte.id}">+1💰</button>
                <div class="hudIntPv">${carte.hp}</div>
            </div>        
        `;

        
}

// 📌 Met à jour l'affichage du deck du joueur
function majAffichageDeckJoueurDeux() {
    let deckContainer = document.querySelector(".playerDeuxDeck");
    deckContainer.innerHTML = "";

    cartesDeckJoueur2.forEach((carte, index) => {
        let carteHTML = genererCarteDeckJoueurDeux(carte, index)
        
        deckContainer.insertAdjacentHTML("beforeend", carteHTML);
    });

    // 🔄 Attacher les événements aux nouvelles cartes
    document.querySelectorAll(".cardInDeck").forEach(carte => {
        carte.addEventListener("dragstartJoueurDeux", event => {
            let carteId = carte.dataset.id;
            startDragJoueurDeux(event, carteId);
        });
    });

    // 🔄 Réattacher les événements de vente après mise à jour du deck
    document.querySelectorAll(".btn-sell").forEach(button => {
        button.removeEventListener("click", vendreCarteJoueurDeux);
        button.addEventListener("click", vendreCarteJoueurDeux);
    });
}

// ✅ Fonction pour mettre à jour l'affichage du board du joueur
function majAffichageBoardJoueurDeux() {
    let boardContainer = document.querySelector(".playerDeuxBoard");
    boardContainer.innerHTML = "";
    
    cartesBoardJoueur2.forEach(carte => {
        boardContainer.insertAdjacentHTML("beforeend", genererCarteVendableJoueurDeux(carte, "boardCard"));
    });
    
    document.querySelectorAll(".btn-sell").forEach(button => {
        button.removeEventListener("click", vendreCarteJoueurDeux);
        button.addEventListener("click", vendreCarteJoueurDeux);
    });
}


function majAffichageBoardPendantCombatUnVsUn(cartesJoueur,cartesJoueur2) {
    if (!cartesJoueur) cartesJoueur = [];
    if (!cartesJoueur2) cartesJoueur2 = [];

    let playerBoardContainer = document.querySelector(".playerBoard");
    let player2BoardContainer = document.querySelector(".playerDeuxBoard");

    playerBoardContainer.innerHTML = "";
    player2BoardContainer.innerHTML = "";

    cartesJoueur.forEach(carte => {
        if (carte) playerBoardContainer.insertAdjacentHTML("beforeend", genererCartePendantCombat(carte, 'joueur'));
    });

    cartesJoueur2.forEach(carte => {
        if (carte) player2BoardContainer.insertAdjacentHTML("beforeend", genererCartePendantCombat(carte, 'joueur2'));
    });
}

// ✅ Fonction pour mettre à jour l'affichage du shop
function majAffichageShopJoueurDeux() {
    let shopContainer = document.querySelector(".shopBoard");
    shopContainer.innerHTML = "";
    
    cartesShopJoueur2.forEach(carte => {
        shopContainer.insertAdjacentHTML("beforeend", genererCarteShopJoueurDeux(carte, "shop"));
    });
    
    document.querySelectorAll(".btn-buy").forEach(button => {
        button.removeEventListener("click", acheterCarteJoueurDeux);
        button.addEventListener("click", acheterCarteJoueurDeux);
    });
}

// 🛒 Acheter une carte
function acheterCarteJoueurDeux(event) {
    let carteId = event.target.dataset.id -1;
    let carte = cartesJoueur2[carteId];
    let cout = 3;

    if (!carte) {
        console.error("❌ Erreur : Carte introuvable !");
        return;
    }

    if (orJoueur2 < cout) {
        afficherPopup("💰 Pas assez d'or pour acheter cette carte !");
        return;
    }

    if (cartesDeckJoueur2.length >= 7) { // ✅ Vérification de la limite du deck
        afficherPopup("⚠️ Votre deck est plein ! (Max: 7 cartes)");
        return;
    }

    console.log(`🛒 Carte ID stockée après achat : ${carteId} - ${carte.nom}`);

    orJoueur2 -= cout;
    cartesDeckJoueur2.push(clonerCarteJoueurDeux(carte, "joueur2"));
    cartesShopJoueur2 = cartesShopJoueur2.filter(c => c.id !== carte.id);
    
    document.querySelector("#playerTwoOr").textContent = orJoueur2;
    majAffichageDeckJoueurDeux();
    majAffichageShopJoueurDeux();
}

// 📌 Début du drag & drop
function startDragJoueurDeux(event, carteId) {
    console.log("🎯 Start Drag - Carte ID :", carteId);
    event.dataTransfer.setData("text/plain", carteId); // Stocke l'ID en texte
}

// Permet de lâcher une carte sur le board
function allowDropJoueurDeux(event) {
    event.preventDefault();
}

// 📌 Gère le lâcher d'une carte sur le board
function dropCardJoueurDeux(event) {
    event.preventDefault();
    
    let carteId = event.dataTransfer.getData("text/plain");
    if (isNaN(carteId)) {
        console.error("❌ Erreur : L'ID de la carte est invalide après conversion !");
        return;
    }
    carteId = parseInt(carteId, 10); // Convertir en nombre

    console.log("📥 Drop - Carte ID après conversion :", carteId);

    // Vérifier que la carte existe bien dans le deck
    let carteIndex = cartesDeckJoueur2.findIndex(c => c.id === carteId);
    if (carteIndex === -1) {
        afficherPopup("❌ Erreur : Carte introuvable dans le deck !");
        return;
    }

    let carte = cartesDeckJoueur2[carteIndex];

    let board = document.querySelector(".playerDeuxBoard");

    // Vérifier que le board n'a pas déjà 7 cartes
    if (cartesBoardJoueur2.length >= 7) {
        afficherPopup("⚠️ Board plein ou erreur !");
        return;
    }

    // 🃏 Ajouter la carte au board
    let nouvelleCarte = clonerCarteJoueurDeux(carte, "joueur2");
    cartesBoardJoueur2.push(nouvelleCarte);
    cartesDeckJoueur2.splice(carteIndex, 1);

    if (nouvelleCarte.criDeGuerre) {
        console.log(`📢 Cri de guerre activé pour ${carte.nom}`);
        
        if (carte.cibleUnique) {
            console.log(`🎯 Cri de guerre ciblé sur UNE seule carte pour ${carte.nom}`);
            appliquerCriDeGuerreSurUneCibleJoueurDeux(cartesBoardJoueur2, carte.criDeGuerre);
        } else {
            carte.criDeGuerre(cartesBoardJoueur2); // Effet sur tout le board
        }
    }
    
    if (nouvelleCarte.poteLa) {
        console.log(`📢 Pote la ! activé pour ${carte.nom}`);
        carte.poteLa(cartesBoardJoueur2)

    }
    if (nouvelleCarte.sangNoble) {
        console.log(`📢 Sang Noble activé pour ${carte.nom}`);
        carte.sangNoble(cartesBoardJoueur2)

    }

    if (carte.nom === "Mini-Maya"){
        SFX("audio/Audio2.mp3")
    }
    
    
    // 🔄 Mettre à jour l'affichage du deck et du board
    appliquerEffetDeCoupleJoueurDeux(nouvelleCarte, cartesBoardJoueur2);
    majAffichageDeckJoueurDeux();
    majAffichageBoardJoueurDeux();
    
   
}

function clonerCarteJoueurDeux(carte, camp) {
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
        criDeGuerre: carte.criDeGuerre ? (cartesBoardJoueur2) => carte.criDeGuerre(cartesBoardJoueur2) : null,
        poteLa: carte.poteLa ? (cartesBoardJoueur2) => carte.poteLa(cartesBoardJoueur2) : null,
        sangNoble: carte.sangNoble ? (cartesBoardJoueur2) => carte.sangNoble(cartesBoardJoueur2) : null,
        effetDeCouple: carte.effetDeCouple ? { ...carte.effetDeCouple } : null,
        effetApplique: carte.effetApplique || false, // ✅ Conserve l'état de l'effet
        camp: camp, // ✅ Ajout du camp
        famille: carte.famille
    };
}

function appliquerEffetDeCoupleJoueurDeux(carteAjoutee, cartesBoardJoueur2) {
    if (!carteAjoutee.effetDeCouple || cartesEffetDeCoupleApplique.has(carteAjoutee.id)) {
        return; // ✅ Si la carte n'a pas d'effet de couple ou a déjà appliqué l'effet, on ne fait rien
    }

    let partenaireTrouve = cartesBoardJoueur2.find(c => c.nom === carteAjoutee.effetDeCouple.partenaire);

    if (partenaireTrouve) {
        console.log(`💑 Effet de couple activé pour ${carteAjoutee.nom} (partenaire : ${partenaireTrouve.nom})`);

        // 🆕 Appliquer l'effet UNIQUEMENT à la carte posée, pas à toutes
        carteAjoutee.effetDeCouple.effet(cartesBoardJoueur2);

        // 🔒 Marquer la carte comme ayant déjà appliqué son effet
        cartesEffetDeCoupleApplique.add(carteAjoutee.id);
    }
}

function appliquerCriDeGuerreSurUneCibleJoueurDeux(cartesBoardJoueur2, effet) {
    if (cartesBoardJoueur2.length === 0) return;

    let cible = cartesBoardJoueur2[Math.floor(Math.random() * cartesBoardJoueur2.length)];
    
    console.log(`🎯 Cri de guerre appliqué sur ${cible.nom}`);

    effet(cible); // ✅ Applique l'effet à la carte choisie
}

// 🔄 Met à jour la boutique
function actualiserBoutiqueJoueurDeux(force = false) {
    if (!force && orJoueur2 < 1) {
        afficherPopup("💰 Pas assez d'or !");
        return;
    }

    if (!force) {
        orJoueur2 -= 1; // Déduire 1 or
        document.querySelector("#playerTwoOr").textContent = orJoueur2;
    }

    console.log("🔄 Boutique réactualisée !");

    if (!cartesJoueur2 || typeof cartesJoueur2 !== "object") {
        console.error("❌ Erreur : 'cartes' n'est pas défini ou n'est pas un objet valide", cartesJoueur2);
        return;
    }

    // 🆕 Filtrer les cartes disponibles en fonction du niveau de la taverne
    let cartesDisponibles = Object.values(cartesJoueur2).filter(carte => carte.lvl <= lvlTaverneJoueur2);

    if (cartesDisponibles.length === 0) {
        console.warn("⚠️ Aucune carte disponible pour le niveau de taverne actuel !");
        return;
    }

    let nbCartes = Math.min(getNombreCartesShop(lvlTaverneJoueur2), cartesDisponibles.length);
    cartesShopJoueur2 = getCartesAleatoires(cartesDisponibles, nbCartes);

    // ✅ Met à jour l'affichage du shop
    majAffichageShopJoueurDeux();

    console.log(`✅ Nouvelle boutique générée avec ${nbCartes} cartes !`);
}

function lvlUpTaverneJoueurDeux(event) {
    event.stopPropagation(); // Empêche le clic de se propager à d'autres boutons

    if (lvlTaverneJoueur2 >= maxLvlTaverne) {
        afficherPopup("🔒 Niveau maximum atteint !");
        return;
    }

    let cout = coutLvlTaverneJoueur2[lvlTaverneJoueur2];

    if (orJoueur2 < cout) {
        afficherPopup("💰 Pas assez d'or pour améliorer la taverne !");
        return;
    }

    // 🔻 Déduire l'or et monter le niveau
    orJoueur2 -= cout;
    lvlTaverneJoueur2++;

    // 🆕 Mettre à jour le coût du prochain niveau
    let nextCost = coutLvlTaverneJoueur2[lvlTaverneJoueur2] || "-";

    // 🔄 Mise à jour de l'affichage
    document.querySelector("#playerTwoOr").textContent = orJoueur2;
    document.querySelector("#taverneCost").textContent = nextCost;
    document.querySelector("#playerTwoLvl").textContent = `${lvlTaverneJoueur2}`;

    console.log(`🎉 Taverne montée au niveau ${lvlTaverneJoueur2} !`);

    // ✅ Forcer l'actualisation de la boutique (on ignore l'or du joueur ici)
    actualiserBoutiqueJoueurDeux(true);
}

// // // // // // // // // // // // // // // // // // 
// 💰 Vendre une carte du deck ou du board
function vendreCarteJoueurDeux(event) {
    let carteElement = event.target.closest(".cardfight, .cardInDeck0, .cardInDeck1, .cardInDeck2, .cardInDeck3, .cardInDeck4, .cardInDeck5, .cardInDeck6"); 
    let carteId = parseInt(event.target.dataset.id, 10); // Récupérer l'ID en nombre

    if (!carteElement) {
        afficherPopup("❌ Erreur : Impossible de trouver la carte !");
        return;
    }

    // 📌 VENTE DANS LE BOARD
    if (carteElement.closest(".playerDeuxBoard")) {
        let indexBoard = cartesBoardJoueur2.findIndex(c => c.id === carteId);
        if (indexBoard !== -1) {
            let carteVendue = cartesBoardJoueur2.splice(indexBoard, 1)[0]; // Supprime UNE SEULE carte du board
            orJoueur2 += 1;
            document.querySelector("#playerTwoOr").textContent = orJoueur2;
            majAffichageBoardJoueurDeux();
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

            if (!isNaN(deckIndex) && deckIndex < cartesDeckJoueur2.length) {
                let carteVendue = cartesDeckJoueur2.splice(deckIndex, 1)[0]; // Supprime la carte précise du deck
                orJoueur2 += 1;
                document.querySelector("#playerOr").textContent = orJoueur2;
                majAffichageDeckJoueurDeux();
                console.log(`💰 Vente réussie : ${carteVendue.nom} du deck !`);
                return;
            }
        }
    }

    // ❌ Si la carte n'a pas été trouvée
    afficherPopup("❌ Erreur : Carte introuvable !");
}

// Fonction utilitaire pour éviter de répéter le même code :
function checkForDeathAndRemove1v1(entity, entityRole, boardJoueur, boardJoueur2) {
    if (entity.hp < 1) {
        console.log("la carte", entity.nom, "est morte dans d'atroces souffrances");

        if (entityRole === "joueur") {
            let index = boardJoueur.indexOf(entity);
            if (index !== -1) {
                boardJoueur.splice(index, 1);
            }
        } else if (entityRole === "joueur2") {
            let index = boardJoueur2.indexOf(entity);
            if (index !== -1) {
                boardJoueur2.splice(index, 1);
            }
        }
    }
}