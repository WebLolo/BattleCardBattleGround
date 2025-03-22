document.addEventListener("DOMContentLoaded", () => {
    let preview = document.getElementById("cardPreview");
    let previewImage = document.getElementById("previewImage");
    let hoverTimeout = null; // Stocke le timeout

    function showPreview(imgSrc) {
        previewImage.setAttribute("src", imgSrc);
        preview.classList.add("show");
    }

    function hidePreview() {
        preview.classList.remove("show");
    }

    function handleMouseOver(event) {
        let card = event.target.closest("[data-fullimg]");
        if (card) {
            let imgSrc = card.getAttribute("data-fullimg");
            if (imgSrc) {
                hoverTimeout = setTimeout(() => showPreview(imgSrc), 1000); // ⏳ Attendre 1 seconde
            }
        }
    }

    function handleMouseOut(event) {
        clearTimeout(hoverTimeout); // 🛑 Annule l'affichage si la souris quitte avant 1s
        hidePreview();
    }

    // Appliquer à tout le document (Shop, Board et Deck)
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    // Fermer l'aperçu en cliquant sur l'overlay
    document.querySelector("#cardPreview .overlay").addEventListener("click", hidePreview);
});
