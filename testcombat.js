async function cul1() {
    let boardJoueurTest = []
let boardIaTest = []
boardJoueurTest.push(clonerCarte(cartes[8], "joueur"));
boardJoueurTest.push(clonerCarte(cartes[1], "joueur"));
boardJoueurTest.push(clonerCarte(cartes[2], "joueur"));
boardJoueurTest.push(clonerCarte(cartes[8], "joueur"));
boardJoueurTest.push(clonerCarte(cartes[9], "joueur"));
boardJoueurTest.push(clonerCarte(cartes[11], "joueur"));

boardIaTest.push(clonerCarte(cartes[3], "ia"));
boardIaTest.push(clonerCarte(cartes[4], "ia"));
boardIaTest.push(clonerCarte(cartes[5], "ia"));
boardIaTest.push(clonerCarte(cartes[0], "ia"));
boardIaTest.push(clonerCarte(cartes[7], "ia"));
boardIaTest.push(clonerCarte(cartes[8], "ia"));
majAffichageBoardPendantCombat(boardJoueurTest, boardIaTest);
console.log("simulation de combat !")
console.log("le combat commence")
console.log("d'un coté le joueur 1",boardJoueurTest, "et de l'autre l'ia", boardIaTest)
console.log("tirage au sort pour savoir qui commence")
let tirageAuSort = entierAleatoire(0,1)
let joueurAttaquant = null
if (tirageAuSort === 0){
    joueurAttaquant = true
}else{
    joueurAttaquant = false
}
let attaquant = null
let defenseur = null
let nomAttaquant = ""
let nomDefenseur = ""
let tourCombat = 1
let tourCarte = 0
boardJoueurTest[0].atkDispo = true
boardIaTest[0].atkDispo = true

    console.log("TOUR", tourCombat)
    if (joueurAttaquant === true){
        nomAttaquant = "joueur"
        nomDefenseur = "ia"
        attaquant = boardJoueurTest[0]
        if (attaquant.atkDispo === false){
            if(attaquant === boardJoueurTest[boardJoueurTest.length -1]){
                attaquant = boardJoueurTest[0]
            }else{
                attaquant = boardJoueurTest[boardJoueurTest.indexOf(attaquant) + 1]
            }
            
        }
        defenseur = boardIaTest[entierAleatoire(0, boardIaTest.length -1)]  
         
    }
    if (joueurAttaquant === false){
        nomAttaquant = "ia"
        nomDefenseur = "joueur"
        attaquant = boardIaTest[0]
        if (attaquant.atkDispo === false){
            if(attaquant === boardIaTest[boardIaTest.length -1]){
                attaquant = boardIaTest[0]
            }else{
                attaquant = boardIaTest[boardIaTest.indexOf(attaquant) + 1]
            }
            
        }
        defenseur = boardJoueurTest[entierAleatoire(0, boardJoueurTest.length -1)]

    
    }
    console.log("TESTTTTTTTTTTTTTTTTTTT",attaquant) 
    console.log("TESTTTTTTTTTTTTTTTTTTT",defenseur)
    
    
    console.log(nomAttaquant, "commence")
    console.log("la première carte de",nomAttaquant,attaquant.nom, "attaque la carte de",nomDefenseur, defenseur.nom )
    await new Promise(resolve => animerAttaque(attaquant, defenseur, resolve));
    console.log(attaquant.nom,"à",attaquant.hp, "pv. Il perd", defenseur.atk, "hp" )
    console.log(defenseur.nom,"à",defenseur.hp, "pv. Il perd", attaquant.atk, "hp" )
    attaquant.hp -= defenseur.atk
    defenseur.hp -= attaquant.atk
    
    console.log("pv restant de", attaquant.nom, ":", attaquant.hp, "pv" )
    console.log("pv restant de", defenseur.nom, ":", defenseur.hp, "pv" )
    
    if(attaquant.hp > 0 && nomAttaquant === "joueur"){
        attaquant.atkDispo = false
        if(boardJoueurTest.length > 1){
            if(attaquant === boardJoueurTest[boardJoueurTest.length - 1]){
                boardJoueurTest[0].atkDispo = true
            }else{
                boardJoueurTest[boardJoueurTest.indexOf(attaquant) + 1 ].atkDispo = true
            }
            
        }
        
    }
    if(defenseur.hp < 0 && nomAttaquant === "joueur"){
        defenseur.atkDispo = false
        if(boardJoueurTest.length > 1){
            if(defenseur === boardJoueurTest[boardJoueurTest.length - 1]){
                boardJoueurTest[0].atkDispo = true
            }else{
                boardJoueurTest[boardJoueurTest.indexOf(defenseur) + 1 ].atkDispo = true
            }
        }
        
    }
    if(attaquant.hp > 0 && nomAttaquant === "ia"){
        attaquant.atkDispo = false
        if(boardIaTest.length > 1){
            if(attaquant === boardIaTest[boardIaTest.length - 1]){
                boardIaTest[0].atkDispo = true
            }else{
                boardIaTest[boardIaTest.indexOf(attaquant) + 1 ].atkDispo = true
            }
        }
        

    }
    if(defenseur.hp < 0 && nomAttaquant === "ia"){
        defenseur.atkDispo = false
        if(boardIaTest.length > 1){
            if(defenseur === boardIaTest[boardIaTest.length - 1]){
                boardIaTest[0].atkDispo = true
            }else{
                boardIaTest[boardIaTest.indexOf(defenseur) + 1 ].atkDispo = true
            }
        }
        
    }
    
    
    console.log("TESTTTTTTTTTTTTTTTTTTT",attaquant) 
    console.log("TESTTTTTTTTTTTTTTTTTTT",defenseur) 


    
    
    majAffichageBoardPendantCombat(boardJoueurTest, boardIaTest);
    await sleep(200);
    // Puis, à la fin du combat, on vérifie pour attaquant et défenseur :
    checkForDeathAndRemove(attaquant, nomAttaquant, boardJoueurTest, boardIaTest);
    checkForDeathAndRemove(defenseur, nomDefenseur, boardJoueurTest, boardIaTest);
    await sleep(200);
    majAffichageBoardPendantCombat(boardJoueurTest, boardIaTest);
    console.log("boardIaTest après suppression:", boardIaTest);
    console.log("boardJoueurTest après suppression:", boardJoueurTest);
    console.log("il reste ", boardJoueurTest.length, "cartes sur le board joueur", )
    console.log("il reste ", boardIaTest.length, "cartes sur le board ia", )

    joueurAttaquant = !joueurAttaquant

    console.log("TOUR", tourCombat)
    if (joueurAttaquant === true){
        nomAttaquant = "joueur"
        nomDefenseur = "ia"
        attaquant = boardJoueurTest[0]
        if (attaquant.atkDispo === false){
            if(attaquant === boardJoueurTest[boardJoueurTest.length -1]){
                attaquant = boardJoueurTest[0]
            }else{
                attaquant = boardJoueurTest[boardJoueurTest.indexOf(attaquant) + 1]
            }
            
        }
        defenseur = boardIaTest[entierAleatoire(0, boardIaTest.length -1)]  
         
    }
    if (joueurAttaquant === false){
        nomAttaquant = "ia"
        nomDefenseur = "joueur"
        attaquant = boardIaTest[0]
        if (attaquant.atkDispo === false){
            if(attaquant === boardIaTest[boardIaTest.length -1]){
                attaquant = boardIaTest[0]
            }else{
                attaquant = boardIaTest[boardIaTest.indexOf(attaquant) + 1]
            }
            
        }
        defenseur = boardJoueurTest[entierAleatoire(0, boardJoueurTest.length -1)]

    
    }
    console.log("TESTTTTTTTTTTTTTTTTTTT",attaquant) 
    console.log("TESTTTTTTTTTTTTTTTTTTT",defenseur)
    
    
    console.log(nomAttaquant, "commence")
    console.log("la première carte de",nomAttaquant,attaquant.nom, "attaque la carte de",nomDefenseur, defenseur.nom )
    await new Promise(resolve => animerAttaque(attaquant, defenseur, resolve));
    console.log(attaquant.nom,"à",attaquant.hp, "pv. Il perd", defenseur.atk, "hp" )
    console.log(defenseur.nom,"à",defenseur.hp, "pv. Il perd", attaquant.atk, "hp" )
    attaquant.hp -= defenseur.atk
    defenseur.hp -= attaquant.atk
    
    console.log("pv restant de", attaquant.nom, ":", attaquant.hp, "pv" )
    console.log("pv restant de", defenseur.nom, ":", defenseur.hp, "pv" )
    
    if(attaquant.hp > 0 && nomAttaquant === "joueur"){
        attaquant.atkDispo = false
        if(boardJoueurTest.length > 1){
            if(attaquant === boardJoueurTest[boardJoueurTest.length - 1]){
                boardJoueurTest[0].atkDispo = true
            }else{
                boardJoueurTest[boardJoueurTest.indexOf(attaquant) + 1 ].atkDispo = true
            }
            
        }
        
    }
    if(defenseur.hp < 0 && nomAttaquant === "joueur"){
        defenseur.atkDispo = false
        if(boardJoueurTest.length > 1){
            if(defenseur === boardJoueurTest[boardJoueurTest.length - 1]){
                boardJoueurTest[0].atkDispo = true
            }else{
                boardJoueurTest[boardJoueurTest.indexOf(defenseur) + 1 ].atkDispo = true
            }
        }
        
    }
    if(attaquant.hp > 0 && nomAttaquant === "ia"){
        attaquant.atkDispo = false
        if(boardIaTest.length > 1){
            if(attaquant === boardIaTest[boardIaTest.length - 1]){
                boardIaTest[0].atkDispo = true
            }else{
                boardIaTest[boardIaTest.indexOf(attaquant) + 1 ].atkDispo = true
            }
        }
        

    }
    if(defenseur.hp < 0 && nomAttaquant === "ia"){
        defenseur.atkDispo = false
        if(boardIaTest.length > 1){
            if(defenseur === boardIaTest[boardIaTest.length - 1]){
                boardIaTest[0].atkDispo = true
            }else{
                boardIaTest[boardIaTest.indexOf(defenseur) + 1 ].atkDispo = true
            }
        }
        
    }
    
    
    console.log("TESTTTTTTTTTTTTTTTTTTT",attaquant) 
    console.log("TESTTTTTTTTTTTTTTTTTTT",defenseur) 


    
    
    majAffichageBoardPendantCombat(boardJoueurTest, boardIaTest);
    await sleep(200);
    // Puis, à la fin du combat, on vérifie pour attaquant et défenseur :
    checkForDeathAndRemove(attaquant, nomAttaquant, boardJoueurTest, boardIaTest);
    checkForDeathAndRemove(defenseur, nomDefenseur, boardJoueurTest, boardIaTest);
    await sleep(200);
    majAffichageBoardPendantCombat(boardJoueurTest, boardIaTest);
    console.log("boardIaTest après suppression:", boardIaTest);
    console.log("boardJoueurTest après suppression:", boardJoueurTest);
    console.log("il reste ", boardJoueurTest.length, "cartes sur le board joueur", )
    console.log("il reste ", boardIaTest.length, "cartes sur le board ia", )

}

cul1()