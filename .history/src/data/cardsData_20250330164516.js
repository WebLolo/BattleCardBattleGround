
export let uniqueID = 1000;
export function getUniqueId() {
  return uniqueID++;
}

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
    famille: "la famillia",
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
    lvl: 6,
    hp: 6, 
    baseHp: 6, 
    atk: 6, 
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
    criDeGuerreUnique: (carte) => {

      carte.atk += 2;
      carte.hp += 0;

    }, 
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

  {
    id: 9,
    nom: "Les amoureux de peynet",
    lvl: 4,
    hp: 2,
    baseHp: 2,
    atk: 2,
    atkDispo: false,
    img: "img/card9.png",
    imgMinia: "img/cardfight9.png",
    famille: "la famillia",
    texte: "Je vais te manger la !!!",
    criDeGuerre: (cartesBoard) => {
      cartesBoard.forEach((carte) => {
        carte.atk += 1;
        carte.hp += 2;
      });
    },
  },
  {
    id: 10,
    nom: "Mini-Maya",
    lvl: 2,
    hp: 2,
    baseHp: 2,
    atk: 4,
    atkDispo: false,
    img: "img/card10.png",
    imgMinia: "img/cardfight10.png",
    famille: "les bbew",
    texte: "Nan mais ça va pas ou quoiii???",
  },
  {
    id: 11,
    nom: "Jeannot",
    lvl: 6,
    hp: 2,
    baseHp: 2,
    atk: 3,
    atkDispo: false,
    img: "img/card11.png",
    imgMinia: "img/cardfight11.png",
    famille: "la famillia",
    texte: "Ne vous fiez pas aux apparences ! Je suis redoutable !",
    effetDeCouple: {
      partenaire: "Huguette",
      effet: (cartesBoard) => {
        cartesBoard.forEach((carte) => {
          if (carte.famille === "la famillia") {
            carte.atk += 3;
            carte.hp += 3;
          }
        });
      },
    },
  },
  {
    id: 12,
    nom: "Huguette",
    lvl: 6,
    hp: 2,
    baseHp: 2,
    atk: 2,
    atkDispo: false,
    img: "img/card12.png",
    imgMinia: "img/cardfight12.png",
    famille: "la famillia",
    texte: "Moi et ma bande, on craint personne !!",
    effetDeCouple: {
      partenaire: "Jeannot",
      effet: (cartesBoard) => {
        cartesBoard.forEach((carte) => {
          if (carte.famille === "la famillia") {
            carte.atk += 3;
            carte.hp += 3;
          }
        });
      },
    },
  },
  {
    id: 13,
    nom: "Patricia",
    lvl: 6,
    hp: 4,
    baseHp: 4,
    atk: 4,
    atkDispo: false,
    img: "img/card13.png",
    imgMinia: "img/cardfight13.png",
    famille: "la famillia",
    texte: "MANGER DES GENS !!",
    effetDeCouple: {
      partenaire: "Patrick",
      effet: (cartesBoard) => {
        cartesBoard.forEach((carte) => {
          if (carte.famille === "la famillia") {
            carte.atk += 1;
            carte.hp += 2;
          }
        });
      },
    },
  },
  {
    id: 14,
    nom: "Rayan",
    lvl: 4,
    hp: 4,
    baseHp: 4,
    atk: 5,
    atkDispo: false,
    img: "img/card14.png",
    imgMinia: "img/cardfight14.png",
    famille: "la famillia",
    texte: "JE SUIS TON CAVA CAVALIER !!",
    sangNoble: (cartesBoard) => {
      cartesBoard.forEach((carte) => {
        if (carte.famille === "la famillia") {
          carte.atk += 1;
          carte.hp += 1;
        }
      });
    },
  },

  {
    id: 15,
    nom: "GroLolo",
    lvl: 2,
    hp: 4,
    baseHp: 4,
    atk: 2,
    atkDispo: false,
    img: "img/card15.png",
    imgMinia: "img/cardfight15.png",
    famille: "les bbew",
    texte: "JE SUIS TON CAVA CAVALIER !!"
  },
  {
    id: 16,
    nom: "Titi l'aigri",
    lvl: 1,
    hp: 2,
    baseHp: 2,
    atk: 3,
    atkDispo: false,
    img: "img/card16.png",
    imgMinia: "img/cardfight16.png",
    famille: "la famillia",
    texte: "Lien de sang : gagne +1/+1 pour chaque bête sur le Board"
  },
  {
    id: 17,
    nom: "Maya Bull",
    lvl: 1,
    hp: 3,
    baseHp: 3,
    atk: 2,
    atkDispo: false,
    img: "img/card17.png",
    imgMinia: "img/cardfight17.png",
    famille: "la famillia",
    texte: "Cri de guerre : Donne +1/+1 aux bêtes présentes sur le board"
  },
  {
    id: 18,
    nom: "Thomux",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 6,
    atkDispo: false,
    img: "img/card18.png",
    imgMinia: "img/cardfight18.png",
    famille: "les bbew",
    texte: "Pote la ! : Lui et ses potes sur le Board gagnent +1/+1",
    poteLa: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "les bbew") {
          carte.atk += 1;
          carte.hp += 1;
        }
      });
    }
  },
  {
    id: 19,
    nom: "LES BBEW",
    lvl: 3,
    hp: 5,
    baseHp: 5,
    atk: 3,
    atkDispo: false,
    img: "img/card19.png",
    imgMinia: "img/cardfight19.png",
    famille: "les bbew",
    texte: "La bande de potes au complet !",
    aura: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "les bbew") {
          carte.atk += 1;
          carte.hp += 1;
          carte.buffAtk += 1;
          carte.buffHp += 1;
          carte.auraEffect = true;
        }
      });
    },
    auraSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.auraEffect === true) {
          carte.atk -= 1;
          carte.hp -= 1;
          carte.buffAtk -= 1;
          carte.buffHp -= 1;
          if(carte.buffHp === 0 && carte.buffHp === 0){
            carte.auraEffect = false
          }
          
        }
      });
    }
  },
  {
    id: 20,
    nom: "PIOU PIOU !",
    lvl: 1,
    hp: 3,
    baseHp: 3,
    atk: 1,
    atkDispo: false,
    img: "img/card20.png",
    imgMinia: "img/cardfight20.png",
    famille: "les bbew",
    texte: "PIOU PIOU !"
  },
  {
    id: 21,
    nom: "Piou Piou",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 6,
    atkDispo: false,
    img: "img/card21.png",
    imgMinia: "img/cardfight21.png",
    famille: "les bbew",
    texte: "Pote la ! : Elle et ses potes sur le Board gagnent +1/+1",
    poteLa: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "les bbew") {
          carte.atk += 1;
          carte.hp += 1;
        }
      });
    }
  },
  {
    id: 22,
    nom: "Fufu",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 6,
    atkDispo: false,
    img: "img/card22.png",
    imgMinia: "img/cardfight22.png",
    famille: "les bbew",
    texte: "Pote la ! : Lui et ses potes sur le Board gagnent +1/+1",
    poteLa: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "les bbew") {
          carte.atk += 1;
          carte.hp += 1;
        }
      });
    }
  },
  {
    id: 23,
    nom: "Tek",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 6,
    atkDispo: false,
    img: "img/card23.png",
    imgMinia: "img/cardfight23.png",
    famille: "les bbew",
    texte: "Pote la ! : Lui et ses potes sur le Board gagnent +1/+1",
    poteLa: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "les bbew") {
          carte.atk += 1;
          carte.hp += 1;
        }
      });
    }
  },
  {
    id: 24,
    nom: "Lolotte",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 6,
    atkDispo: false,
    img: "img/card24.png",
    imgMinia: "img/cardfight24.png",
    famille: "les bbew",
    texte: "Pote la ! : Elle et ses potes sur le Board gagnent +1/+1",
    poteLa: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "les bbew") {
          carte.atk += 1;
          carte.hp += 1;
        }
      });
    }
  },
  {
    id: 25,
    nom: "Ced",
    lvl: 5,
    hp: 5,
    baseHp: 5,
    atk: 5,
    atkDispo: false,
    img: "img/card25.png",
    imgMinia: "img/cardfight25.png",
    famille: "la famillia",
    texte: "Sang Noble : Lui et ses semblables sur le Board gagnent +2/+1",
    sangNoble: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "la famillia") {
          carte.atk += 2;
          carte.hp += 1;
        }
      });
    }
  },
  {
    id: 26,
    nom: "Maeva",
    lvl: 5,
    hp: 4,
    baseHp: 4,
    atk: 6,
    atkDispo: false,
    img: "img/card26.png",
    imgMinia: "img/cardfight26.png",
    famille: "la famillia",
    texte: "Sang Noble : Elle et ses semblables sur le Board gagnent +1/+1",
    sangNoble: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "la famillia") {
          carte.atk += 1;
          carte.hp += 2;
        }
      });
    }
  },
  {
    id: 27,
    nom: "MiniPampa",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 6,
    atkDispo: false,
    img: "img/card27.png",
    imgMinia: "img/cardfight27.png",
    famille: "les bbew",
    texte: "Pote la ! : Elle et ses potes sur le Board gagnent +1/+1",
    poteLa: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "les bbew") {
          carte.atk += 1;
          carte.hp += 1;
        }
      });
    }
  },
  {
    id: 28,
    nom: "Rok’gar Croc-des-Mers",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 6,
    atkDispo: false,
    img: "img/card28.png",
    imgMinia: "img/cardfight28.png",
    famille: "Croc-Noir",
    texte: "Pote la ! : Elle et ses potes sur le Board gagnent +3/+3",
    poteLa: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "Croc-Noir") {
          carte.atk += 3;
          carte.hp += 3;
        }
      });
    }
  }
];

  