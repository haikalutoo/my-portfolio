(() => {
    // VARIABLE
    const form = document.forms['submit-to-google-sheet'];
    const nama = document.querySelector('.kontak form input[name=nama]');
    const email = document.querySelector('.kontak form input[name=email]');
    const pesan = document.querySelector('.kontak form textarea');
    const button = document.querySelector('.kontak form button');
    
    // FORM KETIKA DI SUBMIT
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // VALIDASI
        if (button.textContent == 'Terkirim') {
            return this.firstElementChild.innerHTML = `
                <div class="alert alert-danger py-3" role="alert">
                    <i class="bi bi-exclamation-triangle"></i>
                    Ente sudah mengirimkan pesan!
                </div>
            `;
        }
        if (nama.value.length == 0 || email.value.length < 0 || pesan.value.length < 0) {
            return this.firstElementChild.innerHTML = `
                <div class="alert alert-warning py-3" role="alert">
                    <i class="bi bi-exclamation-triangle"></i>
                    Isi semua form!
                </div>
            `;
        }
        if (nama.value.length < 3 || email.value.length < 3 || pesan.value.length < 3) {
            return this.firstElementChild.innerHTML = `
                <div class="alert alert-warning py-3" role="alert">
                    <i class="bi bi-exclamation-triangle"></i>
                    Isi semua form minimal 3 karakter!
                </div>
            `;
        }
        if (this.classList.contains('ok')) return;

        // SUPAYA GA KEKLIK DUA KALI
        this.classList.add('ok');

        // TAMPIL PALING PERTAMA
        loadingSubmit(button);

        // KONDISI AKHIR
        try {
            await fetch(url.kontak, { method: 'POST', body: new FormData(form) });
            button.innerHTML = 'Terkirim';
            this.firstElementChild.innerHTML = `
                <div class="alert alert-success py-3" role="alert">
                    Pesan ente sudah kami terima!
                    <i class="bi bi-emoji-smile"></i>
                </div>
            `;
            form.reset();
        } catch(err) {
            console.error('Error!', err.message);
        }
    });
})();
