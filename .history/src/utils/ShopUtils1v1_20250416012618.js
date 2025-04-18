import { cards, getUniqueId, getBoardPosition } from "@/data/cardsData";
import { degatsAdj, oneTicDebutCombat } from "./mecaUtils";

export const getCartesPourShop = (niveauTaverne) => {
  return cards.filter((c) => c.lvl <= niveauTaverne);
};

export const getNombreCartesShop = (lvl) => {
  if (lvl === 1) return 3;
  if (lvl === 2 || lvl === 3) return 4;
  if (lvl === 4 || lvl === 5) return 5;
  return 6;
};

export const getCartesAleatoires = (liste, nombre) => {
  return [...liste].sort(() => 0.5 - Math.random()).slice(0, nombre);
};

export const clonerCarte = ({ carte, camp }) => {
  return {
      id: getUniqueId(), // Génère un ID unique
      nom: carte.nom,
      hp: carte.hp, // PV actuels
      atk: carte.atk, // ATK actuelle
      lvl: carte.lvl,
      img: carte.img,
      imgMinia: carte.imgMinia,
      imgMiniaProvoc: carte.imgMiniaProvoc,
      baseHp: carte.baseHp !== undefined ? carte.baseHp : carte.hp,
      baseAtk: carte.baseAtk !== undefined ? carte.baseAtk : carte.atk,
      buffHp: carte.buffHp !== undefined ? carte.buffHp : 0,
      buffAtk: carte.buffAtk !== undefined ? carte.buffAtk : 0,
      buffHpBivalence: carte.buffHpBivalence !== undefined ? carte.buffHpBivalence : 0,
      buffAtkBivalence: carte.buffAtkBivalence !== undefined ? carte.buffAtkBivalence : 0,
      bivalenceEffect: carte.bivalenceEffect !== undefined ? carte.bivalenceEffect : false,
      atkDispo: false,
      auraEffect: carte.auraEffect !== undefined ? carte.auraEffect : false,
      criDeGuerre: carte.criDeGuerre ? (cartesBoard) => carte.criDeGuerre(cartesBoard) : null,
      criDeGuerreUnique: carte.criDeGuerreUnique ? (carteAleatoire) => carte.criDeGuerreUnique(carteAleatoire) : null,
      poteLa: carte.poteLa ? (cartesBoard) => carte.poteLa(cartesBoard) : null,
      sangNoble: carte.sangNoble ? (cartesBoard) => carte.sangNoble(cartesBoard) : null,
      aura: carte.aura ? (cartesBoard) => carte.aura(cartesBoard) : null,
      auraSell: carte.auraSell ? (cartesBoard) => carte.auraSell(cartesBoard) : null,
      auraUnique: carte.auraUnique ? (cartesBoard) => carte.auraUnique(cartesBoard) : null,
      effetDeMass: carte.effetDeMass || null,
      aoe: carte.aoe ? (cartesBoard) => carte.aoe(cartesBoard) : null,
      aoeCible: carte.aoeCible ? (cartesBoard) => carte.aoeCible(cartesBoard) : null,
      oneTicDebutCombat: carte.oneTicDebutCombat ? (carteCible, carteSource) => carte.oneTicDebutCombat(carteCible, carteSource) : null,
      bivalence: carte.bivalence ? (cartesBoard) => carte.bivalence(cartesBoard) : null,
      bivalenceSell: carte.bivalenceSell ? (cartesBoard) => carte.bivalenceSell(cartesBoard) : null,
      deathTrigger: carte.deathTrigger ? (mortCarte, cartesBoard, self) => carte.deathTrigger(mortCarte, cartesBoard, self) : null,
      effetDeCouple: carte.effetDeCouple ? { ...carte.effetDeCouple } : null,
      effetApplique: carte.effetApplique || false, // ✅ Conserve l'état de l'effet
      camp: camp, // ✅ Ajout du camp
      famille: carte.famille,
      sousFamille: carte.sousFamille !== undefined ? carte.sousFamille : null,
      bivalenceMarinEffect: carte.bivalenceMarinEffect !== undefined ? carte.bivalenceMarinEffect : false,
      bivalenceTerrestreEffect: carte.bivalenceTerrestreEffect !== undefined ? carte.bivalenceTerrestreEffect : false,
      piocherCarte: carte.piocherCarte !== undefined ? carte.piocherCarte : false,
      piocherCarteInf: carte.piocherCarteInf !== undefined ? carte.piocherCarteInf : false,
      piocherCarteSpe: carte.piocherCarteSpe !== undefined ? carte.piocherCarteSpe : false,
      boardPosition: carte.boardPosition !== undefined ? carte.boardPosition : carte.boardPosition,
      carteSpe: carte.carteSpe !== undefined ? carte.carteSpe : null,
      bivalenceSources : carte.bivalenceSources !== undefined ? carte.bivalenceSources : [] ,
      provocation: carte.provocation !== undefined ? carte.provocation : false,
      furie: carte.furie !== undefined ? carte.furie : false,
      provocationUse: carte.provocationUse !== undefined ? carte.provocationUse : false,
      furieUse: carte.furieUse !== undefined ? carte.furieUse : false,
      degatsAdj: carte.degatsAdj !== undefined ? carte.degatsAdj : false,
      reincarnation: carte.reincarnation !== undefined ? carte.reincarnation : false,
      
  };
}

