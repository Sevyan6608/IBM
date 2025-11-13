/**
 * A1 Bulgaria IBM Landing Page - Form Handling
 * Handles form validation and EmailJS submission
 */

(function() {
    'use strict';

    // ===================================
    // Configuration
    // ===================================
    const EMAILJS_CONFIG = {
        PUBLIC_KEY: 'YOUR_PUBLIC_KEY',       // Replace with your EmailJS public key
        SERVICE_ID: 'YOUR_SERVICE_ID',       // Replace with your EmailJS service ID
        TEMPLATE_ID: 'YOUR_TEMPLATE_ID'      // Replace with your EmailJS template ID
    };

    // ===================================
    // Form Elements
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const formInputs = {
        company: document.getElementById('company'),
        name: document.getElementById('name'),
        phone: document.getElementById('phone'),
        email: document.getElementById('email'),
        service: document.getElementById('service'),
        consent: document.getElementById('consent')
    };

    // ===================================
    // Validation Rules
    // ===================================
    const validationRules = {
        company: {
            required: true,
            minLength: 2,
            message: 'Моля, въведете име на компания (минимум 2 символа)'
        },
        name: {
            required: true,
            minLength: 2,
            pattern: /^[а-яА-Яa-zA-Z\s\-]+$/,
            message: 'Моля, въведете вашите имена (минимум 2 символа)'
        },
        phone: {
            required: true,
            pattern: /^[\+]?[0-9\s\-\(\)]{9,}$/,
            message: 'Моля, въведете валиден телефонен номер'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Моля, въведете валиден email адрес'
        },
        service: {
            required: true,
            message: 'Моля, изберете услуга'
        },
        consent: {
            required: true,
            message: 'Моля, потвърдете съгласието си за обработка на лични данни'
        }
    };

    // ===================================
    // Validation Functions
    // ===================================
    function validateField(field, rules) {
        const value = field.type === 'checkbox' ? field.checked : field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (rules.required) {
            if (field.type === 'checkbox') {
                if (!value) {
                    isValid = false;
                    errorMessage = rules.message;
                }
            } else if (!value || value === '') {
                isValid = false;
                errorMessage = rules.message;
            }
        }

        // Min length validation
        if (isValid && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = rules.message;
        }

        // Pattern validation
        if (isValid && rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.message;
        }

        return { isValid, errorMessage };
    }

    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');

        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');

        field.classList.remove('error');
        field.removeAttribute('aria-invalid');

        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    function validateForm() {
        let isFormValid = true;

        Object.keys(formInputs).forEach(fieldName => {
            const field = formInputs[fieldName];
            const rules = validationRules[fieldName];

            if (field && rules) {
                const { isValid, errorMessage } = validateField(field, rules);

                if (!isValid) {
                    showError(field, errorMessage);
                    isFormValid = false;
                } else {
                    clearError(field);
                }
            }
        });

        return isFormValid;
    }

    // ===================================
    // Real-time Validation
    // ===================================
    Object.keys(formInputs).forEach(fieldName => {
        const field = formInputs[fieldName];
        const rules = validationRules[fieldName];

        if (field && rules) {
            // Validate on blur
            field.addEventListener('blur', function() {
                const { isValid, errorMessage } = validateField(this, rules);

                if (!isValid) {
                    showError(this, errorMessage);
                } else {
                    clearError(this);
                }
            });

            // Clear error on input
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    const { isValid } = validateField(this, rules);
                    if (isValid) {
                        clearError(this);
                    }
                }
            });

            // For checkbox, also listen to change event
            if (field.type === 'checkbox') {
                field.addEventListener('change', function() {
                    const { isValid, errorMessage } = validateField(this, rules);

                    if (!isValid) {
                        showError(this, errorMessage);
                    } else {
                        clearError(this);
                    }
                });
            }
        }
    });

    // ===================================
    // Form Submission
    // ===================================
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validate form
            if (!validateForm()) {
                // Focus on first error field
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }
                return;
            }

            const submitButton = event.target.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Изпраща се...';

            // Prepare form data
            const formData = {
                company: formInputs.company.value.trim(),
                name: formInputs.name.value.trim(),
                phone: formInputs.phone.value.trim(),
                email: formInputs.email.value.trim(),
                service: formInputs.service.value,
                timestamp: new Date().toLocaleString('bg-BG')
            };

            // Send event to Google Analytics
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'event': 'form_submission',
                    'form_name': 'contact_form',
                    'service_selected': formData.service
                });
            }

            // Check if EmailJS is properly configured
            if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
                EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' ||
                EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {

                console.warn('EmailJS is not configured. Please update the configuration in form.js');

                // Simulate success for demonstration (remove in production)
                setTimeout(() => {
                    handleFormSuccess(submitButton, originalButtonText);
                    console.log('Form data (demo mode):', formData);
                }, 1000);

                return;
            }

            // Send email via EmailJS
            emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                formData
            )
            .then(function(response) {
                console.log('EmailJS SUCCESS:', response.status, response.text);
                handleFormSuccess(submitButton, originalButtonText);
            })
            .catch(function(error) {
                console.error('EmailJS ERROR:', error);
                handleFormError(submitButton, originalButtonText);
            });
        });
    }

    // ===================================
    // Success Handler
    // ===================================
    function handleFormSuccess(submitButton, originalButtonText) {
        submitButton.textContent = 'Изпратено успешно!';
        submitButton.style.backgroundColor = '#28a745';

        // Show success message
        showSuccessMessage();

        // Send success event to Google Analytics
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'form_submission_success',
                'form_name': 'contact_form'
            });
        }

        // Reset form
        contactForm.reset();

        // Clear all errors
        Object.values(formInputs).forEach(field => {
            if (field) clearError(field);
        });

        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            submitButton.style.backgroundColor = '';
        }, 3000);
    }

    // ===================================
    // Error Handler
    // ===================================
    function handleFormError(submitButton, originalButtonText) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;

        // Show error message
        showErrorMessage();

        // Send error event to Google Analytics
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'form_submission_error',
                'form_name': 'contact_form'
            });
        }
    }

    // ===================================
    // Success Message Modal
    // ===================================
    function showSuccessMessage() {
        const message = 'Вашата заявка е изпратена успешно! Ще се свържем с вас скоро.';
        showModal(message, 'success');
    }

    // ===================================
    // Error Message Modal
    // ===================================
    function showErrorMessage() {
        const message = 'Грешка при изпращане. Моля, опитайте отново или се свържете с нас директно на ibm@a1.bg';
        showModal(message, 'error');
    }

    // ===================================
    // Simple Modal
    // ===================================
    function showModal(message, type) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        // Create modal content
        const modal = document.createElement('div');
        modal.style.cssText = `
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            animation: slideUp 0.3s ease;
        `;

        const icon = document.createElement('div');
        icon.style.cssText = `
            font-size: 48px;
            margin-bottom: 20px;
        `;
        icon.textContent = type === 'success' ? '✓' : '✕';
        icon.style.color = type === 'success' ? '#28a745' : '#D32F2F';

        const messageEl = document.createElement('p');
        messageEl.style.cssText = `
            font-size: 18px;
            color: #333;
            margin-bottom: 30px;
            line-height: 1.6;
        `;
        messageEl.textContent = message;

        const button = document.createElement('button');
        button.textContent = 'Затвори';
        button.className = 'btn btn-primary';
        button.style.cssText = `
            cursor: pointer;
        `;

        modal.appendChild(icon);
        modal.appendChild(messageEl);
        modal.appendChild(button);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Close modal handlers
        const closeModal = () => {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        };

        button.addEventListener('click', closeModal);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeModal();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // ===================================
    // Add animations for modal
    // ===================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // Phone Number Formatting (Bulgarian)
    // ===================================
    if (formInputs.phone) {
        formInputs.phone.addEventListener('input', function(e) {
            let value = this.value.replace(/[^\d\+]/g, '');

            // Auto-format Bulgarian phone numbers
            if (value.startsWith('0') && value.length === 10) {
                value = '+359' + value.substring(1);
            }

            // Prevent multiple + signs
            const plusCount = (value.match(/\+/g) || []).length;
            if (plusCount > 1) {
                value = '+' + value.replace(/\+/g, '');
            }

            this.value = value;
        });
    }

    // ===================================
    // Console Message
    // ===================================
    console.log('Form validation and EmailJS handler initialized');
    if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        console.warn('⚠️ EmailJS not configured. Update EMAILJS_CONFIG in form.js');
    }

})();
