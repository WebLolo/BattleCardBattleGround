export const getCartesPourShop = (niveauTaverne) => {
  return cards.filter((c) => c.lvl <= niveauTaverne);
};