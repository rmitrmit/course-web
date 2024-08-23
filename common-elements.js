document.addEventListener('DOMContentLoaded', function() {
    // Inject header
    document.body.insertAdjacentHTML('afterbegin', `
        <header class="bg-white shadow-md">
            <div class="container mx-auto px-4 py-3 flex justify-between items-center">
                <div class="flex items-center">
                    <a href="index.html" class="text-2xl font-bold text-purple-600">Online Learning Platform</a>
                    <nav class="ml-6 space-x-4 hidden md:flex">
                        <a href="browse-courses.html" class="text-gray-700 hover:text-gray-900">Browse Courses</a>
                        <a href="about.html" class="text-gray-700 hover:text-gray-900">About Us</a>
                        <a href="pricing.html" class="text-gray-700 hover:text-gray-900">Pricing</a>
                        <a href="add-course.html" class="text-gray-700 hover:text-gray-900">Add Course</a> <!-- Added link -->
                    </nav>
                </div>
                <div class="flex items-center space-x-4">
                    <input type="text" placeholder="Search for courses" class="border rounded-full px-4 py-2 hidden md:block">
                    <a href="my-account.html" class="text-gray-700 hover:text-gray-900 hidden md:block">My Account</a>
                    <a href="contact.html" class="text-gray-700 hover:text-gray-900 hidden md:block">Contact</a>
                    <a href="#" class="text-gray-700 hover:text-gray-900 hidden md:block"><i class="fas fa-shopping-cart"></i></a>
                    <button class="md:hidden text-gray-700 hover:text-gray-900">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </header>
    `);

    // Inject footer
    document.body.insertAdjacentHTML('beforeend', `
        <footer class="bg-gray-800 text-white py-8">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 class="font-semibold text-lg mb-4">Online Learning Platform</h4>
                        <ul>
                            <li><a href="index.html" class="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="about.html" class="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="pricing.html" class="text-gray-400 hover:text-white">Pricing</a></li>
                            <li><a href="contact.html" class="text-gray-400 hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-lg mb-4">Courses</h4>
                        <ul>
                            <li><a href="browse-courses.html" class="text-gray-400 hover:text-white">Browse Courses</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Popular Courses</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">New Courses</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-lg mb-4">Support</h4>
                        <ul>
                            <li><a href="faqs.html" class="text-gray-400 hover:text-white">FAQs</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Help Center</a></li>
                            <li><a href="privacy-policy.html" class="text-gray-400 hover:text-white">Privacy Policy</a></li>
                            <li><a href="terms-of-service.html" class="text-gray-400 hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-lg mb-4">Follow Us</h4>
                        <div class="space-x-4">
                            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-linkedin"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    `);

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('header button');
    const mobileMenu = document.querySelector('header nav');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});
