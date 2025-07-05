// Navbar Fixed & Back to Top Button
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const toTop = document.querySelector('#to-top');

    if (window.scrollY > header.offsetTop) {
        header.classList.add('navbar-fixed');
        toTop.classList.remove('hidden');
        toTop.classList.add('flex');
    } else {
        header.classList.remove('navbar-fixed');
        toTop.classList.remove('flex');
        toTop.classList.add('hidden');
    }
});

// Hamburger Menu Toggle Script
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function(e) {
    e.stopPropagation(); // Mencegah event bubbling
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

// Klik di luar hamburger untuk menutup menu
window.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('hamburger-active');
        navMenu.classList.add('hidden');
    }
});

