// 💰 Gestion de l'or, lvl et des tours
let orJoueur = 3; 
let orIA = 3;
let orTour1 = 3; 
let maxOr = 10; 
let tour = 1; 
let phaseActuelle = null
let lvlTaverne = 1;
const maxLvlTaverne = 6;
let personnageIA = null;
let personnageJoueur = null;

// Coûts de montée en niveau (ex: 5 or pour lvl 2, 7 or pour lvl 3...)
const coutLvlTaverne = {
    1: 5,  // Passer du niveau 1 → 2
    2: 7,  // Passer du niveau 2 → 3
    3: 8,  // Passer du niveau 3 → 4
    4: 10, // Passer du niveau 4 → 5
    5: 10  // Passer du niveau 5 → 6
};


// 🏆 Board des joueurs
let cartesBoard = []; // Cartes du joueur en jeu
let cartesBoardIA = []; // Cartes de l'IA en jeu
let cartesDeck = []; // Cartes du joueur dans le deck
let cartesShop = []; // Cartes proposé dans le shop
let boardAvantCombat = []
let boardAvantCombatIa = []

// 👤 Liste des personnages disponibles
const personnages = [
    { id: 1, nom: "lololechaud", hp: 30, imgLink: "img/persololohud.png" },
    { id: 2, nom: "maevacoupdebras", hp: 30, imgLink: "img/persomaehud.png" },
];

// 🍻 Liste des taverniers disponibles
const taverniers = [
    { id: 1, nom: "Chounette la tavernière", imgLink: "img/persodariushud.png" }
];

