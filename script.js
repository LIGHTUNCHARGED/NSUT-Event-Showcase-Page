
document.addEventListener('DOMContentLoaded', () => {


    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('open');
        menuIcon.classList.toggle('ri-close-line');
    });

    const sections = document.querySelectorAll('.page-section, footer');
    const navLinksObserver = document.querySelectorAll('.navbar a');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50% 0px',
        threshold: 0
    };
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksObserver.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        navObserver.observe(section);
    });

    const landingAnimatedElements = document.querySelectorAll('[data-animation]');
    landingAnimatedElements.forEach(element => {
        const animationType = element.dataset.animation;
        const delay = element.dataset.delay || '0s';
        element.style.animation = `${animationType} 0.8s ease-out ${delay} forwards`;
    });
    

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]'); 
    const header = document.querySelector('.header');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(event) {
 
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                

                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            if(navbar.classList.contains('open')){
                navbar.classList.remove('open');
                menuIcon.classList.remove('ri-close-line');
            }
        });
    });

});


const eventDate = new Date('November 3, 2025 10:00:00').getTime();
const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);


    if (document.getElementById('days')) {
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
    }

    if (distance < 0) {
        clearInterval(countdownFunction);
        if (document.getElementById('countdown')) {
            document.getElementById('countdown').innerHTML = "<h3>The Event Has Started!</h3>";
        }
    }

}, 1000);
