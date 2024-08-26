document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    const accountTypeRadios = document.getElementsByName('account-type');
    const instructorFields = document.getElementById('instructor-fields');

    accountTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'instructor') {
                instructorFields.classList.remove('hidden');
            } else {
                instructorFields.classList.add('hidden');
            }
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            registerUser();
        }
    });

    function validateForm() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('retype-password').value;
        const phone = document.getElementById('phone').value;

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return false;
        }

        if (!validatePhoneNumber(phone)) {
            alert('Please enter a valid phone number.');
            return false;
        }

        return true;
    }

    function registerUser() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const phone = document.getElementById('phone').value;
        const country = document.getElementById('country').value;
        const accountType = document.querySelector('input[name="account-type"]:checked').value;
        const name = `${firstName} ${lastName}`;

        const user = { email, password, name, phone, country, accountType };

        fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message === 'User registered successfully') {
                form.reset();
                window.location.href = 'my-account.html'; // Redirect to my account page
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred during registration.');
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhoneNumber(phone) {
        const re = /^\d{10,11}$/;
        return re.test(phone);
    }

    // Populate country dropdown
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const countrySelect = document.getElementById('country');
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select your country';
            countrySelect.appendChild(defaultOption);

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
