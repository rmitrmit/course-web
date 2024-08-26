document.addEventListener('DOMContentLoaded', function() {
    const accountContent = document.getElementById('account-content');
    
    function checkLoginStatus() {
        return localStorage.getItem('token') !== null;
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

    function handleLogin(event) {
        event.preventDefault();
        let loginId = document.getElementById('login-id').value.trim(); 
        const password = document.getElementById('password').value.trim(); 

        clearErrors();

        const isEmail = loginId.includes('@');
        let isValid = true;

        if (isEmail) {
            if (!validateEmail(loginId)) {
                isValid = false;
                showError('login-id', 'Invalid email format.');
            }
        } else {
            if (!validatePhoneNumber(loginId)) {
                isValid = false;
                showError('login-id', 'Invalid phone number format.');
            }
        }

        if (!password) {
            isValid = false;
            showError('password', 'Password is required.');
        }

        if (isValid) {
            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ loginId, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert('Logged in successfully');
                    location.reload();
                } else {
                    showError('login-id', data.message || 'Invalid credentials');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred during login.');
            });
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('Logged out successfully');
        location.reload();
    }

    if (checkLoginStatus()) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        accountContent.innerHTML = `
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Welcome, ${currentUser.name}</h2>
            <div class="flex items-center mb-6">
                <img src="path/to/profile-picture.jpg" alt="Profile Picture" class="w-24 h-24 rounded-full mr-4">
                <div>
                    <p class="text-gray-600"><span class="font-semibold">Email:</span> ${currentUser.email}</p>
                    <p class="text-gray-600"><span class="font-semibold">Phone:</span> ${currentUser.phone}</p>
                </div>
            </div>
            <button id="logout-btn" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Logout
            </button>
        `;

        document.getElementById('logout-btn').addEventListener('click', handleLogout);
    } else {
        accountContent.innerHTML = `
            <form id="login-form" class="space-y-4">
                <div>
                    <label for="login-id" class="block text-gray-700 text-sm font-bold mb-2">Email or Phone:</label>
                    <input type="text" id="login-id" name="login-id" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div>
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input type="password" id="password" name="password" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                </button>
            </form>
            <div class="mt-4">
                <p class="text-gray-600"><a href="forgot-password.html" class="text-blue-500 hover:text-blue-600">Forgot Password?</a></p>
                <p class="text-gray-600 mt-2">Don't have an account? <a href="register.html" class="text-blue-500 hover:text-blue-600">Register</a></p>
            </div>
        `;

        document.getElementById('login-form').addEventListener('submit', handleLogin);
    }
});