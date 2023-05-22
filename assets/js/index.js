// BISA DIPAKE LAGI
// FUNGSI

// LOADING
const loading = el => {
    el.innerHTML = `
        <div class="d-flex justify-content-center p-5" style="width: 100%;">
            <div class="spinner-border" role="status" style="width: 2.5rem; height: 2.5rem;"></div>
        </div>
    `;
}
const loadingSubmit = el => {
    el.innerHTML = `
        <div class="d-flex justify-content-center my-1" style="width: 100%;">
            <div class="spinner-border" role="status" style="width: 1.2rem; height: 1.2rem;"></div>
        </div>
    `;
}
// GAGAL MENGAMBIL DATA
const gagalAmbilData = () => {
    return `
        <h5 class="text-center py-5">
            Gagal mengambil data
            <i class="bi bi-emoji-frown"></i>
        </h5>
    `;
}
// TEMA
const terang = (ul) => {
    document.body.setAttribute('data-bs-theme', 'light');
    document.body.className = 'light';
    document.body.firstElementChild.style.backgroundColor = 'rgba(248, 249, 250, .7)';
    ul.classList.remove('dark');
}
const gelap = (ul) => {
    document.body.setAttribute('data-bs-theme', 'dark');
    document.body.className = 'dark';
    document.body.firstElementChild.style.backgroundColor = 'rgba(33, 37, 41, .7)';
    ul.classList.add('dark');
}

// VARIABLE

// NAV
const menu = document.querySelector('nav .lapisan-menu');
const ul = document.querySelector('nav ul');
const tema = document.querySelector('nav .tema');
// OTW ATAS
const otwAtas = document.querySelector('.otw-atas');

// TEMA BERDASARKAN WAKTU
(() => {
    const jam = new Date().getHours();

    if (jam >= 6 && jam <= 18) {
        tema.className = 'bi bi-sun fs-5 text-warning tema terang';
        terang(ul);
    } else {
        tema.className = 'bi bi-moon fs-5 tema gelap';
        gelap(ul);
    }
})();

    // EVENT

// TEMA BERDASARKAN KONDISI
tema.onclick = () => {
    if (tema.classList.contains('terang')) {
        tema.className = 'bi bi-moon fs-5 tema gelap';
        gelap(ul);
        return;
    }
    if (tema.classList.contains('gelap')) {
        tema.className = 'bi bi-sun fs-5 text-warning tema terang';
        terang(ul);
        return;
    }
}
// OTW ATAS
otwAtas.lastElementChild.onclick = () => scrollTo(0, 0);

// EVENT BUBLING

// READY STATE CHANGE
this.onreadystatechange = () => {
    if (document.readyState !== 'complete') {
        document.body.style.visibility = 'hidden';
    } else {
        document.body.style.visibility = 'visible';
    }
}

// KLIK
this.onclick = e => {
    // MENU
    if (e.target == menu) return ul.classList.toggle('geser');
    if (ul.classList.contains('geser')) {
        if (e.target != ul && e.target != menu && e.target != tema && e.target.localName != 'a' && e.target.localName != 'li') {
            return ul.classList.remove('geser');
        }
    }
}
// SCROLL
this.onscroll = () => {
    // OTW ATAS
    if (scrollY > 100) return otwAtas.classList.add('geser');
    if (scrollY < 100) return otwAtas.classList.remove('geser');
}