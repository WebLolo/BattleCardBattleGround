import { oneTicDebutCombat } from "../utils/mecaUtils";

export let uniqueID = 1000;
export function getUniqueId() {
  return uniqueID++;
}
export let boardPosition = 0;
export function getBoardPosition() {
  return boardPosition++;
}
export function getBoardPositionDec() {
  return boardPosition--;
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
    famille: "les bbew", 
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
    lvl: 3, 
    hp: 3, 
    baseHp: 3, 
    atk: 3, 
    atkDispo: false, 
    img: "img/card3.png", 
    imgMinia: "img/cardfight3.png", 
    famille: "la famillia", 
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
    atk: 4, 
    atkDispo: false, 
    img: "img/card4.png", 
    imgMinia: "img/cardfight4.png", 
    famille: "la famillia", 
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
    famille: "les bbew", 
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
    famille: "les bbew", 
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
    famille: "les bbew", 
    texte: "Le roi des doudous." 
  },

  { 
    id: 8, 
    nom: "Patrick", 
    lvl: 5, 
    hp: 5, 
    baseHp: 5, 
    atk: 5, 
    atkDispo: false, 
    img: "img/card8.png", 
    imgMinia: "img/cardfight8.png", 
    famille: "la famillia", 
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
    lvl: 5,
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
    lvl: 3,
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
    },
    auraUnique: (carte) => {
      if (carte.famille === "les bbew") {
        carte.atk += 1;
        carte.hp += 1;
        carte.buffAtk += 1;
        carte.buffHp += 1;
        carte.auraEffect = true; 
      }     
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
    nom: "Cedric",
    lvl: 4,
    hp: 5,
    baseHp: 5,
    atk: 5,
    atkDispo: false,
    img: "img/card25.png",
    imgMinia: "img/cardfight25.png",
    famille: "la famillia",
    texte: "Sang Noble : Lui et ses semblables sur le Board gagnent +2/+1",
    effetDeCouple: {
      partenaire: "Aurelie",
      effet: (cartesBoard) => {
        cartesBoard.forEach((carte) => {
          if (carte.famille === "la famillia") {
            carte.atk += 1;
            carte.hp += 1;
          }
        });
      },
    },
  },
  {
    id: 26,
    nom: "Maeva",
    lvl: 4,
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
    nom: "Aurelie",
    lvl: 4,
    hp: 5,
    baseHp: 5,
    atk: 3,
    atkDispo: false,
    img: "img/card28.png",
    imgMinia: "img/cardfight28.png",
    famille: "la famillia",
    texte: "Pote la ! : Elle et ses potes sur le Board gagnent +3/+3",
    effetDeCouple: {
      partenaire: "Cedric",
      effet: (cartesBoard) => {
        cartesBoard.forEach((carte) => {
          if (carte.famille === "la famillia") {
            carte.atk += 1;
            carte.hp += 1;
          }
        });
      },
    },
  },
  {
    id: 29,
    nom: "Rok'gar Croc-des-Mers",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 5,
    atkDispo: false,
    img: "img/card29.png",
    imgMinia: "img/cardfight29.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    aura: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
          carte.atk += 2;
          carte.buffAtk += 2;
          carte.auraEffect = true;
        }
        
      });
    },
    auraSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.auraEffect === true && carte.sousFamille === "Marin") {
          carte.atk -= 2;
          carte.buffAtk -= 2;
          if(carte.buffHp === 0 && carte.buffAtk === 0){
            carte.auraEffect = false
          }        
        }
      });
    },
    auraUnique: (carte) => {
      if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
        carte.atk += 2;
        carte.buffAtk += 2;
        carte.auraEffect = true; 
      }     
    },
    bivalence: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        let karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        let bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        if (!carte.bivalenceSources) carte.bivalenceSources = [];
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
          if(carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Rok’gar")){
            carte.atk += 4 + bonus;
            carte.buffAtkBivalence += 4 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Rok’gar");
          }
          if(!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Rok’gar")){
            carte.atk -= 4 + bonus;
            carte.buffAtkBivalence -= 4 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Rok’gar");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false
            }
          }
        }
      })
    },
    bivalenceSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) return;
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
        // Si la source est présente dans les effets appliqués
        if (carte.bivalenceSources.includes("Rok’gar")) {
    
          // Retrait des effets appliqués par cette source
          if (carte.bivalenceMarinEffect) {
            carte.atk -= 4 + bonus;
            carte.buffAtkBivalence -= 4 + bonus;
          }
    
          // Suppression de la source
          carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Rok’gar");
    
          // Si plus aucun buff actif, on désactive le flag global
          if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
            carte.bivalenceEffect = false;
          }
        }
      });
    },
    effetDeCouple: {
      partenaire: "Darka la Brise-Voiles",
      effetUnique: (carte) => {
        carte.atk += 0;
      },
    },
  },
  {
    id: 30,
    nom: "La Matriarche Sang'Thalla",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 5,
    atkDispo: false,
    img: "img/card30.png",
    imgMinia: "img/cardfight30.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    aura: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
          carte.hp += 2;
          carte.buffHp += 2;
          carte.auraEffect = true;
        }
        
      });
    },
    auraSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.auraEffect === true && carte.sousFamille === "Terrestre") {
          carte.hp -= 2;
          carte.buffHp -= 2;
          if(carte.buffHp === 0 && carte.buffAtk === 0){
            carte.auraEffect = false
          }        
        }
      });
    },
    auraUnique: (carte) => {
      if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
        carte.hp += 2;
        carte.buffHp += 2;
        carte.auraEffect = true; 
      }     
    },
    bivalence: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        let karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        let bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        
        if (!carte.bivalenceSources) carte.bivalenceSources = [];
    
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
          if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Sang'Thalla")) {
            carte.atk += 1 + bonus;
            carte.buffAtkBivalence += 1 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Sang'Thalla");
          }
          if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Sang'Thalla")) {
            carte.atk -= 1 + bonus;
            carte.buffAtkBivalence -= 1 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Sang'Thalla");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
        
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
          if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Sang'Thalla")) {
            carte.hp += 3 + bonus;
            carte.buffHpBivalence += 3 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Sang'Thalla");
          }
          if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Sang'Thalla")) {
            carte.hp -= 3 + bonus;
            carte.buffHpBivalence -= 3 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Sang'Thalla");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
      });
    },
    bivalenceSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) return;
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        // Si la source est présente dans les effets appliqués
        if (carte.bivalenceSources.includes("Sang'Thalla")) {
    
          // Retrait des effets appliqués par cette source
          if (carte.bivalenceMarinEffect) {
            
            carte.atk -= 1 + bonus;
            carte.buffAtkBivalence -= 1 + bonus;
          }
    
          if (carte.bivalenceTerrestreEffect) {
            carte.hp -= 3 + bonus;
            carte.buffHpBivalence -= 3 + bonus;
          }
    
          // Suppression de la source
          carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Sang'Thalla");
    
          // Si plus aucun buff actif, on désactive le flag global
          if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
            carte.bivalenceEffect = false;
          }
        }
      });
    },
  },
  {
    id: 31,
    nom: "Shak’Noth, l’Oracle des Marées",
    lvl: 6,
    hp: 4,
    baseHp: 4,
    atk: 7,
    atkDispo: false,
    img: "img/card31.png",
    imgMinia: "img/cardfight31.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    piocherCarte: true,
    texte: "*",
  },
  {
    id: 32,
    nom: "Kaz'Drok le Maudit",
    lvl: 6,
    hp: 7,
    baseHp: 7,
    atk: 2,
    atkDispo: false,
    img: "img/card32.png",
    imgMinia: "img/cardfight32.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    aoe: (cartesBoardAdv) => {
      cartesBoardAdv.forEach(carte => {
        carte.hp -= 2;
        carte.degatsRecus = 2;
        carte.animAoE = true;
      });
    },
    bivalence: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        if (!carte.bivalenceSources) carte.bivalenceSources = [];
    
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
          if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Kaz'Drok")) {
            carte.hp += 1 + bonus;
            carte.buffHpBivalence += 1 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Kaz'Drok");
          }
          if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Kaz'Drok")) {
            carte.hp -= 1 + bonus;
            carte.buffHpBivalence -= 1 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Kaz'Drok");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
        
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
          if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Kaz'Drok")) {
            carte.atk += 1 + bonus;
            carte.buffAtkBivalence += 1 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Kaz'Drok");
          }
          if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Kaz'Drok")) {
            carte.atk -= 1 + bonus;
            carte.buffAtkBivalence -= 1 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Kaz'Drok");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
      });
    },
    bivalenceSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) return;
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        // Si la source est présente dans les effets appliqués
        if (carte.bivalenceSources.includes("Kaz'Drok")) {
    
          // Retrait des effets appliqués par cette source
          if (carte.bivalenceMarinEffect) {
            
            carte.hp -= 1;
            carte.buffHpBivalence -= 1 + bonus;
          }
    
          if (carte.bivalenceTerrestreEffect) {
            carte.atk -= 1;
            carte.buffAtkBivalence -= 1 + bonus;
          }
    
          // Suppression de la source
          carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Kaz'Drok");
    
          // Si plus aucun buff actif, on désactive le flag global
          if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
            carte.bivalenceEffect = false;
          }
        }
      });
    },
  },
  {
    id: 33,
    nom: "Zog'Bar le Vent d'Acier",
    lvl: 6,
    hp: 5,
    baseHp: 5,
    atk: 4,
    atkDispo: false,
    img: "img/card33.png",
    imgMinia: "img/cardfight33.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    degatsAdj: true,
    bivalence: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) carte.bivalenceSources = [];
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
          if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Zog'Bar")) {
            carte.atk += 3 + bonus;
            carte.buffAtkBivalence += 3 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Zog'Bar");
          }
          if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Zog'Bar")) {
            carte.atk -= 3 + bonus;
            carte.buffAtkBivalence -= 3 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zog'Bar");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
        
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
          if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Zog'Bar")) {
            carte.hp += 3 + bonus;
            carte.buffHpBivalence += 3 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Zog'Bar");
          }
          if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Zog'Bar")) {
            carte.hp -= 3 + bonus;
            carte.buffHpBivalence -= 3 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zog'Bar");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
      });
    },
    bivalenceSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) return;
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        // Si la source est présente dans les effets appliqués
        if (carte.bivalenceSources.includes("Zog'Bar")) {
    
          // Retrait des effets appliqués par cette source
          if (carte.bivalenceMarinEffect) {
            
            carte.atk -= 3 + bonus;
            carte.buffAtkBivalence -= 3 + bonus;
          }
    
          if (carte.bivalenceTerrestreEffect) {
            carte.hp -= 3 + bonus;
            carte.buffHpBivalence -= 3 + bonus;
          }
    
          // Suppression de la source
          carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zog'Bar");
    
          // Si plus aucun buff actif, on désactive le flag global
          if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
            carte.bivalenceEffect = false;
          }
        }
      });
    },
  },
  {
    id: 34,
    nom: "Darka la Brise-Voiles",
    lvl: 5,
    hp: 6,
    baseHp: 6,
    atk: 4,
    atkDispo: false,
    img: "img/card34.png",
    imgMinia: "img/cardfight34.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    effetDeCouple: {
      partenaire: "Rok'gar Croc-des-Mers",
      effetUnique: (carte) => {
        carte.atk += 4;
      },
    },
    bivalence: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) carte.bivalenceSources = [];
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
          if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Darka")) {
            carte.atk += 2 + bonus;
            carte.buffAtkBivalence += 2 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Darka");
          }
          if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Darka")) {
            carte.atk -= 2 + bonus;
            carte.buffAtkBivalence -= 2 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Darka");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
        
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
          if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Darka")) {
            carte.hp += 2 + bonus;
            carte.buffHpBivalence += 2 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Darka");
          }
          if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Darka")) {
            carte.hp -= 2 + bonus;
            carte.buffHpBivalence -= 2 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Darka");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
      });
    },
    bivalenceSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) return;
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        // Si la source est présente dans les effets appliqués
        if (carte.bivalenceSources.includes("Darka")) {
    
          // Retrait des effets appliqués par cette source
          if (carte.bivalenceMarinEffect) {
            
            carte.atk -= 2 + bonus;
            carte.buffAtkBivalence -= 2 + bonus;
          }
    
          if (carte.bivalenceTerrestreEffect) {
            carte.hp -= 2 + bonus;
            carte.buffHpBivalence -= 2 + bonus;
          }
    
          // Suppression de la source
          carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Darka");
    
          // Si plus aucun buff actif, on désactive le flag global
          if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
            carte.bivalenceEffect = false;
          }
        }
      });
    },
  },
  {
    id: 35,
    nom: "Grûm le Sculpteur de Crocs",
    lvl: 5,
    hp: 7,
    baseHp: 7,
    atk: 3,
    atkDispo: false,
    img: "img/card35.png",
    imgMinia: "img/cardfight35.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if (mortCarte.famille !== "Croc-Noir" || mortCarte.id === self.id) return;
      const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
      const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Croc-Noir" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      );
    
      if (cibles.length === 0) return;
    
      // Choisir une cible aléatoire
      const cible = cibles[Math.floor(Math.random() * cibles.length)];
    
      // Appliquer les buffs selon la bivalence
      if (self.bivalenceMarinEffect) {
        cible.atk += 2 + bonus;
        cible.buffAtkGrum = (cible.buffAtkGrum || 0) + 2 + bonus;
      } else if (self.bivalenceTerrestreEffect) {
        cible.atk += 1 + bonus;
        cible.hp += 1 + bonus;
        cible.buffAtkGrum = (cible.buffAtkGrum || 0) + 1 + bonus;
        cible.buffHpGrum = (cible.buffHpGrum || 0) + 1 + bonus;
      } else {
        cible.atk += 1 + bonus;
        cible.buffAtkGrum = (cible.buffAtkGrum || 0) + 1 + bonus;
      }
    
      cible.grumBuffEffect = true; // Pour tracking ou affichage
    }
    
  },

  {
    id: 36,
    nom: "Brak'Na la Dompteuse d'Écaille",
    lvl: 5,
    hp: 4,
    baseHp: 4,
    atk: 5,
    atkDispo: false,
    img: "img/card36.png",
    imgMinia: "img/cardfight36.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    carteSpe: 58,
    piocherCarteSpe: true,
    bivalence: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) carte.bivalenceSources = [];
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin" && carte.nom === "LE REQUIN") {
          if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Brak'Na")) {
            carte.atk += 2 + bonus;
            carte.buffAtkBivalence += 2 + bonus;
            carte.hp += 2 + bonus;
            carte.buffHpBivalence += 2 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Brak'Na");
          }
          if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Brak'Na")) {
            carte.atk -= 2 + bonus;
            carte.buffAtkBivalence -= 2 + bonus;
            carte.hp -= 2 + bonus;
            carte.buffHpBivalence -= 2 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Brak'Na");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
      });
    },
    bivalenceSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) return;
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
        // Si la source est présente dans les effets appliqués
        if (carte.bivalenceSources.includes("Brak'Na")) {
    
          // Retrait des effets appliqués par cette source
          if (carte.bivalenceMarinEffect && carte.nom === "LE REQUIN") {
            
            carte.atk -= 2 + bonus;
            carte.buffAtkBivalence -= 2 + bonus;
            carte.hp -= 2 + bonus;
            carte.buffHpBivalence -= 2 + bonus;
          }
    
          if (carte.bivalenceTerrestreEffect) {
            carte.hp -= 0;
            carte.buffHpBivalence -= 0;
          }
    
          // Suppression de la source
          carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Brak'Na");
    
          // Si plus aucun buff actif, on désactive le flag global
          if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
            carte.bivalenceEffect = false;
          }
        }
      });
    },
  },
 
  {
    id: 37,
    nom: "Tor'Grag des Profondeurs",
    lvl: 5,
    hp: 4,
    baseHp: 4,
    atk: 6,
    atkDispo: false,
    img: "img/card37.png",
    imgMinia: "img/cardfight37.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    provocation: true,
    provocationUse: false,
    furie: true,
    furieUse: false,
    effetDeMass: (carte, board) => {
      const crocNoir = board.filter(c => c.famille === "Croc-Noir" && c.id !== carte.id);
      if (crocNoir.length > 0) {
        carte.atk += crocNoir.length;
        carte.hp += crocNoir.length; 
      }     
    },
  },
  {
    id: 38,
    nom: "Urgak la Ravageuse",
    lvl: 5,
    hp: 5,
    baseHp: 5,
    atk: 4,
    atkDispo: false,
    img: "img/card38.png",
    imgMinia: "img/cardfight38.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    criDeGuerre: (cartesBoard) => {
      cartesBoard.forEach(carte => {
          carte.atk += 1;
          carte.hp += 1;
      });
    },
    bivalence: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) carte.bivalenceSources = [];
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
          if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Urgak")) {
            carte.atk += 1 + bonus;
            carte.buffAtkBivalence += 1 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Urgak");
          }
          if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Urgak")) {
            carte.atk -= 1 + bonus;
            carte.buffAtkBivalence -= 1 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Urgak");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
          if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Urgak")) {
            carte.hp += 1 + bonus;
            carte.buffHpBivalence += 1 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Urgak");
          }
          if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Urgak")) {
            carte.hp -= 1 + bonus;
            carte.buffHpBivalence -= 1 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Urgak");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
      });
    },
    bivalenceSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) return;
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        // Si la source est présente dans les effets appliqués
        if (carte.bivalenceSources.includes("Urgak")) {
    
          // Retrait des effets appliqués par cette source
          if (carte.bivalenceMarinEffect) {
            
            carte.atk -= 1 + bonus;
            carte.buffAtkBivalence -= 1 + bonus;
          }
    
          if (carte.bivalenceTerrestreEffect) {
            carte.hp -= 1 + bonus;
            carte.buffHpBivalence -= 1 + bonus;
          }
    
          // Suppression de la source
          carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Urgak");
    
          // Si plus aucun buff actif, on désactive le flag global
          if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
            carte.bivalenceEffect = false;
          }
        }
      });
    },
  },
  {
    id: 39,
    nom: "Vrak'Nul le Hurleur des Cimes",
    lvl: 4,
    hp: 4,
    baseHp: 4,
    atk: 5,
    atkDispo: false,
    img: "img/card39.png",
    imgMinia: "img/cardfight39.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    degatsAdj: false,
    furie: true,
    furieUse: false,
    aoe: (cartesBoardAdv) => {
      cartesBoardAdv.forEach(carte => {
        carte.hp -= 1;
        carte.degatsRecus = 1;
        carte.animAoE = true;
      });
    },
  },
  {
    id: 40,
    nom: "Ka'Rasha la Lieuse d'Esprits",
    lvl: 4,
    hp: 6,
    baseHp: 6,
    atk: 3,
    atkDispo: false,
    img: "img/card40.png",
    imgMinia: "img/cardfight40.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
  },
  {
    id: 41,
    nom: "Gor’Tul le Fendeur d’Écailles",
    lvl: 4,
    hp: 5,
    baseHp: 5,
    atk: 4,
    atkDispo: false,
    img: "img/card41.png",
    imgMinia: "img/cardfight41.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    oneTicDebutCombat: (carteCible, carteSource) => {
      if(carteSource.bivalenceMarinEffect){
        carteCible.hp -= 6;
      }else{
        carteCible.hp -= 3;
        carteSource.hp += 2;
      }  
    },
  },
  {
    id: 42,
    nom: "Na'Kra des Cendres Brûlantes",
    lvl: 4,
    hp: 4,
    baseHp: 4,
    atk: 4,
    atkDispo: false,
    img: "img/card42.png",
    imgMinia: "img/cardfight42.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    aoeCible: (cartesBoardAdv) => {
      cartesBoardAdv.forEach(carte => {
        carte.hp -= 2;
        carte.degatsRecus = 2;
        carte.animAoE = true;
      });
    },
    bivalence: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) carte.bivalenceSources = [];
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
          if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Na'Kra")) {
            carte.atk += 2 + bonus;
            carte.buffAtkBivalence += 2 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Na'Kra");
          }
          if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Na'Kra")) {
            carte.atk -= 2 + bonus;
            carte.buffAtkBivalence -= 2 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Na'Kra");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
          if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Na'Kra")) {
            carte.hp += 2 + bonus;
            carte.buffHpBivalence += 2 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Na'Kra");
          }
          if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Na'Kra")) {
            carte.hp -= 2 + bonus;
            carte.buffHpBivalence -= 2 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Na'Kra");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
      });
    },
    bivalenceSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) return;
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        // Si la source est présente dans les effets appliqués
        if (carte.bivalenceSources.includes("Na'Kra")) {
    
          // Retrait des effets appliqués par cette source
          if (carte.bivalenceMarinEffect) {
            
            carte.atk -= 2 + bonus;
            carte.buffAtkBivalence -= 2 + bonus;
          }
    
          if (carte.bivalenceTerrestreEffect) {
            carte.hp -= 2 + bonus;
            carte.buffHpBivalence -= 2 + bonus;
          }
    
          // Suppression de la source
          carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Na'Kra");
    
          // Si plus aucun buff actif, on désactive le flag global
          if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
            carte.bivalenceEffect = false;
          }
        }
      });
    },
  },
  {
    id: 43,
    nom: "Sha'Rok, la pisteuse furtive",
    lvl: 4,
    hp: 5,
    baseHp: 5,
    atk: 3,
    atkDispo: false,
    img: "img/card43.png",
    imgMinia: "img/cardfight43.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    piocherCarteInf: true,
  },
  {
    id: 44,
    nom: "Trok'Ma, l'Écumeur Grinçant",
    lvl: 3,
    hp: 4,
    baseHp: 4,
    atk: 3,
    atkDispo: false,
    img: "img/card44.png",
    imgMinia: "img/cardfight44.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    criDeGuerreUnique: (carte) => {

      carte.atk += 1;
      carte.hp += 1;
      if(carte.bivalenceMarinEffect){
        carte.atk += 1;
      }else{
        carte.hp += 1;
      }

    },
  },
  {
    id: 45,
    nom: "Muk'Zar la Ravineuse",
    lvl: 3,
    hp: 3,
    baseHp: 3,
    atk: 4,
    atkDispo: false,
    img: "img/card45.png",
    imgMinia: "img/cardfight45.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    effetDeMass: (carte, board) => {
      const crocNoir = board.filter(c => c.famille === "Croc-Noir" && c.id !== carte.id && c.sousFamille === "Terrestre");
      if (crocNoir.length > 0) {
        carte.atk += crocNoir.length;
        if(carte.bivalenceTerrestreEffect){
          carte.hp += 2;
        }else{
          carte.atk += 1;
        } 
      }     
    },
  },
  {
    id: 46,
    nom: "Zug'Rok le Dresseur de Crabes",
    lvl: 3,
    hp: 5,
    baseHp: 5,
    atk: 2,
    atkDispo: false,
    img: "img/card46.png",
    imgMinia: "img/cardfight46.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    carteSpe: 59,
    piocherCarteSpe: true,
    bivalence: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) carte.bivalenceSources = [];
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin" && carte.nom === "Craby") {
          if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Zug'Rok")) {
            carte.atk += 1 + bonus;
            carte.buffAtkBivalence += 1 + bonus;
            carte.hp += 2 + bonus;
            carte.buffHpBivalence += 2 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Zug'Rok");
          }
          if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Zug'Rok")) {
            carte.atk -= 1 + bonus;
            carte.buffAtkBivalence -= 1 + bonus;
            carte.hp -= 2 + bonus;
            carte.buffHpBivalence -= 2 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zug'Rok");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
      });
    },
    bivalenceSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) return;
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
        // Si la source est présente dans les effets appliqués
        if (carte.bivalenceSources.includes("Zug'Rok")) {
    
          // Retrait des effets appliqués par cette source
          if (carte.bivalenceMarinEffect && carte.nom === "Craby") {
            
            carte.atk -= 1 + bonus;
            carte.buffAtkBivalence -= 1 + bonus;
            carte.hp -= 2 + bonus;
            carte.buffHpBivalence -= 2 + bonus;
          }
    
          if (carte.bivalenceTerrestreEffect) {
            carte.hp -= 0;
            carte.buffHpBivalence -= 0;
          }
    
          // Suppression de la source
          carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zug'Rok");
    
          // Si plus aucun buff actif, on désactive le flag global
          if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
            carte.bivalenceEffect = false;
          }
        }
      });
    },
  },
  {
    id: 47,
    nom: "Narka Brise-Roches",
    lvl: 3,
    hp: 5,
    baseHp: 5,
    atk: 3,
    atkDispo: false,
    img: "img/card47.png",
    imgMinia: "img/cardfight47.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    aura: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
          carte.atk += 1;
          carte.buffAtk += 1;
          carte.auraEffect = true;
        }
        
      });
    },
    auraSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.auraEffect === true && carte.sousFamille === "Terrestre") {
          carte.atk -= 1;
          carte.buffAtk -= 1;
          if(carte.buffHp === 0 && carte.buffAtk === 0){
            carte.auraEffect = false
          }        
        }
      });
    },
    auraUnique: (carte) => {
      if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
        carte.atk += 1;
        carte.buffAtk += 1;
        carte.auraEffect = true; 
      }     
    },
    bivalence: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        if (!carte.bivalenceSources) carte.bivalenceSources = [];
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
          if(carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Narka")){
            carte.atk += 1 + bonus;
            carte.buffAtkBivalence += 1 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Narka");
          }
          if(!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Narka")){
            carte.atk -= 1 + bonus;
            carte.buffAtkBivalence -= 1 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Narka");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false
            }
          }
        }
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre"){
          if(carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Narka")){
            carte.hp += 1 + bonus;
            carte.buffHpBivalence += 1 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Narka");
          }
          if(!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Narka")){
            carte.hp -= 1 + bonus;
            carte.buffHpBivalence -= 1 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Narka");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false
            }
          }
        }
      })
    },
    bivalenceSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) return;
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
        // Si la source est présente dans les effets appliqués
        if (carte.bivalenceSources.includes("Narka")) {
    
          // Retrait des effets appliqués par cette source
          if (carte.bivalenceMarinEffect) {
            carte.atk -= 1 + bonus;
            carte.buffAtkBivalence -= 1 + bonus;
          }
          if (carte.bivalenceTerrestreEffect) {
            carte.hp -= 1 + bonus;
            carte.buffHpBivalence -= 1 + bonus;
          }
    
          // Suppression de la source
          carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Narka");
    
          // Si plus aucun buff actif, on désactive le flag global
          if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
            carte.bivalenceEffect = false;
          }
        }
      });
    },
  },
  {
    id: 48,
    nom: "Ghar'Zûl l'Éclaireur Grondeur",
    lvl: 3,
    hp: 4,
    baseHp: 4,
    atk: 2,
    atkDispo: false,
    img: "img/card48.png",
    imgMinia: "img/cardfight48.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    oneTicDebutCombat: (carteCible, carteSource) => {
      if(carteSource.bivalenceMarinEffect){
        carteCible.hp -= 2;
        carte.degatsRecus = 1;
      }else{
        carteCible.hp -= 1;
        carteSource.hp += 1;
      }  
    },
  },
  {
    id: 49,
    nom: "Krug le Moussaillon",
    lvl: 2,
    hp: 3,
    baseHp: 3,
    atk: 2,
    atkDispo: false,
    img: "img/card49.png",
    imgMinia: "img/cardfight49.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    criDeGuerreUnique: (carte) => {
      if(carte.sousFamille === "Marin"){
        carte.atk += 1;
        if(carte.bivalenceMarinEffect){
          carte.atk += 1;
        }
      }
    },
  },
  {
    id: 50,
    nom: "Drozha l'essoreuse d'os",
    lvl: 2,
    hp: 2,
    baseHp: 2,
    atk: 3,
    atkDispo: false,
    img: "img/card50.png",
    imgMinia: "img/cardfight50.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if (mortCarte.famille !== "Croc-Noir" || mortCarte.id === self.id) return;
      const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
      const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Croc-Noir" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      );
    
      if (cibles.length === 0) return;
    
      // Choisir une cible aléatoire
      const cible = cibles[Math.floor(Math.random() * cibles.length)];
    
      // Appliquer les buffs selon la bivalence
      if (self.bivalenceMarinEffect) {
        self.atk += 2 + bonus;
        self.buffAtkGrum = (self.buffAtkGrum || 0) + 2 + bonus;
      } else if (self.bivalenceTerrestreEffect) {
        self.atk += 1 + bonus;
        self.hp += 1 + bonus;
        self.buffAtkGrum = (self.buffAtkGrum || 0) + 1 + bonus;
        self.buffHpGrum = (self.buffHpGrum || 0) + 1 + bonus;
      } else {
        self.atk += 1 + bonus;
        self.buffAtkGrum = (self.buffAtkGrum || 0) + 1 + bonus;
      }
    
      self.grumBuffEffect = true; // Pour tracking ou affichage
    }
  },
  {
    id: 51,
    nom: "Zûn'Tul, le Mange-Racines",
    lvl: 2,
    hp: 5,
    baseHp: 5,
    atk: 1,
    atkDispo: false,
    img: "img/card51.png",
    imgMinia: "img/cardfight51.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    provocation: true,
    provocationUse: false,
    furie: true,
    furieUse: false,
    aura: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
          carte.atk += 1;
          carte.buffAtk += 1;
          carte.auraEffect = true;
        }
      });
    },
    auraSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (carte.auraEffect === true) {
          carte.atk -= 1;
          carte.buffAtk -= 1;;
          if(carte.buffHp === 0 && carte.buffHp === 0){
            carte.auraEffect = false
          }        
        }
      });
    },
    auraUnique: (carte) => {
      if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
        carte.atk += 1;
        carte.buffAtk += 1;
        carte.auraEffect = true; 
      }     
    }
  },
  {
    id: 52,
    nom: "Pok'Nar le Poissonneux",
    lvl: 2,
    hp: 3,
    baseHp: 3,
    atk: 1,
    atkDispo: false,
    img: "img/card52.png",
    imgMinia: "img/cardfight52.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    carteSpe: 60,
    piocherCarteSpe: true,
    bivalence: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) carte.bivalenceSources = [];
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
        if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin" && carte.nom === "Le gluant") {
          if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Pok'Nar")) {
            carte.atk += 1 + bonus;
            carte.buffAtkBivalence += 1 + bonus;
            carte.bivalenceEffect = true;
            carte.bivalenceSources.push("Pok'Nar");
          }
          if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Pok'Nar")) {
            carte.atk -= 1 + bonus;
            carte.buffAtkBivalence -= 1 + bonus;
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Pok'Nar");
            if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
              carte.bivalenceEffect = false;
            }
          }
        }
      });
    },
    bivalenceSell: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if (!carte.bivalenceSources) return;
        const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
        const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
        // Si la source est présente dans les effets appliqués
        if (carte.bivalenceSources.includes("Pok'Nar")) {
    
          // Retrait des effets appliqués par cette source
          if (carte.bivalenceMarinEffect && carte.nom === "Le gluant") {
            
            carte.atk -= 1 + bonus;
            carte.buffAtkBivalence -= 1 + bonus;
          }
    
          if (carte.bivalenceTerrestreEffect) {
            carte.hp -= 0;
            carte.buffHpBivalence -= 0;
          }
    
          // Suppression de la source
          carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Pok'Nar");
    
          // Si plus aucun buff actif, on désactive le flag global
          if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
            carte.bivalenceEffect = false;
          }
        }
      });
    },
  },
  {
    id: 53,
    nom: "Khash la Piquante",
    lvl: 2,
    hp: 3,
    baseHp: 3,
    atk: 3,
    atkDispo: false,
    img: "img/card53.png",
    imgMinia: "img/cardfight53.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    oneTicDebutCombat: (carteCible, carteSource) => {
      if(carteSource.bivalenceTerrestreEffect){
        carteCible.hp -= 2;
      }else{
        carteCible.hp -= 1;
      }  
    },
  },
  {
    id: 54,
    nom: "Grik le Fangeux",
    lvl: 1,
    hp: 2,
    baseHp: 2,
    atk: 2,
    atkDispo: false,
    img: "img/card54.png",
    imgMinia: "img/cardfight54.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    effetDeMass: (carte, board) => {
      const crocNoir = board.filter(c => c.famille === "Croc-Noir" && c.id !== carte.id);
      if (crocNoir.length > 0) {
        carte.atk += 1; 
      }     
    },
  },
  {
    id: 55,
    nom: "Krosh l’Écailleuse",
    lvl: 1,
    hp: 3,
    baseHp: 3,
    atk: 1,
    atkDispo: false,
    img: "img/card55.png",
    imgMinia: "img/cardfight55.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    criDeGuerreUnique: (carte) => {
      if(carte.sousFamille === "Marin"){
        carte.hp += 1;
      }
      else{
        carte.atk += 1;
      }  
    },
  },
  {
    id: 56,
    nom: "Ur’Thok le Rampe-Sable",
    lvl: 1,
    hp: 1,
    baseHp: 1,
    atk: 3,
    atkDispo: false,
    img: "img/card56.png",
    imgMinia: "img/cardfight56.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
    oneTicDebutCombat: (carteCible, carteSource) => {
        carteCible.hp -= 1; 
    },
  },
  {
    id: 57,
    nom: "Drush la Poissonneuse",
    lvl: 1,
    hp: 2,
    baseHp: 2,
    atk: 1,
    atkDispo: false,
    img: "img/card57.png",
    imgMinia: "img/cardfight57.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
    carteSpe: 61,
    piocherCarteSpe: true,
  },
  {
    id: 58,
    nom: "Bag'Kûl le Grogneur",
    lvl: 1,
    hp: 3,
    baseHp: 3,
    atk: 1,
    atkDispo: false,
    img: "img/card58.png",
    imgMinia: "img/cardfight58.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "*",
  },
  {
    id: 59,
    nom: "LE REQUIN",
    lvl: 1,
    hp: 2,
    baseHp: 2,
    atk: 2,
    atkDispo: false,
    img: "img/card59.png",
    imgMinia: "img/cardfight59.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
  },
  {
    id: 60,
    nom: "Craby",
    lvl: 1,
    hp: 1,
    baseHp: 1,
    atk: 2,
    atkDispo: false,
    img: "img/card60.png",
    imgMinia: "img/cardfight60.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
  },
  {
    id: 61,
    nom: "Le gluant",
    lvl: 1,
    hp: 2,
    baseHp: 2,
    atk: 1,
    atkDispo: false,
    img: "img/card61.png",
    imgMinia: "img/cardfight61.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
  },
  {
    id: 62,
    nom: "Poisson gris",
    lvl: 1,
    hp: 1,
    baseHp: 1,
    atk: 1,
    atkDispo: false,
    img: "img/card62.png",
    imgMinia: "img/cardfight62.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "*",
  },
  
];

  