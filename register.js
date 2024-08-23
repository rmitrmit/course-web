document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    const accountTypeRadios = document.getElementsByName('account-type');
    const instructorFields = document.getElementById('instructor-fields');

    // Show/hide instructor fields based on account type selection
    accountTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            instructorFields.classList.toggle('hidden', this.value !== 'instructor');
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            // Here you would typically send the form data to a server
            alert('Registration submitted successfully!');
            form.reset();
        }
    });

    function validateForm() {
        // Add your form validation logic here
        // Check for password match, valid email, phone number format, etc.
        return true;
    }

    // Populate country dropdown
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const countrySelect = document.getElementById('country');
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2;
                option.textContent = country.name.common;
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching countries:', error));
});