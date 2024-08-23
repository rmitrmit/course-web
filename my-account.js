document.addEventListener('DOMContentLoaded', function() {
    const accountContent = document.getElementById('account-content');
    
    // Check if user is logged in (this would typically involve checking a session or token)
    const isLoggedIn = false; // Replace with actual login check

    if (isLoggedIn) {
        // Display user information
        accountContent.innerHTML = `
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Welcome, [User Name]</h2>
            <div class="flex items-center mb-6">
                <img src="path/to/profile-picture.jpg" alt="Profile Picture" class="w-24 h-24 rounded-full mr-4">
                <div>
                    <p class="text-gray-600"><span class="font-semibold">Email:</span> user@example.com</p>
                    <p class="text-gray-600"><span class="font-semibold">Phone:</span> +1234567890</p>
                </div>
            </div>
            <button id="logout-btn" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Logout
            </button>
        `;

        document.getElementById('logout-btn').addEventListener('click', function() {
            // Implement logout functionality
            alert('Logged out successfully');
            location.reload();
        });
    } else {
        // Display login form
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

        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            // Implement login functionality
            alert('Login functionality not implemented');
        });
    }
});