export function fusionnerCartesIdentiques({ carteBase, deck, board, setDeck, setBoard, clone, setFusionAnim, setFusionAnimation }) {
        
        // 1. Regrouper toutes les cartes du joueur
        const toutesCartes = [...deck, ...board];
        
        // 2. Trouver les copies par nom
        const copies = toutesCartes.filter(c => c.nom === carteBase.nom);
        
        
        if(clone){
            // 3. Si 3 copies ou plus => fusion
            const toutesCartesAvecClone = [...toutesCartes, clone];
            const copiesclone = toutesCartesAvecClone.filter(c => c.nom === clone.nom);         
        if (copiesclone.length >= 3) {    
          console.log(`✨ Fusion de 3 cartes ${clone.nom} en carte dorée !`);
          // 4. Créer la carte dorée
          const carteDoree = {
            ...copiesclone[0],
            id: Date.now(), // ID unique
            hp: copiesclone[0].hp * 2,
            atk: copiesclone[0].atk * 2,
            estDoree: true,
            nom: `${copiesclone[0].nom} ⭐`, // Optionnel : nom + icône
            img: copiesclone[0].img, // À adapter à ton système d'image
            imgMinia: copiesclone[0].imgMinia
          };
      
          // 5. Supprimer les 3 premières copies (peu importe où elles sont)
          let àRetirer = 3;
          const nouveauDeck = [];
          const nouveauBoard = [];
      
          for (const carte of deck) {
            if (carte.nom === clone.nom && àRetirer > 0) {
              àRetirer--;
            } else {
              nouveauDeck.push(carte);
            }
          }
      
          for (const carte of board) {
            if (carte.nom === clone.nom && àRetirer > 0) {
              àRetirer--;
            } else {
              nouveauBoard.push(carte);
            }
          }
          nouveauBoard.push(carteBase)
          // 6. Ajouter la carte dorée au deck
          setFusionAnim({
            cartes: copiesclone,
            carteResultat: carteDoree
          });
          // setFusionAnimation({
          //   cartes: copiesclone,
          //   carteResultat: carteDoree
          // });
          setDeck([...nouveauDeck, carteDoree]);
          setBoard(nouveauBoard);
          
          // 7. (optionnel) Lancer animation ici si tu veux
          // ex: setFusionAnim({ from: copies, to: carteDoree });
      
        }        
        }else{
          // 3. Si 3 copies ou plus => fusion
        if (copies.length >= 3) {
          console.log(`✨ Fusion de 3 cartes ${carteBase.nom} en carte dorée !`);
      
          // 4. Créer la carte dorée
          const carteDoree = {
            ...copies[0],
            id: Date.now(), // ID unique
            hp: copies[0].hp * 2,
            atk: copies[0].atk * 2,
            estDoree: true,
            nom: `${copies[0].nom} ⭐`, // Optionnel : nom + icône
            img: copies[0].img, // À adapter à ton système d'image
            imgMinia: copies[0].imgMinia
          };
      
          // 5. Supprimer les 3 premières copies (peu importe où elles sont)
          let àRetirer = 3;
          const nouveauDeck = [];
          const nouveauBoard = [];
      
          for (const carte of deck) {
            if (carte.nom === carteBase.nom && àRetirer > 0) {
              àRetirer--;
            } else {
              nouveauDeck.push(carte);
            }
          }
      
          for (const carte of board) {
            if (carte.nom === carteBase.nom && àRetirer > 0) {
              àRetirer--;
            } else {
              nouveauBoard.push(carte);
            }
          }
          setFusionAnim({
            cartes: copies,
            carteResultat: carteDoree
          });
         
          // setFusionAnimation({
          //   cartes: copies,
          //   carteResultat: carteDoree
          // });
          // 6. Ajouter la carte dorée au deck
          setDeck([...nouveauDeck, carteDoree]);
          setBoard(nouveauBoard);
          
          // 7. (optionnel) Lancer animation ici si tu veux
          // ex: setFusionAnim({ from: copies, to: carteDoree });
      
        }
        }
      
        
       
    }

export const coutLvlTaverne = {
  1: 5,
  2: 7,
  3: 8,
  4: 10,
  5: 10,
};
export const coutLvlTavernePlayer2 = {
  1: 5,
  2: 7,
  3: 8,
  4: 10,
  5: 10,
};

