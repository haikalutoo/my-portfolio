const body = document.body;
// Navbar
const navbar = document.querySelector("#navbar");
const menu = document.querySelector("#hamburger-menu");
const navbarNav = document.querySelector(".navbar .navbar-nav");
const mode = document.querySelector(".navbar .mode");
menu.onclick = (e) => {
  e.preventDefault();
  navbarNav.classList.toggle("x-nol");
  setTimeout(() => {
    mode.classList.toggle("x-nol");
  }, 100);
};
document.onclick = (e) => {
  if (
    !menu.contains(e.target) &&
    !navbarNav.contains(e.target) &&
    !mode.contains(e.target)
  ) {
    navbarNav.classList.remove("x-nol");
    mode.classList.remove("x-nol");
  }
};
// gelap
function gelap() {
  const a = document.querySelectorAll("#badan a");
  // mode
  const geser = document.querySelector(".geser");
  geser.classList.toggle("x-100");
  mode.classList.toggle("putih");
  geser.classList.toggle("item");
  // body
  body.classList.toggle("item");
  body.classList.toggle("putih");
  // navbar
  navbar.classList.toggle("item");
  navbarNav.classList.toggle("item");
  // a
  a.forEach((s) => {
    s.classList.toggle("putih");
  });
  // portfolio
  const portfolio = document.querySelector(".portfolio");
  const card = document.querySelectorAll(".portfolio .card");
  portfolio.classList.toggle("item");
  card.forEach((s) => {
    s.classList.toggle("item");
  });
  // hero
  const txtNama = document.querySelector(".txt-nama");
  const txtGawean = document.querySelector(".txt-gawean");

  txtNama.classList.toggle("putih");
  txtGawean.classList.toggle("putih");
  // About
  const h3 = document.querySelector(".about h3");

  h3.classList.toggle("putih");
}
mode.addEventListener("click", (_) => {
  gelap();
});
const waktu = new Date().getHours();
if ((waktu >= 0 && waktu <= 6) || (waktu >= 18 && waktu <= 24)) {
  gelap();
}
// border nav
window.onscroll = (_) => {
  if (window.scrollY > 50) {
    if (body.classList.contains("item")) {
      navbar.style.borderBottom = "1px solid #444";
    } else {
      navbar.style.borderBottom = "1px solid #ddd";
    }
  } else {
    navbar.style.borderBottom = "none";
  }
};
// Akhir navbar
