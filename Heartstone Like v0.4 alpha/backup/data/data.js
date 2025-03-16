// 💰 Gestion de l'or, lvl et des tours
let orJoueur = 100; 
let orIA = 100;
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
    { id: 1, nom: "Lohan le puissant", hp: 6, atk: 4, img: "img/imgcard1.png", texte: "La puissance des doudous, des rats et des pigeons !" },
    { id: 2, nom: "Maya Pig", hp: 3, atk: 3, img: "img/imgcard2.png", texte: "Partout où elle passe, la nourriture trépasse !" },
    { id: 3, nom: "Titi l'aigri", hp: 4, atk: 3, img: "img/imgcard3.png", texte: "Il n'aime personne, mais il tape fort !" },
    { id: 4, nom: "Rayan la baston", hp: 3, atk: 4, img: "img/imgcard4.png", texte: "Personne ne l'égalera en bagarre." },
    { id: 5, nom: "Papi béton", hp: 5, atk: 1, img: "img/imgcard5.png", texte: "Incassable comme du béton." },
    { id: 6, nom: "Mamie la guerrière", hp: 2, atk: 5, img: "img/imgcard6.png", texte: "Elle ne rigole pas quand elle sort son rouleau !" },
    { id: 7, nom: "Chat-Miaou le ténébreux", hp: 3, atk: 4, img: "img/imgcard7.png", texte: "Le roi des doudous." }
];
const hpCarte = [
    {id: 1, hp: 6},
    {id: 2, hp: 3},
    {id: 3, hp: 4},
    {id: 4, hp: 3},
    {id: 5, hp: 5},
    {id: 6, hp: 2},
    {id: 7, hp: 3},
]
let pvCards = [];
let pvCardsIa = [];

// 🔄 Phases du jeu
const phases = {
    1: "Choix du personnage",
    2: "Boutique de cartes",
    3: "Préparation au combat",
    4: "Combat"
};