// 🎴 Cartes disponibles en jeu
const cartes = [
    { id: 1, nom: "Flo Mediv", hp: 1, baseHp: 1, atk: 1, atkDispo: false, img: "img/card1.png", imgMinia: "img/cardfight1.1.png", texte: "Cri de guerre : Donne +1 ATK et +1 PV aux cartes du board.", criDeGuerre: (cartesBoard) => {
        cartesBoard.forEach(carte => {
            carte.atk += 1;
            carte.hp += 1;
        });
    } },
    { id: 2, nom: "Chounette", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/card2.png", imgMinia: "img/cardfight2.1.png", texte: "Partout où elle passe, la nourriture trépasse !" },
    { id: 3, nom: "Lohan le Brave", hp: 6, baseHp: 6, atk: 6, atkDispo: false, img: "img/card3.png", imgMinia: "img/cardfight3.1.png", texte: "Il n'aime personne, mais il tape fort !" },
    { id: 4, nom: "Sam'énerve", hp: 2, baseHp: 2, atk: 5, atkDispo: false, img: "img/card4.png", imgMinia: "img/cardfight4.1.png", texte: "Personne ne l'égalera en bagarre." },
    { id: 5, nom: "Floby", hp: 2, baseHp: 2, atk: 3, atkDispo: false, img: "img/card5.png", imgMinia: "img/cardfight5.1.png", texte: "Incassable comme du béton." },
    { id: 6, nom: "Los Mecanos", hp: 2, baseHp: 2, atkDispo: false, atk: 5, img: "img/card6.png", imgMinia: "img/cardfight6.1.png", texte: "Elle ne rigole pas quand elle sort son rouleau !", criDeGuerre: (cartesBoard) => {
        cartesBoard.forEach(carte => {
            carte.atk += 2;
            carte.hp += 0;
        });
    } },
    { id: 7, nom: "Chat-Miaou", hp: 3, baseHp: 3, atk: 4, atkDispo: false, img: "img/card7.png", imgMinia: "img/cardfight7.1.png", texte: "Le roi des doudous." },
    { id: 8, nom: "Papy King", hp: 2, baseHp: 2, atk: 3, atkDispo: false, img: "img/card8.png", imgMinia: "img/cardfight8.1.png", texte: "Watttaaaiiiii" },
    { id: 9, nom: "Les amoureux de peynet", hp: 2, baseHp: 2, atk: 2, atkDispo: false, img: "img/card9.png", imgMinia: "img/cardfight9.1.png", texte: "Je vais te manger la !!!", criDeGuerre: (cartesBoard) => {
        cartesBoard.forEach(carte => {
            carte.atk += 1;
            carte.hp += 2;
        });
    } },
    { id: 10, nom: "Mini-Maya", hp: 4, baseHp: 4, atk: 4, atkDispo: false, img: "img/card10.png", imgMinia: "img/cardfight10.1.png", texte: "Nan mais ça va pas ou quoiii???" },
    { id: 11, nom: "Jeannot", hp: 2, baseHp: 2, atk: 3, atkDispo: false, img: "img/card11.png", imgMinia: "img/cardfight11.1.png", texte: "Ne vous fiez pas aux apparences ! Je suis redoutable !"},
    { id: 12, nom: "Huguette", hp: 3, baseHp: 3, atk: 2, atkDispo: false, img: "img/card12.png", imgMinia: "img/cardfight12.1.png", texte: "Moi et ma bande, on craint personne !!" },
    { id: 13, nom: "Mamie la guerrière", hp: 2, baseHp: 2, atk: 5, atkDispo: false, img: "img/card13.png", imgMinia: "img/cardfight13.1.png", texte: "MANGER DES GENS !!" },
    { id: 14, nom: "Rayan", hp: 6, baseHp: 6, atk: 6, atkDispo: false, img: "img/card14.png", imgMinia: "img/cardfight14.1.png", texte: "JE SUIS TON CAVA CAVALIER !!" },
    { id: 15, nom: "GroLolo", hp: 7, baseHp: 7, atk: 2, atkDispo: false, img: "img/card15.png", imgMinia: "img/cardfight15.1.png", texte: "JE SUIS TON CAVA CAVALIER !!" },
    { id: 16, nom: "Titi l'aigri", hp: 3, baseHp: 3, atk: 2, atkDispo: false, img: "img/card16.png", imgMinia: "img/cardfight16.1.png", texte: "Lien de sang : gagne 1 ++1 pour chaques bêtes sur le Board" },
    { id: 17, nom: "Maya Bull", hp: 3, baseHp: 3, atk: 4, atkDispo: false, img: "img/card17.png", imgMinia: "img/cardfight17.1.png", texte: "Cri de guerre : Donne +1 +1 aux bêtes présentes sur le board" },
    { id: 18, nom: "Thomux", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/card18.png", imgMinia: "img/cardfight18.1.png", texte: "Pote la ! : Lui et ses potes sur le Board gagnent +1 +1" },
    { id: 19, nom: "LES BBEW", hp: 5, baseHp: 5, atk: 2, atkDispo: false, img: "img/card19.png", imgMinia: "img/cardfight19.1.png", texte: "La bande de potes au complet !" },
    { id: 20, nom: "PIOU PIOU !", hp: 4, baseHp: 4, atk: 2, atkDispo: false, img: "img/card20.png", imgMinia: "img/cardfight20.1.png", texte: "PIOU PIOU !" },
    { id: 21, nom: "Piou Piou", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/card21.png", imgMinia: "img/cardfight21.1.png", texte: "Pote la ! : Elle et ses potes sur le Board gagnent +1 +1" },
    { id: 22, nom: "Fufu", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/card22.png", imgMinia: "img/cardfight22.1.png", texte: "Pote la ! : Lui et ses potes sur le Board gagnent +1 +1" },
    { id: 23, nom: "Tek", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/card23.png", imgMinia: "img/cardfight23.1.png", texte: "Pote la ! : Lui et ses potes sur le Board gagnent +1 +1" },
    { id: 24, nom: "Lolotte", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/card24.png", imgMinia: "img/cardfight24.1.png", texte: "Pote la ! : Elle et ses potes sur le Board gagnent +1 +1" },
    { id: 25, nom: "Ced", hp: 6, baseHp: 6, atk: 6, atkDispo: false, img: "img/card25.png", imgMinia: "img/cardfight25.1.png", texte: "Sang Noble : Lui et ses semblables sur le Board gagnent +1 +1" },
    { id: 26, nom: "Maeva", hp: 6, baseHp: 6, atk: 6, atkDispo: false, img: "img/card26.png", imgMinia: "img/cardfight26.1.png", texte: "Sang Noble : Elle et ses semblables sur le Board gagnent +1 +1" },
    { id: 27, nom: "MiniPampa", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/card27.png", imgMinia: "img/cardfight27.1.png", texte: "Pote la ! : Elle et ses potes sur le Board gagnent +1 +1" },
];

let pvCards = [];
let pvCardsIa = [];

// 🔄 Phases du jeu
const phases = {
    1: "Choix du personnage",
    2: "Boutique de cartes",
    3: "Préparation au combat",
    4: "Combat"
};

let uniqueIdCounter = 1000; // Démarre à 1000 pour éviter les collisions
