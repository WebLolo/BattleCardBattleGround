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
      img: carte.img,
      imgMinia: carte.imgMinia,
      texte: carte.texte,
      baseHp: carte.baseHp !== undefined ? carte.baseHp : carte.hp,
      baseAtk: carte.baseAtk !== undefined ? carte.baseAtk : carte.atk,
      buffHp: carte.buffHp !== undefined ? carte.buffHp : 0,
      buffAtk: carte.buffAtk !== undefined ? carte.buffAtk : 0,
      atkDispo: false,
      auraEffect: carte.auraEffect !== undefined ? carte.auraEffect : false,
      criDeGuerre: carte.criDeGuerre ? (cartesBoard) => carte.criDeGuerre(cartesBoard) : null,
      criDeGuerreUnique: carte.criDeGuerreUnique ? (carteAleatoire) => carte.criDeGuerreUnique(carteAleatoire) : null,
      poteLa: carte.poteLa ? (cartesBoard) => carte.poteLa(cartesBoard) : null,
      sangNoble: carte.sangNoble ? (cartesBoard) => carte.sangNoble(cartesBoard) : null,
      aura: carte.aura ? (cartesBoard) => carte.aura(cartesBoard) : null,
      auraSell: carte.auraSell ? (cartesBoard) => carte.auraSell(cartesBoard) : null,
      auraUnique: carte.auraUnique ? (cartesBoard) => carte.auraUnique(cartesBoard) : null,
      effetDeCouple: carte.effetDeCouple ? { ...carte.effetDeCouple } : null,
      effetApplique: carte.effetApplique || false, // ✅ Conserve l'état de l'effet
      camp: camp, // ✅ Ajout du camp
      famille: carte.famille
  };
}

export const coutLvlTaverne = {
  1: 5,
  2: 7,
  3: 8,
  4: 10,
  5: 10,
};