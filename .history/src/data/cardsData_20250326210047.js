// src/data/cardsData.js
export const cards = [
  {
    id: 1,
    nom: "Flo Mediv",
    lvl: 3,
    hp: 1,
    baseHp: 1,
    atk: 1,
    atkDispo: false,
    img: "img/card1.png",
    imgMinia: "img/cardfight1.png",
    famille: "les bbew",
    texte: "Cri de guerre : Donne +1 ATK et +1 PV aux cartes du board.",
    criDeGuerre: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        carte.atk += 1;
        carte.hp += 1;
      });
    }
  },

  { 
    id: 2, 
    nom: "Chounette", 
    lvl: 6, hp: 6, 
    baseHp: 6, atk: 6, 
    atkDispo: false, 
    img: "img/card2.png", 
    imgMinia: "img/cardfight2.png", 
    famille : "les bbew", 
    texte: "Partout où elle passe, la nourriture trépasse !", 
    poteLa: (cartesBoard) => {
    cartesBoard.forEach(carte => {
        if(carte.famille === "les bbew"){
            carte.atk += 1;
            carte.hp += 1;
        }

        });
    } 
  },

  { 
    id: 3, 
    nom: "Lohan", 
    lvl: 4, 
    hp: 5, 
    baseHp: 5, 
    atk: 4, 
    atkDispo: false, 
    img: "img/card3.png", 
    imgMinia: "img/cardfight3.png", 
    famille : "la famillia", 
    texte: "Il n'aime personne, mais il tape fort !", 
    sangNoble: (cartesBoard) => {
    cartesBoard.forEach(carte => {
        if(carte.famille === "la famillia"){
            carte.atk += 1;
            carte.hp += 1;
        }

        });
    } 
  },

  { 
    id: 4, 
    nom: "Sam'énerve", 
    lvl: 2, 
    hp: 1, 
    baseHp: 1, 
    atk: 5, 
    atkDispo: false, 
    img: "img/card4.png", 
    imgMinia: "img/cardfight4.png", 
    famille : "la famillia", 
    texte: "Personne ne l'égalera en bagarre.", 
    criDeGuerre: (cartesBoard) => {
      appliquerCriDeGuerreSurUneCible(cartesBoard, (c) => {
          c.atk += 2;
          c.hp += 0;
      });
    }, 
    cibleUnique: true // ✅ Indique que le cri de guerre ne cible qu'une carte
  },

  { 
    id: 5, 
    nom: "Floby", 
    lvl: 1, 
    hp: 3, 
    baseHp: 3, 
    atk: 2, 
    atkDispo: false, 
    img: "img/card5.png", 
    imgMinia: "img/cardfight5.png", 
    famille : "les bbew", 
    texte: "Incassable comme du béton." 
  },

  { 
    id: 6, 
    nom: "Los Mecanos", 
    lvl: 2, 
    hp: 2, 
    baseHp: 2, 
    atkDispo: false, 
    atk: 2, 
    img: "img/card6.png", 
    imgMinia: "img/cardfight6.png", 
    famille : "les bbew", 
    texte: "Elle ne rigole pas quand elle sort son rouleau !", 
    criDeGuerre: (cartesBoard) => {
      cartesBoard.forEach(carte => {
          carte.atk += 2;
          carte.hp += 0;
      });
    } 
  },

  { 
    id: 7, 
    nom: "Chat-Miaou", 
    lvl: 4, 
    hp: 4, 
    baseHp: 4, 
    atk: 4, 
    atkDispo: false, 
    img: "img/card7.png", 
    imgMinia: "img/cardfight7.png", 
    famille : "les bbew", 
    texte: "Le roi des doudous." 
  },

  { 
    id: 8, 
    nom: "Patrick", 
    lvl: 6, hp: 5, 
    baseHp: 5, 
    atk: 5, 
    atkDispo: false, 
    img: "img/card8.png", 
    imgMinia: "img/cardfight8.png", 
    famille : "la famillia", 
    texte: "Watttaaaiiiii", 
    effetDeCouple: {
      partenaire: "Patricia",
      effet: (cartesBoard) => {
        cartesBoard.forEach(carte => {
            if (carte.famille === "la famillia") {
                carte.atk += 2;
                carte.hp += 1;
            }
        });
      }
    } 
  },

  
];

  