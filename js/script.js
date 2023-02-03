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
window.onscroll = (_) => {
  if (window.scrollY > 50) {
    navbar.style.borderBottom = "1px solid #ddd";
  } else {
    navbar.style.borderBottom = "none";
  }
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
