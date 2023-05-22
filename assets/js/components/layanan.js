(() => {
    // VARIABLE
    const kontenLayanan = document.querySelector('.konten-layanan');

    // ELEMENT
    const el = (data) => {
        return data.map((d) => {
            return `
                <div class="col-auto my-3">
                    <div class="card">
                        <div class="card-body">
                        <h3 class="card-title">
                            ${d.icon}
                        </h3>
                        <h5 class="card-subtitle text-body-secondary">${d.judul}</h5>
                        <p class="card-text">${d.deskripsi}</p>
                        <div class="d-flex justify-content-end">
                            <h6>
                                <a href="${d.link}" target="_blank" class="text-decoration-none">View More <i class="bi bi-arrow-right"></i></a>
                            </h6>
                        </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // TAMPIL PALING PERTAMA
    loading(kontenLayanan);

    // AMBIL DATA TAMPILIN
    (async () => {
        try {
            const data = await fetch(url.layanan).then(res => res.json());
            kontenLayanan.innerHTML = el(data);
        }
        catch(err) {
            kontenLayanan.innerHTML = gagalAmbilData();
        }
    })();
})();