export const actualiserBoutique = ({ lvlTaverne, setShopCards, gold, setGold, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2, shopCards }) => {
  if(actualPlayer === 1){
    if (gold < 1) {
      alert("💰 Pas assez d'or !");
      return;
    }
    const tirage = getCartesPourShop(lvlTaverne);
    const cartes = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne)).map(carte => clonerCarte({ carte, camp: "shop" }));;
    setShopCards(cartes);
    setGold(gold - 1)
    
  }
  if(actualPlayer === 2){
    if (goldPlayer2 < 1) {
      alert("💰 Pas assez d'or !");
      return;
    }
    const tirage = getCartesPourShop(lvlTavernePlayer2);
    const cartes = getCartesAleatoires(tirage, getNombreCartesShop(lvlTavernePlayer2)).map(carte => clonerCarte({ carte, camp: "shop" }));;
    setShopCards(cartes);
    setGoldPlayer2(goldPlayer2 - 1)
    
  }

};
export const actualiserBoutiqueIA = ({ lvlTaverne, setShopCards, gold, setGold, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2 }) => {
  if(actualPlayer === 1){
    if (gold < 1) {
      alert("💰 Pas assez d'or !");
      return;
    }
    const tirage = getCartesPourShop(lvlTaverne);
    const cartes = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne)).map(carte => clonerCarte({ carte, camp: "shop" }));;
    setShopCards(cartes);
    setGold(gold - 1)
    
  }
  if(actualPlayer === 2){
    if (goldPlayer2 < 1) {
      alert("💰 Pas assez d'or !");
      return;
    }
    const tirage = getCartesPourShop(lvlTavernePlayer2);
    const cartes = getCartesAleatoires(tirage, getNombreCartesShop(lvlTavernePlayer2)).map(carte => clonerCarte({ carte, camp: "shop" }));;
    setShopCards(cartes);
    setGoldPlayer2(goldPlayer2 - 1)
    return {cartes}
  }

};

export const lvlUpTaverne = ({ gold, lvlTaverne, setGold, setLvlTaverne, setShopCards, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2,setLvlTavernePlayer2 }) => {
  
  if(actualPlayer === 1){
    const cout = coutLvlTaverne[lvlTaverne];
    if (gold < cout) {
      alert("💰 Pas assez d'or pour monter de niveau !");
      return;
    }
  
    if (lvlTaverne >= 6) {
      alert("🔒 Niveau max atteint !");
      return;
    }
  
    const nouveauLvl = lvlTaverne + 1;
    setGold(gold - cout);
    setLvlTaverne(nouveauLvl);
  
    const tirage = getCartesPourShop(nouveauLvl);
    const cartes = getCartesAleatoires(tirage, getNombreCartesShop(nouveauLvl))
      .map(carte => clonerCarte({ carte, camp: "shop" }));
  
    setShopCards(cartes);
  }
  if(actualPlayer === 2){
    const cout = coutLvlTavernePlayer2[lvlTavernePlayer2];
    if (goldPlayer2 < cout) {
      alert("💰 Pas assez d'or pour monter de niveau !");
      return;
    }
  
    if (lvlTavernePlayer2 >= 6) {
      alert("🔒 Niveau max atteint !");
      return;
    }
  
    const nouveauLvl = lvlTavernePlayer2 + 1;
    setGoldPlayer2(goldPlayer2 - cout);
    setLvlTavernePlayer2(nouveauLvl);
  
    const tirage = getCartesPourShop(nouveauLvl);
    const cartes = getCartesAleatoires(tirage, getNombreCartesShop(nouveauLvl))
      .map(carte => clonerCarte({ carte, camp: "shop" }));
  
    setShopCards(cartes);
  }

};

export const acheterCarte = ({ card, gold, setGold, deck, setDeck, shopCards, setShopCards, lvlTaverne, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2 }) => {
  if(actualPlayer === 1){
    if (gold < 3) {
      alert("💰 Pas assez d'or !");
      return;
    }
    if (deck.length >= 7) {
      alert("🛑 Board plein !");
      return;
    }
  
    setGold(gold - 3);
    setDeck([...deck, card]);
    setShopCards(shopCards.filter((c) => c.id !== card.id));
  }
  if(actualPlayer === 2){
    if (goldPlayer2 < 3) {
      alert("💰 Pas assez d'or !");
      return;
    }
    if (deckPlayer2.length >= 7) {
      alert("🛑 Board plein !");
      return;
    }
  
    setGoldPlayer2(goldPlayer2 - 3);
    setDeckPlayer2([...deckPlayer2, card]);
    setShopCards(shopCards.filter((c) => c.id !== card.id));
  }

};

