(_ => {

    // COPYRIGHT FOOTER
    (_ => {
        return {
            tahun: new Date().getFullYear(),
            copyright: document.querySelector('.footer .row-dua .copyright'),
            tampil: function () {
                this.copyright.innerHTML = `&copy; copyright ${this.tahun}`;
            }
        }
    })().tampil();

    // HANDLE PANAH ATAS
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
    
    // HANDLE MENU
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
    
    // HANDLE ALERT
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

    // HANDLE FORM
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


// const el = document.querySelector('.portfolio .row-dua');

// const elementInView = (el) => {
//     const elementTop = el.getBoundingClientRect().top;
//     return (
//       elementTop <= (window.innerHeight || document.documentElement.clientHeight)
//     );
// };
// window.onscroll = _ => {
//     const top = Math.round(el.getBoundingClientRect().top);
//     const bottom = Math.round(el.getBoundingClientRect().bottom);

    // if (top < 0 && bottom > 0) {
    //     console.log('ok');
    // } else {
    //     console.log('kaga');
    // }
// }

// AOS


const jumbotronText = document.querySelectorAll('.jumbotron-text');
const jumbotronImg = document.querySelector('.jumbotron-img');
const tunggu = milidetik => {
    return new Promise(resolve => {
        setTimeout(_ => {
            resolve();
        }, milidetik);
    });
}
// FUNCTION
const elementInView = (el, top = 100, bottom = 100) => {
    const elementTop = Math.round(el.getBoundingClientRect().top);
    const elementBottom = Math.round(el.getBoundingClientRect().bottom);
    console.log({
        elementTop,
        elementBottom
    })
    return elementTop < top && elementBottom > bottom;
}
// JUMBOTRON
window.onload = async _ => {
    jumbotronImg.classList.add('return');
    for (let i = 0; i < jumbotronText.length; i++) {
        jumbotronText[i].classList.add('return');
        await tunggu(100);
    }
}
// TENTANG
const tentangRowSatu = document.querySelector('.tentang .row-satu');
const tentangTextHeader = document.querySelectorAll('.tentang-text-header');
window.onscroll = _ => {
    tentangTextHeader.forEach(async t => {
        if (elementInView(tentangRowSatu, 500, 100)) {
            t.classList.add('return');
        } else {
            t.classList.remove('return')
        }
    });
}