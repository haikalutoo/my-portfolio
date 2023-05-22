(() => {
    // VARIABLE
    const designer = document.querySelector('.keterampilan .designer .persentase-keterampilan');
    const frontend = document.querySelector('.keterampilan .frontend .persentase-keterampilan');

    // TAMPIL PALING PERTAMA
    loading(designer);
    loading(frontend);

    // ELEMENT
    const el = (data) => {
        return data.map((s) => {
            return `
                <div class="py-3">
                    <div class="nama d-flex justify-content-between">
                        <p>${s.nama}</p>
                        <p>${s.persen} %</p>
                    </div>
                    <div class="garis-persentase" style="width: ${s.persen}%;"></div>
                </div>
            `;
        }).join('');
    }

    // AMBIL DATA DAN TAMPILIN
    (async () => {
        try {
            const dataDesign = await fetch(url.keterampilan.design).then(res => res.json());
            const dataFrontend = await fetch(url.keterampilan.frontend).then(res => res.json());
            designer.innerHTML = el(dataDesign);
            frontend.innerHTML = el(dataFrontend);
        } catch(err) {
            designer.innerHTML = gagalAmbilData();
            frontend.innerHTML = gagalAmbilData();
        }
    })();
})();