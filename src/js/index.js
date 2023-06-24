(_ => {
    
    // MENU
    class HandleMenu {
        constructor () {
            this.navbarMenu = document.querySelector('.navbar-menu');
            this.navbarNav = this.navbarMenu.previousElementSibling;
            this.ul = this.navbarNav.firstElementChild;
        }
        toggleMenu () {
            this.navbarMenu.classList.toggle('close');
            this.navbarNav.classList.toggle('return');
            for (let i = 0; i < this.navbarMenu.children.length; i++) {
                this.navbarMenu.children[i].classList.toggle('close');
            }
        }
        click (target) {
            if (target === this.navbarMenu
                || target === this.navbarMenu.children[0]
                || target === this.navbarMenu.children[1]
                || target === this.navbarMenu.children[2]) return this.toggleMenu();
            if (this.navbarNav.classList.contains('return')) {
                if (target !== this.navbarNav && target !== this.ul && !target.classList.contains('navbar-a')) {
                    return this.toggleMenu();
                }
            }
        }
    }
    const handleMenu = new HandleMenu();
    
    // PANAH ATAS
    class HandlePanahAtas {
        constructor () {
            this.panahAtas = document.querySelector('.panah-atas');
        }
        scroll () {
            if (window.scrollY >= 100) return this.panahAtas.classList.add('return');
            if (window.scrollY < 100) return this.panahAtas.classList.remove('return');
        }
        click (target) {
            if (target === this.panahAtas) return scrollTo(0, 0);
        }
    }
    const handlePanahAtas = new HandlePanahAtas();
    
    // HANDLE ALERT
    class HandleAlert {
        constructor () {
            this.alertKonten = document.querySelector('.alert-konten');
        }
        alert (pesan = '', warna = '') {
            this.alertKonten.innerHTML = `
                <div class="alert ${warna} muncul">
                    <p>${pesan}</p>
                    <span class="alert-close">x</span>
                </div>
            `;
        }
        click (target) {
            if (target.classList.contains('alert-close')) {
                this.alertKonten.firstElementChild.classList.remove('muncul');
            }
        }
    }

    // COPYRIGHT
    class HandleCopyright {
        constructor () {
            this.tahun = new Date().getFullYear();
            this.copyright = document.querySelector('.footer .row-dua .copyright');
        }
        tampil () {
            this.copyright.innerHTML = `&copy; copyright ${this.tahun}`;
        }
    }
    (_ => new HandleCopyright().tampil())();
    
    // HANDLE FORM
    class HandleForm extends HandleAlert {
        constructor () {
            super();
            this.form = document.querySelector('.kontak form');
            this.nama = this.form.nama;
            this.email = this.form.email;
            this.pesan = this.form.pesan;
            this.button = this.form.lastElementChild;
            this.url = 'https://script.google.com/macros/s/AKfycbyY8VE_n0LM2wfImAqU1tIj7OX9gfYAvuHrDXDt2_kZLsprPbWhPiWXWv_lOlVykYf3qg/exec';
        }
        submit () {        
            if (this.button.textContent.includes('Terkirim')) {
                return this.alert('Anda sudah mengirimkan pesan!', 'merah');
            }
            if (this.nama.value.length < 3 || this.email.value.length < 3 || this.pesan.value.length < 3) {
                return this.alert('Isi semua form minimal 3 karakter!', 'kuning');
            }
            if (this.form.classList.contains('ok')) return;
    
            (_ => {
                this.form.classList.add('ok');
                this.button.innerHTML = '<span class="loader"></span>';
            })();
    
            (async _ => {
                try {
                    await fetch(this.url, { method: 'POST', body: new FormData(this.form) });
                    this.button.innerHTML = 'Terkirim';
                    this.alert('Terima kasih! pesan anda sudah kami terima', 'ijo');
                    this.form.reset();
                }
                catch (error) {
                    this.alert(error.message, 'merah');
                }
            })();
        }
    }
    const handleForm = new HandleForm();
    
    // SUBMIT
    document.onsubmit = e => {
        e.preventDefault();
    
        // FORM
        handleForm.submit();
    }

    // SCROLL
    document.onscroll = _ => {
    
        // PANAH ATAS
        handlePanahAtas.scroll();
    }

    // CLICK
    document.onclick = ({ target }) => {
    
        // MENU
        handleMenu.click(target);
    
        // FORM
        handleForm.click(target);
    
        // PANAH ATAS
        handlePanahAtas.click(target);
    }
})();