(() => {
    // VARIABLE
    let data = null;
    let i = 0;
    const buttons = document.querySelectorAll('.portfolio .panah i');
    const kontenPortfolio = document.querySelector('.portfolio .konten-portfolio');

    // ELEMENT
    const el = (data, i) => {
        return `
            <div class="kolom p-3">
                <div class="foto-portfolio">
                    <img src="${data[i].gambar}" alt="foto-portfolio">
                </div>
            </div>
            <div class="kolom kolom-konten p-3 d-flex flex-column align-items-center justify-content-between">
                <h4 class="pb-3">${data[i].judul}</h4>
                <p>${data[i].deskripsi}</p>
                <a href="${data[i].link}" target="_blank" class="text-light text-decoration-none pt-3">
                    <button type="button" class="btn btn-primary px-5 py-2">
                        Lihat
                    </button>
                </a>
            </div>
        `;
    }

    // TAMPIL PALING PERTAMA
    loading(kontenPortfolio);

    // AMBIL DATA DAN TAMPILIN
    (async () => {
        try {
            data = await fetch(url.portfolio).then(res => res.json());
            kontenPortfolio.innerHTML = el(data, 0);
        } catch (err) {
            kontenPortfolio.innerHTML = gagalAmbilData();
        }
    })();

    // EVENT
    buttons.forEach(button => {
        button.onclick = e => {
            if (data != null) {
                const img = kontenPortfolio.firstElementChild.firstElementChild.firstElementChild;
                if (e.target.classList.contains('next')) {
                    if (i < data.length - 1) {
                        i++;
                    } else {
                        i = 0;
                    }
                    img.style.opacity = '0';
                    setTimeout(() => {
                        kontenPortfolio.innerHTML = el(data, i);
                    }, 300);
                } else {
                    if (i > 0) {
                        i--;
                    } else {
                        i = data.length - 1;
                    }
                    img.style.opacity = '0';
                    setTimeout(() => {
                        kontenPortfolio.innerHTML = el(data, i);
                    }, 300);
                }
            }
        }
    });
})();