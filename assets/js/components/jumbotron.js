(() => {

    // VARIABLE
    const fotoProfile = document.querySelector('.jumbotron .foto-profile');
    const kontenJem = document.querySelector('.jumbotron .jem');

    setInterval(() => {
        // AMBIL JAM SEKARANG
        const jam = `0${new Date().getHours().toString()}`;
        const menit = `0${new Date().getMinutes().toString()}`;
        const detik = `0${new Date().getSeconds().toString()}`;

        // TEKS JAM
        const teksJam = `${jam.slice(-2)} : ${menit.slice(-2)} : ${detik.slice(-2)}`;
        kontenJem.innerHTML = teksJam;
    }, 1000);
    
    // TAMPIL PALING PERTAMA
    loading(fotoProfile);

    // AMBIL DATA TAMPILIN
    (async () => {
        try {
            const data = await fetch(url.jumbotron).then(res => res.json());
            fotoProfile.innerHTML = `
                <img src="${data[0].gambar}" class="mx-5 my-3" alt="foto-profile">
            `;
        } catch(err) {
            fotoProfile.innerHTML = gagalAmbilData();
        }
    })();
})();