document.addEventListener('DOMContentLoaded', function () {
    const formHTML = `
        <form id="forgot-password-form" class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div class="mb-4">
                <label for="identifier" class="block text-gray-700 text-sm font-bold mb-2">Email or Phone Number:</label>
                <input type="text" id="identifier" name="identifier" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email or phone number" required>
            </div>
            <div class="mb-4">
                <label for="new-password" class="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
                <input type="password" id="new-password" name="new-password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter new password" required>
            </div>
            <div class="mb-4">
                <label for="retype-new-password" class="block text-gray-700 text-sm font-bold mb-2">Retype New Password:</label>
                <input type="password" id="retype-new-password" name="retype-new-password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Retype new password" required>
            </div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reset</button>
            <p class="mt-4 text-center"><a href="my-account.html" class="text-blue-500 hover:underline">Back to Login</a></p>
        </form>
    `;

    const accountContent = document.getElementById('account-content');
    if (accountContent) {
        accountContent.innerHTML = formHTML;
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function validatePhoneNumber(phone) {
        const phonePattern = /^\d{10,11}$/;
        return phonePattern.test(phone.trim());
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-red-500 text-sm mt-2';
        errorDiv.innerText = message;
        field.parentElement.appendChild(errorDiv);
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.text-red-500');
        errors.forEach(error => error.remove());
    }

    function validatePasswordMatch(password, retypePassword) {
        return password === retypePassword;
    }

    function handleForgotPassword(event) {
        event.preventDefault();

        const identifier = document.getElementById('identifier').value.trim();
        const newPassword = document.getElementById('new-password').value.trim();
        const retypeNewPassword = document.getElementById('retype-new-password').value.trim();

        clearErrors();

        let isValid = true;

        if (identifier.includes('@')) { 
            if (!validateEmail(identifier)) {
                isValid = false;
                showError('identifier', 'Invalid email format.');
            }
        } else { 
            if (!validatePhoneNumber(identifier)) {
                isValid = false;
                showError('identifier', 'Invalid phone number format. It should be 10-11 digits.');
            }
        }

        if (!newPassword) {
            isValid = false;
            showError('new-password', 'New password is required.');
        }

        if (!retypeNewPassword) {
            isValid = false;
            showError('retype-new-password', 'Please retype your new password.');
        }

        if (newPassword && retypeNewPassword && !validatePasswordMatch(newPassword, retypeNewPassword)) {
            isValid = false;
            showError('retype-new-password', 'Passwords do not match.');
        }

        if (isValid) {
            fetch('http://localhost:3000/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, newPassword }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Password has been reset successfully.');
                    } else {
                        showError('identifier', data.message || 'An error occurred. Please try again.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                });
        }
    }

    document.getElementById('forgot-password-form').addEventListener('Reset', handleForgotPassword);
});