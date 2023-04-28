document.getElementById("home-item").addEventListener("click", (ev) => {
    window.scrollTo({"behavior": "smooth", "top": 0})
});
document.getElementById("news-item").addEventListener("click", (ev) => {
    window.location.href = "#news-seite"
});