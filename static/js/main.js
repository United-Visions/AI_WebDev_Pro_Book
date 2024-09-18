// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    const contactForm = document.getElementById('contact-form');

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateOrderForm()) {
                submitOrderForm();
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }

    function validateOrderForm() {
        let isValid = true;
        const customerName = document.getElementById('customer-name');
        const customerEmail = document.getElementById('customer-email');

        if (!customerName.value.trim()) {
            showError(customerName, 'Please enter your name');
            isValid = false;
        } else {
            clearError(customerName);
        }

        if (!customerEmail.value.trim()) {
            showError(customerEmail, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(customerEmail.value)) {
            showError(customerEmail, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(customerEmail);
        }

        return isValid;
    }

    function validateContactForm() {
        let isValid = true;
        const name = document.getElementById('contact-name');
        const email = document.getElementById('contact-email');
        const message = document.getElementById('contact-message');

        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        } else {
            clearError(name);
        }

        if (!email.value.trim()) {
            showError(email, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(email);
        }

        if (!message.value.trim()) {
            showError(message, 'Please enter your message');
            isValid = false;
        } else {
            clearError(message);
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.uk-form-danger') || document.createElement('span');
        errorElement.className = 'uk-form-danger';
        errorElement.innerText = message;
        if (!formControl.querySelector('.uk-form-danger')) {
            formControl.appendChild(errorElement);
        }
        input.className = 'uk-input uk-form-danger';
    }

    function clearError(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.uk-form-danger');
        if (errorElement) {
            formControl.removeChild(errorElement);
        }
        input.className = 'uk-input';
    }

    function submitOrderForm() {
        const formData = new FormData(orderForm);
        fetch('/order', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                UIkit.notification({
                    message: data.message,
                    status: 'success',
                    pos: 'top-center',
                    timeout: 5000
                });
                orderForm.reset();
            } else if (data.error) {
                UIkit.notification({
                    message: data.error,
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 5000
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            UIkit.notification({
                message: 'An error occurred. Please try again later.',
                status: 'danger',
                pos: 'top-center',
                timeout: 5000
            });
        });
    }

    function submitContactForm() {
        const formData = new FormData(contactForm);
        fetch('/contact', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                UIkit.notification({
                    message: data.message,
                    status: 'success',
                    pos: 'top-center',
                    timeout: 5000
                });
                contactForm.reset();
            } else if (data.error) {
                UIkit.notification({
                    message: data.error,
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 5000
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            UIkit.notification({
                message: 'An error occurred. Please try again later.',
                status: 'danger',
                pos: 'top-center',
                timeout: 5000
            });
        });
    }
});// Smooth scrolling
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
});document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('uk-open');

            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('uk-open');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    otherItem.querySelector('.faq-icon').classList.remove('ti-minus');
                    otherItem.querySelector('.faq-icon').classList.add('ti-plus');
                }
            });

            // Toggle the clicked FAQ item
            item.classList.toggle('uk-open');

            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.remove('ti-plus');
                icon.classList.add('ti-minus');
            } else {
                answer.style.maxHeight = null;
                icon.classList.remove('ti-minus');
                icon.classList.add('ti-plus');
            }
        });
    });

    // Animate FAQ items on scroll
    const animateFAQItems = () => {
        faqItems.forEach((item, index) => {
            if (isElementInViewport(item)) {
                setTimeout(() => {
                    item.classList.add('uk-animation-slide-bottom-small');
                    item.style.opacity = '1';
                }, index * 100);
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

    window.addEventListener('scroll', animateFAQItems);
    window.addEventListener('resize', animateFAQItems);
    animateFAQItems();

    // Add hover effect to FAQ items
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('uk-box-shadow-medium');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('uk-box-shadow-medium');
        });
    });

    // Accessibility improvements
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('tabindex', '0');

        const answer = item.querySelector('.faq-answer');
        answer.setAttribute('aria-hidden', 'true');

        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            question.setAttribute('aria-expanded', !isExpanded);
            answer.setAttribute('aria-hidden', isExpanded);
        });

        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
});