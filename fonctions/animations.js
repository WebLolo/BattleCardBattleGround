function animerAttaque(carteAttaquante, carteCible, callback) {
    let attaquantElement = document.querySelector(`.playerBoard [data-id="${carteAttaquante.id}"]`) ||
                           document.querySelector(`.iaBoard [data-id="${carteAttaquante.id}"]`);
    let cibleElement = document.querySelector(`.playerBoard [data-id="${carteCible.id}"]`) ||
                       document.querySelector(`.iaBoard [data-id="${carteCible.id}"]`);

    if (!attaquantElement || !cibleElement) {
        console.error("❌ Impossible de trouver les cartes pour l'animation !");
        callback();
        return;
    }

    // Vérifier que la carte attaquante et la cible sont bien dans des camps opposés
    let attaquantDansJoueur = attaquantElement.closest(".playerBoard") !== null;
    let cibleDansJoueur = cibleElement.closest(".playerBoard") !== null;

    if (attaquantDansJoueur === cibleDansJoueur || carteAttaquante === carteCible) {
        console.error(`🚨 ERREUR CRITIQUE : ${carteAttaquante.nom} tente d'attaquer une alliée (${carteCible.nom}) !`);
        callback();
        return;
    }
    
    

    // Calculer la distance entre les deux cartes
    let rectAttaquant = attaquantElement.getBoundingClientRect();
    let rectCible = cibleElement.getBoundingClientRect();
    let distanceX = rectCible.left - rectAttaquant.left;
    let distanceY = rectCible.top - rectAttaquant.top;

    console.log(`🚀 Animation : ${carteAttaquante.nom} fonce sur ${carteCible.nom}`);

    

    // Appliquer la transformation pour l'attaque
    attaquantElement.style.transition = "transform 0.3s ease-in-out";
    attaquantElement.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
    shake(carteCible)
    


    setTimeout(() => {
        // Revenir à la position initiale après un petit délai
        attaquantElement.style.transform = "translate(0, 0)";

        setTimeout(() => {
            callback();
        }, 300);
    }, 300);
    
}

function supprimerCarteVisuellement(carte, camp) {
    if (!carte) return; // Si la carte est undefined, on ne fait rien

    let boardElement = camp === "joueur" ? document.querySelector(".playerBoard") : document.querySelector(".iaBoard");
    let carteElement = document.querySelector(`[data-id="${carte.id}"]`);

    if (carteElement) {
        
        carteElement.remove();
    } else {
        console.warn(`⚠️ La carte ${carte?.nom} n'existe pas visuellement et ne peut pas être supprimée.`);
    }
}


async function shake(carte){
    let shakeElement = document.querySelector(`.playerBoard [data-id="${carte.id}"]`) ||
                        document.querySelector(`.iaBoard [data-id="${carte.id}"]`);
    await sleep(350);
    if(shakeElement.classList === "animate__animated"){
        shakeElement.classList.remove("animate__animated", "animate__headShake")
        shakeElement.classList.add("animate__animated", "animate__headShake")
    }else
    shakeElement.classList.add("animate__animated", "animate__headShake")
}
