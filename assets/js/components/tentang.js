(() => {
    // VARIABLE
    const kontenTentang = document.querySelector('.tentang .konten-tentang');

    // ELEMENT
    const el = (data, i) => {
        return `
            <div class="kolom p-3">
                <div class="foto-tentang">
                    <img src="${data[i].gambar}" alt="foto-tentang">
                </div>
            </div>
            <div class="kolom kolom-konten p-3 d-flex flex-column align-items-center justify-content-between">
                <p>${data[i].deskripsi}</p>
                <a href="${data[i].link}" target="_blank" class="text-light text-decoration-none pt-5">
                    <button type="button" class="btn btn-primary py-2 mt-3">
                        Download CV
                    </button>
                </a>
            </div>
        `;
    }

    // TAMPIL PALING PERTAMA
    loading(kontenTentang);

    // AMBIL DATA TAMPILIN
    (async () => {
        try {
            const data = await fetch(url.tentang).then(res => res.json());
            kontenTentang.innerHTML = el(data, 0);
        } catch(err) {
            kontenTentang.innerHTML = gagalAmbilData();
        }
    })();
})();