(() => {
    // VARIABLE
    const copyright = document.querySelector('footer .copyright');
    const tahun = new Date().getFullYear();

    // TAMPIL
    copyright.innerHTML = `
        <p>
            &copy; copyright ${tahun} | built with <i class="bi bi-heart-fill text-danger"></i> by <b><a href="https://instagram.com/wajik45" target="_blank" class="text-light text-decoration-none">Haikal</a></b>
        </p>
    `;
})();