(_ => {

    /* COPYRIGHT FOOTER */
    (_ => {
        return {
            tahun: new Date().getFullYear(),
            copyright: document.querySelector('.footer .row-dua .copyright'),
            tampil: function () {
                this.copyright.innerHTML = `&copy; copyright ${this.tahun}`;
            }
        }
    })().tampil();

    /* HANDLE PANAH ATAS */
    const handlePanahAtas = {
        panahAtas: document.querySelector('.panah-atas'),
        scroll: function () {
            if (window.scrollY >= 100) return this.panahAtas.classList.add('return');
            if (window.scrollY < 100) return this.panahAtas.classList.remove('return');
        },
        click: function (target) {
            if (target === this.panahAtas) return scrollTo(0, 0);
        }
    }
    
    /* HANDLE MENU */
    class HandleMenu {
        constructor (navbarMenu) {
            this.navbarMenu = navbarMenu;
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
    const handleMenu = new HandleMenu(document.querySelector('.navbar-menu'));
    
    /* HANDLE ALERT */
    class HandleAlert {
        constructor (alertKonten) {
            this.alertKonten = alertKonten;
        }
        alert (pesan = '', warna = '') {
            this.alertKonten.innerHTML = `
                <div class="alert ${warna} muncul">
                    <p>${pesan}</p>
                    <i class="bi bi-x alert-close"></i>
                </div>
            `;
        }
        click (target) {
            if (target.classList.contains('alert-close')) {
                this.alertKonten.firstElementChild.classList.remove('muncul');
            }
        }
    }

    /* HANDLE FORM */
    class HandleForm extends HandleAlert {
        constructor (form) {
            super(form.firstElementChild);
            this.form = form;
            this.nama = this.form.nama;
            this.email = this.form.email;
            this.pesan = this.form.pesan;
            this.button = this.form.lastElementChild;
            this.url = 'https://script.google.com/macros/s/AKfycbyY8VE_n0LM2wfImAqU1tIj7OX9gfYAvuHrDXDt2_kZLsprPbWhPiWXWv_lOlVykYf3qg/exec';
        }
        submit () {     
            if (this.nama.value.length < 3 || this.email.value.length < 3 || this.pesan.value.length < 3) {
                return this.alert('Isi semua form minimal 3 karakter!', 'kuning');
            }
            if (sessionStorage.getItem('kirim') === 'terkirim') {
                return this.alert('Anda sudah mengirimkan pesan!', 'merah');
            }
            if (this.form.classList.contains('ok')) return;

            (_ => {
                this.form.classList.add('ok');
                this.button.innerHTML = '<span class="loader"></span>';
            })();
    
            (async _ => {
                try {
                    await fetch(this.url, { method: 'POST', body: new FormData(this.form) });
                    sessionStorage.setItem('kirim', 'terkirim');
                    this.button.innerHTML = 'Kirim';
                    this.alert('Terima kasih! pesan anda sudah kami terima', 'ijo');
                    this.form.reset();
                    return;
                }
                catch (error) {
                    this.alert('Error, gagal mengirim pesan!', 'merah');
                    this.button.innerHTML = 'Kirim';
                    this.form.classList.remove('ok');
                    return;
                }
            })();
        }
    }
    const handleForm = new HandleForm(document.querySelector('.kontak form'));

    /* HANDLE AOS */
    const handleAos = {
        load: function () {
            aosJumbotron();
        },
        scroll: function () {
            aosTentang();
            aosSkills();
            aosPortfolio();
        }
    }
    // WAKTU TUNGGU
    const tunggu = ms => {
        return new Promise(resolve => {
            setTimeout(_ => {
                resolve();
            }, ms);
        });
    }
    // KAPAN AOS BEREAKSI
    const elementInView = el => {
        const elementTop = Math.round(el.getBoundingClientRect().top);
        return elementTop <= window.innerHeight;
    }

    // REAKSI AOS
    const toggleClass = async (el, loop = false, add = true, ms = 150) => {
        if (loop) {
            for (let i = 0; i < el.length; i++) {
                if (add) el[i].classList.add('return');
                if (!add) el[i].classList.remove('return');
                await tunggu(ms);
            }
        } else {
            if (add) el.classList.add('return');
            if (!add) el.classList.remove('return');
        }
    }

    // JUMBOTRON
    const aosJumbotron = _ => {
        const jumbotronText = document.querySelectorAll('.jumbotron-text');
        const jumbotronImg = document.querySelector('.jumbotron-img');
        toggleClass(jumbotronImg, false, true);
        toggleClass(jumbotronText, true, true);
    }

    // TENTANG
    const aosTentang = _ => {
        const tentangTextHeader = document.querySelectorAll('.tentang-text-header');
        const tentangImg = document.querySelector('.tentang-img');
        const tentangText = document.querySelector('.tentang-text');
        const tentangIcon = document.querySelectorAll('.tentang-icon');

        // PAKE ELSE KALO MAO ANIMASI LAGI PAS KEATAS
        elementInView(tentangTextHeader[0]) && toggleClass(tentangTextHeader, true, true);
        elementInView(tentangImg) && toggleClass(tentangImg, false, true);
        elementInView(tentangText) && toggleClass(tentangText, false, true);
        elementInView(tentangIcon[0]) && toggleClass(tentangIcon, true, true);
    }

    // SKILLS
    const aosSkills = _ => {
        const skillsTextHeader = document.querySelectorAll('.skills-text-header');
        const skillsPersen = document.querySelectorAll('.skills .persen');

        elementInView(skillsTextHeader[0]) && toggleClass(skillsTextHeader, true, true);
        elementInView(skillsPersen[0]) && toggleClass(skillsPersen, true, true);
    }

    // PORTFOLIO
    const aosPortfolio = _ => {
        const portfolioTextHeader = document.querySelectorAll('.portfolio-text-header');
        const portfolioCol = document.querySelectorAll('.portfolio .col');

        elementInView(portfolioTextHeader[0]) && toggleClass(portfolioTextHeader, true, true)
        elementInView(portfolioCol[0]) && toggleClass(portfolioCol[0], false, true)
        elementInView(portfolioCol[1]) && toggleClass(portfolioCol[1], false, true)
        elementInView(portfolioCol[2]) && toggleClass(portfolioCol[2], false, true)
        elementInView(portfolioCol[3]) && toggleClass(portfolioCol[3], false, true)
        elementInView(portfolioCol[4]) && toggleClass(portfolioCol[4], false, true)
        elementInView(portfolioCol[5]) && toggleClass(portfolioCol[5], false, true)
    }

    // LOAD
    window.onload = _ => {

        // AOS
        handleAos.load();
    }
    
    // SUBMIT
    window.onsubmit = e => {
        e.preventDefault();
    
        // FORM
        handleForm.submit();
    }

    // SCROLL
    window.onscroll = _ => {
    
        // PANAH ATAS
        handlePanahAtas.scroll();

        // AOS
        handleAos.scroll();
    }

    // CLICK
    window.onclick = ({ target }) => {
    
        // MENU
        handleMenu.click(target);
    
        // FORM
        handleForm.click(target);
    
        // PANAH ATAS
        handlePanahAtas.click(target);
    }
})();