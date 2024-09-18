// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                UIkit.scroll(targetElement).scrollTo(targetElement);
            }
        });
    });

    // Smooth scroll to section if URL contains hash
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                UIkit.scroll(targetElement).scrollTo(targetElement);
            }, 100);
        }
    }

    // Highlight active navigation item
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.uk-navbar-nav li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('uk-active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('uk-active');
            }
        });
    });

    // Smooth scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="ti-arrow-up"></i>';
    scrollToTopBtn.className = 'uk-button uk-button-primary uk-border-circle uk-position-fixed uk-position-bottom-right uk-margin-small-right uk-margin-small-bottom uk-box-shadow-large';
    scrollToTopBtn.style.display = 'none';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        UIkit.scroll(document.body).scrollTo(0);
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.uk-scrollspy-inview');
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('uk-animation-slide-bottom-small');
            }
        });
    };

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    animateOnScroll();
});