async function cinematique(){
    let body = document.querySelector('.body')
    let logo = document.querySelector('.logo')
    await sleep(5000);
    addFadeOut(logo)
    await sleep(2000);
    let fondstart = document.querySelector('.fondstart')
    fondstart.classList.remove('d-none')
    await sleep(1000);
    let logojeu = document.querySelector('.logojeu')
    logojeu.classList.remove('d-none')
    await sleep(3000);
    let pressstart = document.querySelector('.pressstart')
    pressstart.classList.remove('d-none')
    await sleep(3000);
    let pressed = false
    while(pressed === false){
        addFadeOut(pressstart)
        await sleep(3000);
        addFadeIn(pressstart)
        await sleep(3000);

    }
    

}





////////////////////////////////////////

cinematique()

////////////////////////////////////////

