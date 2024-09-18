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
});