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
if ((waktu >= 0 && waktu < 6) || (waktu >= 18 && waktu <= 24)) {
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

// Form
const nama = document.querySelector("#nama");
const email = document.querySelector("#email");
const pesan = document.querySelector("#pesan");
const kirim = document.querySelector("#kirim");
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxTa0NVKtY0wGim2CoUjIr6UfLGwNuACb7Hkm1w8r-2_vyj-e2okUtVKpLTOYu65vDx/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (nama.value == "" || email.value == "" || pesan.value == "") {
    if (kirim.textContent == "terkirim") {
      alert("anda sudah mengirim pesan");
    } else {
      alert("Gaboleh ada yang kosong !!");
    }
  } else if (
    nama.value.length < 3 ||
    email.value.length < 3 ||
    pesan.value.length < 3
  ) {
    if (kirim.textContent == "terkirim") {
      alert("anda sudah mengirim pesan");
    } else {
      alert("Minimal 3 karakter !!");
    }
  } else if (kirim.textContent == "mengirim") {
    console.log("lagi ngirim cuy sabar");
  } else {
    if (kirim.textContent == "terkirim") {
      alert("anda sudah mengirim pesan");
    } else {
      kirim.innerHTML = "mengirim";
      fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
          kirim.innerHTML = "terkirim";
          alert("terima kasih pesan anda sudah kami terima");
          form.reset();
        })
        .catch((error) => {
          console.error("Error!", error.message);
        });
    }
  }
});
