// 💰 Gestion de l'or, lvl et des tours
let orJoueur = 100; 
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
    { id: 1, nom: "Flo Mediv", hp: 1, baseHp: 1, atk: 1, atkDispo: false, img: "img/imgcards/imgcard1.png", imgMinia: "img/imgcards/imgcardFight1.png", texte: "Cri de guerre : Donne +1 ATK et +1 PV aux cartes du board.", criDeGuerre: (cartesBoard) => {
        cartesBoard.forEach(carte => {
            carte.atk += 1;
            carte.hp += 1;
        });
    } },
    { id: 2, nom: "Chounette", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/imgcards/imgcard2.png", imgMinia: "img/imgcards/imgcardFight2.png", texte: "Partout où elle passe, la nourriture trépasse !" },
    { id: 3, nom: "Lohan L'ogre", hp: 4, baseHp: 4, atk: 4, atkDispo: false, img: "img/imgcards/imgcard3.png", imgMinia: "img/imgcards/imgcardFight3.png", texte: "Il n'aime personne, mais il tape fort !" },
    { id: 4, nom: "Sam'énerve", hp: 2, baseHp: 2, atk: 5, atkDispo: false, img: "img/imgcards/imgcard4.png", imgMinia: "img/imgcards/imgcardFight4.png", texte: "Personne ne l'égalera en bagarre." },
    { id: 5, nom: "Floby", hp: 2, baseHp: 2, atk: 3, atkDispo: false, img: "img/imgcards/imgcard5.png", imgMinia: "img/imgcards/imgcardFight5.png", texte: "Incassable comme du béton." },
    { id: 6, nom: "Los Mecanos", hp: 2, baseHp: 2, atkDispo: false, atk: 5, img: "img/imgcards/imgcard6.png", imgMinia: "img/imgcards/imgcardFight6.png", texte: "Elle ne rigole pas quand elle sort son rouleau !", criDeGuerre: (cartesBoard) => {
        cartesBoard.forEach(carte => {
            carte.atk += 2;
            carte.hp += 0;
        });
    } },
    { id: 7, nom: "Chat-Miaou", hp: 3, baseHp: 3, atk: 4, atkDispo: false, img: "img/imgcards/imgcard7.png", imgMinia: "img/imgcards/imgcardFight7.png", texte: "Le roi des doudous." },
    { id: 8, nom: "Papy King", hp: 2, baseHp: 2, atk: 3, atkDispo: false, img: "img/imgcards/imgcard8.png", imgMinia: "img/imgcards/imgcardFight8.png", texte: "Watttaaaiiiii" },
    { id: 9, nom: "Les amoureux de peynet", hp: 2, baseHp: 2, atk: 2, atkDispo: false, img: "img/imgcards/imgcard9.png", imgMinia: "img/imgcards/imgcardFight9.png", texte: "Je vais te manger la !!!", criDeGuerre: (cartesBoard) => {
        cartesBoard.forEach(carte => {
            carte.atk += 1;
            carte.hp += 2;
        });
    } },
    { id: 10, nom: "Mini-Maya", hp: 4, baseHp: 4, atk: 4, atkDispo: false, img: "img/imgcards/imgcard10.png", imgMinia: "img/imgcards/imgcardFight10.png", texte: "Nan mais ça va pas ou quoiii???" },
    { id: 11, nom: "Jeannot", hp: 2, baseHp: 2, atk: 3, atkDispo: false, img: "img/imgcards/imgcard11.png", imgMinia: "img/imgcards/imgcardFight11.png", texte: "Ne vous fiez pas aux apparences ! Je suis redoutable !"},
    { id: 12, nom: "Huguette", hp: 3, baseHp: 3, atk: 2, atkDispo: false, img: "img/imgcards/imgcard12.png", imgMinia: "img/imgcards/imgcardFight12.png", texte: "Moi et ma bande, on craint personne !!" },
    { id: 13, nom: "Mamie la guerrière", hp: 2, baseHp: 2, atk: 5, atkDispo: false, img: "img/imgcards/imgcard13.png", imgMinia: "img/imgcards/imgcardFight13.png", texte: "MANGER DES GENS !!" },
    { id: 14, nom: "Rayan", hp: 6, baseHp: 6, atk: 6, atkDispo: false, img: "img/imgcards/imgcard14.png", imgMinia: "img/imgcards/imgcardFight14.png", texte: "JE SUIS TON CAVA CAVALIER !!" },
    { id: 15, nom: "GroLolo", hp: 7, baseHp: 7, atk: 2, atkDispo: false, img: "img/imgcards/imgcard15.png", imgMinia: "img/imgcards/imgcardFight15.png", texte: "JE SUIS TON CAVA CAVALIER !!" },
    { id: 16, nom: "Titi l'aigri", hp: 3, baseHp: 3, atk: 2, atkDispo: false, img: "img/imgcards/imgcard16.png", imgMinia: "img/imgcards/imgcardFight16.png", texte: "Lien de sang : gagne 1 ++1 pour chaques bêtes sur le Board" },
    { id: 17, nom: "Maya Bull", hp: 3, baseHp: 3, atk: 4, atkDispo: false, img: "img/imgcards/imgcard17.png", imgMinia: "img/imgcards/imgcardFight17.png", texte: "Cri de guerre : Donne +1 +1 aux bêtes présentes sur le board" },
    { id: 18, nom: "Thomux", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/imgcards/imgcard18.png", imgMinia: "img/imgcards/imgcardFight18.png", texte: "Pote la ! : Lui et ses potes sur le Board gagnent +1 +1" },
    { id: 19, nom: "LES BBEW", hp: 5, baseHp: 5, atk: 2, atkDispo: false, img: "img/imgcards/imgcard19.png", imgMinia: "img/imgcards/imgcardFight19.png", texte: "La bande de potes au complet !" },
    { id: 20, nom: "PIOU PIOU !", hp: 4, baseHp: 4, atk: 2, atkDispo: false, img: "img/imgcards/imgcard20.png", imgMinia: "img/imgcards/imgcardFight20.png", texte: "PIOU PIOU !" },
    { id: 21, nom: "Piou Piou", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/imgcards/imgcard21.png", imgMinia: "img/imgcards/imgcardFight21.png", texte: "Pote la ! : Elle et ses potes sur le Board gagnent +1 +1" },
    { id: 22, nom: "Fufu", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/imgcards/imgcard22.png", imgMinia: "img/imgcards/imgcardFight22.png", texte: "Pote la ! : Lui et ses potes sur le Board gagnent +1 +1" },
    { id: 23, nom: "Tek", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/imgcards/imgcard23.png", imgMinia: "img/imgcards/imgcardFight23.png", texte: "Pote la ! : Lui et ses potes sur le Board gagnent +1 +1" },
    { id: 24, nom: "Lolotte", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/imgcards/imgcard24.png", imgMinia: "img/imgcards/imgcardFight24.png", texte: "Pote la ! : Elle et ses potes sur le Board gagnent +1 +1" },
    { id: 25, nom: "Ced", hp: 6, baseHp: 6, atk: 6, atkDispo: false, img: "img/imgcards/imgcard25.png", imgMinia: "img/imgcards/imgcardFight25.png", texte: "Sang Noble : Lui et ses semblables sur le Board gagnent +1 +1" },
    { id: 26, nom: "Maeva", hp: 6, baseHp: 6, atk: 6, atkDispo: false, img: "img/imgcards/imgcard26.png", imgMinia: "img/imgcards/imgcardFight26.png", texte: "Sang Noble : Elle et ses semblables sur le Board gagnent +1 +1" },
    { id: 27, nom: "MiniPampa", hp: 5, baseHp: 5, atk: 5, atkDispo: false, img: "img/imgcards/imgcard27.png", imgMinia: "img/imgcards/imgcardFight27.png", texte: "Pote la ! : Elle et ses potes sur le Board gagnent +1 +1" },
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
