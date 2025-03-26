document.addEventListener("DOMContentLoaded", () => {
    let preview = document.getElementById("cardPreview");
    let previewImage = document.getElementById("previewImage");

    function showPreview(imgSrc) {
        previewImage.setAttribute("src", imgSrc);
        preview.classList.add("show");
    }

    function hidePreview() {
        preview.classList.remove("show");
    }

    function handleDoubleClick(event) {
        let card = event.target.closest("[data-fullimg]");
        if (card) {
            let imgSrc = card.getAttribute("data-fullimg");
            if (imgSrc) {
                showPreview(imgSrc);
            }
        }
    }

    // Appliquer l'événement double-clic aux cartes
    document.body.addEventListener("dblclick", handleDoubleClick);

    // Fermer l'aperçu en cliquant sur l'overlay
    document.querySelector("#cardPreview .overlay").addEventListener("click", hidePreview);
});
