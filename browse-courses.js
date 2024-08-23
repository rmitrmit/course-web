document.addEventListener('DOMContentLoaded', function() {
    const courseList = document.getElementById('course-list');
    const browseByNameBtn = document.getElementById('browse-by-name');
    const browseByCategoryBtn = document.getElementById('browse-by-category');
    const showAllCoursesBtn = document.getElementById('show-all-courses');
    const browseOptions = document.getElementById('browse-options');
    const featuredCoursesSection = document.getElementById('featured-courses');

    const categories = [
        "Web Development",
        "Mobile App Development",
        "Data Science",
        "Machine Learning",
        "Artificial Intelligence",
        "Cloud Computing",
        "Cybersecurity",
        "Digital Marketing",
        "Graphic Design",
        "Business Management",
        "Finance",
        "Language Learning",
        "Music",
        "Photography",
        "Health and Fitness"
    ];

    async function fetchCourses() {
        try {
            const response = await fetch('http://localhost:3000/api/courses');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching courses:', error);
            return [];
        }
    }

    async function deleteCourse(courseId) {
        try {
            const response = await fetch(`http://localhost:3000/api/delete-course/${courseId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    }
    

    function displayCourses(courses) {
        courseList.innerHTML = courses.map(course => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <img src="${course.image || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${course.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">${course.name}</h3>
                    <p class="text-gray-600 mb-2">Instructor: ${course.instructor}</p>
                    <p class="text-gray-600 mb-2">Category: ${course.category}</p>
                    <p class="text-2xl font-bold text-blue-600 mb-4">$${course.price.toFixed(2)}</p>
                    <a href="course-detail.html?id=${course.id}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
                        View Course
                    </a>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 delete-course" data-id="${course.id}">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');

        // Attach event listeners to delete buttons
        document.querySelectorAll('.delete-course').forEach(button => {
            button.addEventListener('click', async function() {
                const courseId = this.getAttribute('data-id');
                await deleteCourse(courseId);
                // Refresh the course list after deletion
                fetchCourses().then(courses => displayCourses(courses));
            });
        });
    }

    function displayFeaturedCourses() {
        const featuredCourses = [
            { id: 1, name: "JavaScript Fundamentals", category: "Web Development", price: 49.99, instructor: "John Doe", image: "https://via.placeholder.com/300x200?text=JavaScript+Fundamentals" },
            { id: 2, name: "Python for Data Science", category: "Data Science", price: 79.99, instructor: "Jane Smith", image: "https://via.placeholder.com/300x200?text=Python+for+Data+Science" },
            { id: 3, name: "iOS App Development with Swift", category: "Mobile App Development", price: 89.99, instructor: "Mike Johnson", image: "https://via.placeholder.com/300x200?text=iOS+App+Development" }
        ];

        const featuredCoursesContainer = document.getElementById('featured-courses');
        featuredCoursesContainer.innerHTML = featuredCourses.map(course => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <img src="${course.image || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${course.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">${course.name}</h3>
                    <p class="text-gray-600 mb-2">Instructor: ${course.instructor}</p>
                    <p class="text-2xl font-bold text-blue-600 mb-4">$${course.price.toFixed(2)}</p>
                    <a href="course-detail.html?id=${course.id}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
                        View Course
                    </a>
                </div>
            </div>
        `).join('');
    }

    window.displayFeaturedCourses = displayFeaturedCourses;

    function displayAlphabetOptions() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        browseOptions.innerHTML = alphabet.split('').map(letter => `
            <button class="bg-blue-400 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded m-1">
                ${letter}
            </button>
        `).join('');

        browseOptions.addEventListener('click', async function(e) {
            if (e.target.tagName === 'BUTTON') {
                const letter = e.target.textContent.trim();
                const courses = await fetchCourses();
                const filteredCourses = courses.filter(course => course.name.startsWith(letter));
                displayCourses(filteredCourses);
                showAllCoursesBtn.classList.remove('hidden');
            }
        });
    }

    function displayCategoryOptions() {
        browseOptions.innerHTML = categories.map(category => `
            <button class="bg-green-400 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded m-1">
                ${category}
            </button>
        `).join('');

        browseOptions.addEventListener('click', async function(e) {
            if (e.target.tagName === 'BUTTON') {
                const category = e.target.textContent.trim();

                const url = new URL(window.location);
                url.searchParams.set('category', category);
                window.history.pushState({}, '', url);

                const courses = await fetchCourses();
                const filteredCourses = courses.filter(course => course.category === category);
                displayCourses(filteredCourses);
                showAllCoursesBtn.classList.remove('hidden');
            }
        });
    }

    browseByNameBtn.addEventListener('click', function() {
        browseOptions.classList.remove('hidden');
        displayAlphabetOptions();
    });

    browseByCategoryBtn.addEventListener('click', function() {
        browseOptions.classList.remove('hidden');
        displayCategoryOptions();
    });

    showAllCoursesBtn.addEventListener('click', async function() {
        const courses = await fetchCourses();
        displayCourses(courses);
        this.classList.add('hidden');
    });

    async function applyCategoryFilter() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        if (category && categories.includes(category)) {
            const courses = await fetchCourses();
            const filteredCourses = courses.filter(course => course.category === category);
            displayCourses(filteredCourses);
            showAllCoursesBtn.classList.remove('hidden');
        } else {
            const courses = await fetchCourses();
            displayCourses(courses);
        }
    }

    applyCategoryFilter();
    browseOptions.classList.add('hidden');
});
