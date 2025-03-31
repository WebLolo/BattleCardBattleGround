export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getProchaineCarteDispo = (board) => {
  const carte = board.find(c => c.atkDispo === true);
  if (!carte) {
    console.warn("⚠️ Aucune carte dispo pour attaquer !");
    return board[0] || null;
  }
  return carte;
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
  setBoardCombat,
  setBoardCombatIA,
  setCarteAttaquantId,
  setCarteDefenseurId,
}) {
  console.log("\u2694\ufe0f Combat lanc\u00e9 !");

  const boardAvantCombat = boardPlayer.map(c => ({ ...c }));
  const boardAvantCombatIA = boardIA.map(c => ({ ...c }));

  let cartesJoueur = [...boardPlayer];
  let cartesIA = [...boardIA];

  if (cartesJoueur.length === 0 || cartesIA.length === 0) {
    setMessageCombat("\u274c Combat impossible : un des deux boards est vide !");
    return;
  }

  let joueurAttaquant = Math.random() < 0.5;
  cartesJoueur[0].atkDispo = true;
  cartesIA[0].atkDispo = true;

  while (cartesJoueur.length > 0 && cartesIA.length > 0) {
    console.log(`\ud83d\udd01 Nouveau tour — ${joueurAttaquant ? "Joueur" : "IA"}`);

    let attaquant = joueurAttaquant
      ? getProchaineCarteDispo(cartesJoueur)
      : getProchaineCarteDispo(cartesIA);

    let defenseur = joueurAttaquant
      ? cartesIA[Math.floor(Math.random() * cartesIA.length)]
      : cartesJoueur[Math.floor(Math.random() * cartesJoueur.length)];

    if (!attaquant || !defenseur) break;

    console.log(`${joueurAttaquant ? "Joueur" : "IA"} attaque !`);

    setCarteAttaquantId(attaquant.id);
    setCarteDefenseurId(defenseur.id);
    await sleep(400);

    // Appliquer les d\u00e9g\u00e2ts
    attaquant.hp -= defenseur.atk;
    defenseur.hp -= attaquant.atk;
    attaquant.degatsRecus = defenseur.atk;
    defenseur.degatsRecus = attaquant.atk;

    setBoardCombat([...cartesJoueur]);
    setBoardCombatIA([...cartesIA]);
    await sleep(500);

    attaquant.degatsRecus = 0;
    defenseur.degatsRecus = 0;

    // Supprimer les morts
    cartesJoueur = cartesJoueur.filter(c => c.hp > 0);
    cartesIA = cartesIA.filter(c => c.hp > 0);
    setBoardCombat([...cartesJoueur]);
    setBoardCombatIA([...cartesIA]);
    await sleep(300);

    // Rotation
    if (joueurAttaquant && cartesJoueur.length > 1) {
      const index = cartesJoueur.indexOf(attaquant);
      if (index !== -1) cartesJoueur[index].atkDispo = false;
      const prochain = (index + 1) % cartesJoueur.length;
      cartesJoueur[prochain].atkDispo = true;
    }

    if (!joueurAttaquant && cartesIA.length > 1) {
      const index = cartesIA.indexOf(attaquant);
      if (index !== -1) cartesIA[index].atkDispo = false;
      const prochain = (index + 1) % cartesIA.length;
      cartesIA[prochain].atkDispo = true;
    }

    joueurAttaquant = !joueurAttaquant;
    setCarteAttaquantId(null);
    setCarteDefenseurId(null);
    await sleep(400);
  }

  // Fin de combat
  const survivantsJoueur = cartesJoueur.filter(c => c.hp > 0);
  const survivantsIA = cartesIA.filter(c => c.hp > 0);

  if (survivantsJoueur.length === 0 && survivantsIA.length === 0) {
    setMessageCombat("\u2696\ufe0f Match nul !");
  } else {
    const degats = lvlTaverne + (survivantsJoueur.length || survivantsIA.length);
    if (survivantsJoueur.length > 0) {
      setPvIA(prev => prev - degats);
      setMessageCombat(`\ud83c\udfc6 Victoire ! L'IA perd ${degats} PV`);
    } else {
      setplayerPv(prev => prev - degats);
      setMessageCombat(`\u274c D\u00e9faite ! Le joueur perd ${degats} PV`);
    }
  }

  setBoardPlayer(boardAvantCombat);
  setBoardIA(boardAvantCombatIA);
  await sleep(1000);
  setPhase("shop");
}
