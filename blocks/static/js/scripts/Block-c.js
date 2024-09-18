document.addEventListener('DOMContentLoaded', function() {
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