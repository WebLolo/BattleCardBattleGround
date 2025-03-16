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
    { id: 1, nom: "lololechaud", hp: 30, imgLink: "img/persololo.png" },
    { id: 2, nom: "maevacoupdebras", hp: 30, imgLink: "img/persomaeva.png" }
];

// 🍻 Liste des taverniers disponibles
const taverniers = [
    { id: 1, nom: "Chounette la tavernière", imgLink: "img/tavernierChoune.png" }
];

// 🎴 Cartes disponibles en jeu
const cartes = [
    { id: 1, nom: "Lohan le puissant", hp: 6, baseHp: 6, atk: 4, atkDispo: false, img: "img/imgcard1.png", texte: "Cri de guerre : Donne +1 ATK et +1 PV aux cartes du board." },
    { id: 2, nom: "Maya Pig", hp: 3, baseHp: 3, atk: 3, atkDispo: false, img: "img/imgcard2.png", texte: "Partout où elle passe, la nourriture trépasse !" },
    { id: 3, nom: "Titi l'aigri", hp: 4, baseHp: 4, atk: 3, atkDispo: false, img: "img/imgcard3.png", texte: "Il n'aime personne, mais il tape fort !" },
    { id: 4, nom: "Rayan la baston", hp: 3, baseHp: 3, atk: 4, atkDispo: false, img: "img/imgcard4.png", texte: "Personne ne l'égalera en bagarre." },
    { id: 5, nom: "Papi béton", hp: 5, baseHp: 5, atk: 1, atkDispo: false, img: "img/imgcard5.png", texte: "Incassable comme du béton." },
    { id: 6, nom: "Mamie la guerrière", hp: 2, baseHp: 2, atkDispo: false, atk: 5, img: "img/imgcard6.png", texte: "Elle ne rigole pas quand elle sort son rouleau !" },
    { id: 7, nom: "Chat-Miaou le ténébreux", hp: 3, baseHp: 3, atk: 4, atkDispo: false, img: "img/imgcard7.png", texte: "Le roi des doudous." },
    { id: 8, nom: "Kung-fu Pinceau", hp: 3, baseHp: 3, atk: 5, atkDispo: false, img: "img/imgcard8.png", texte: "Watttaaaiiiii" },
    { id: 9, nom: "LE CHIENGG", hp: 6, baseHp: 6, atk: 4, atkDispo: false, img: "img/imgcard9.png", texte: "Je vais te manger la !!!" },
    { id: 10, nom: "Maeva la wesh wesh", hp: 3, baseHp: 3, atk: 4, atkDispo: false, img: "img/imgcard10.png", texte: "Nan mais ça va pas ou quoiii???" },
    { id: 11, nom: "La fée Chrystelle", hp: 2, baseHp: 2, atk: 1, atkDispo: false, img: "img/imgcard11.png", texte: "Ne vous fiez pas aux apparences ! Je suis redoutable !", criDeGuerre: (cartesBoard) => {
        cartesBoard.forEach(carte => {
            carte.atk += 1;
            carte.hp += 1;
        });
    } },
    { id: 12, nom: "La Doudou's family", hp: 8, baseHp: 8, atk: 2, atkDispo: false, img: "img/imgcard12.png", texte: "Moi et ma bande, on craint personne !!" },
    { id: 13, nom: "Sam'énerve", hp: 2, baseHp: 2, atk: 7, atkDispo: false, img: "img/imgcard13.png", texte: "MANGER DES GENS !!" },
    { id: 14, nom: "LOHAGNEEEEEE", hp: 3, baseHp: 3, atk: 6, atkDispo: false, img: "img/imgcard14.png", texte: "JE SUIS TON CAVA CAVALIER !!" },
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
