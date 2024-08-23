document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const clearBtn = document.getElementById('clear-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            // Here you would typically send the form data to a server
            alert('Form submitted successfully!');
            form.reset();
        }
    });

    clearBtn.addEventListener('click', function() {
        form.reset();
    });

    function validateForm() {
        // Add your form validation logic here
        // Return true if the form is valid, false otherwise
        return true;
    }
});