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
    console.log(`🔁 Nouveau tour — ${joueurAttaquant ? "Joueur" : "IA"}`);

    let attaquant = joueurAttaquant
      ? getProchaineCarteDispo(cartesJoueur)
      : getProchaineCarteDispo(cartesIA);

    let defenseur = joueurAttaquant
      ? cartesIA[Math.floor(Math.random() * cartesIA.length)]
      : cartesJoueur[Math.floor(Math.random() * cartesJoueur.length)];

    if (!attaquant || !defenseur) break;

    console.log(`${joueurAttaquant ? "Joueur" : "IA"} attaque !`);

    // Déclenche animation d'attaque
    setCarteAttaquantId(attaquant.id);
    setCarteDefenseurId(defenseur.id);
    await sleep(400);

    // Appliquer les dégâts
    attaquant.hp -= defenseur.atk;
    defenseur.hp -= attaquant.atk;
    attaquant.degatsRecus = defenseur.atk;
    defenseur.degatsRecus = attaquant.atk;

    // Met à jour les boards pour afficher les PV et les -X
    setBoardCombat([...cartesJoueur]);
    setBoardCombatIA([...cartesIA]);
    await sleep(400);

    // Nettoie les dégâts affichés
    attaquant.degatsRecus = 0;
    defenseur.degatsRecus = 0;
    setCarteAttaquantId(null);
    setCarteDefenseurId(null);

    // Supprime les cartes mortes
    cartesJoueur = cartesJoueur.filter(c => c.hp > 0);
    cartesIA = cartesIA.filter(c => c.hp > 0);
    setBoardCombat([...cartesJoueur]);
    setBoardCombatIA([...cartesIA]);
    await sleep(400);

    // Rotation des attaques
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
    await sleep(400);
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

  // Restauration des boards de départ
  setBoardPlayer(boardAvantCombat);
  setBoardIA(boardAvantCombatIA);
  await sleep(1000);
  setPhase("shop");
}
