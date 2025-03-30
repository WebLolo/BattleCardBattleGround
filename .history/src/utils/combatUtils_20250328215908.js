export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getProchaineCarteDispo = (board) => {
  let carte = board.find(c => c.atkDispo !== false);
  return carte || board[0]; // fallback
};

export async function deroulerCombatReact({
  boardPlayer,
  setBoardPlayer,
  boardIA,
  setBoardIA,
  lvlTaverne,
  playerPv,
  setplayerPv,
  pvIA,
  setPvIA,
  setMessageCombat,
  setPhase,
}) {
  console.log("⚔️ Combat lancé !");

  const boardAvantCombat = boardPlayer.map(c => ({ ...c }));
  const boardAvantCombatIA = boardIA.map(c => ({ ...c }));

  let cartesJoueur = [...boardPlayer];
  let cartesIA = [...boardIA];

  if (cartesJoueur.length === 0 || cartesIA.length === 0) {
    setMessageCombat("❌ Combat impossible : un des deux boards est vide !");
    return;
  }

  let joueurAttaquant = Math.random() < 0.5;
  cartesJoueur[0].atkDispo = true;
  cartesIA[0].atkDispo = true;

  while (cartesJoueur.length > 0 && cartesIA.length > 0) {
    let attaquant = joueurAttaquant
      ? getProchaineCarteDispo(cartesJoueur)
      : getProchaineCarteDispo(cartesIA);

    let defenseur = joueurAttaquant
      ? cartesIA[Math.floor(Math.random() * cartesIA.length)]
      : cartesJoueur[Math.floor(Math.random() * cartesJoueur.length)];

    console.log(`${joueurAttaquant ? "Joueur" : "IA"} attaque !`);

    await sleep(300);

    attaquant.hp -= defenseur.atk;
    defenseur.hp -= attaquant.atk;

    cartesJoueur = cartesJoueur.filter(c => c.hp > 0);
    cartesIA = cartesIA.filter(c => c.hp > 0);

    joueurAttaquant = !joueurAttaquant;
    await sleep(300);
  }

  // Fin du combat
  const survivantsJoueur = cartesJoueur.filter(c => c.hp > 0);
  const survivantsIA = cartesIA.filter(c => c.hp > 0);

  if (survivantsJoueur.length === 0 && survivantsIA.length === 0) {
    setMessageCombat("⚖️ Match nul !");
  } else {
    const degats = lvlTaverne + (survivantsJoueur.length || survivantsIA.length);
    if (survivantsJoueur.length > 0) {
      setPvIA(prev => prev - degats);
      setMessageCombat(`🏆 Victoire ! L'IA perd ${degats} PV`);
    } else {
      setplayerPv(prev => prev - degats);
      setMessageCombat(`❌ Défaite ! Le joueur perd ${degats} PV`);
    }
  }

// Restauration des PV d'origine (comme dans ton ancien code)
const boardRestoredPlayer = boardAvantCombat.map(c => {
    const vivant = cartesJoueur.find(cc => cc.id === c.id);
    return vivant ? { ...c } : null;
  }).filter(Boolean);
  
  const boardRestoredIA = boardAvantCombatIA.map(c => {
    const vivant = cartesIA.find(cc => cc.id === c.id);
    return vivant ? { ...c } : null;
  }).filter(Boolean);
  
  setBoardPlayer(boardRestoredPlayer);
  setBoardIA(boardRestoredIA);

  // Retour au shop après petit délai
  await sleep(1000);
  setPhase("shop");
}
