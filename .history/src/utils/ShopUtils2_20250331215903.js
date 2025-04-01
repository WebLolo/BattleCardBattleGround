export const getCartesPourShop = (niveauTaverne) => {
  return cards.filter((c) => c.lvl <= niveauTaverne);
};

export const getNombreCartesShop = (lvl) => {
  if (lvl === 1) return 3;
  if (lvl === 2 || lvl === 3) return 4;
  if (lvl === 4 || lvl === 5) return 5;
  return 6;
};