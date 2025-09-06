const menuButton = document.getElementById("menu");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.textContent = nav.classList.contains("open") ? "X" : "☰";
});
