document.addEventListener('DOMContentLoaded', function() {
    const courseContent = document.getElementById('course-content');
    
    // Get the course ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    // Fetch course details (in a real app, this would be an API call)
    const course = getCourseDetails(courseId);

    // Check user role (this would typically involve checking a session or token)
    const userRole = 'guest'; // Replace with actual role check: 'learner', 'instructor', or 'guest'

    let additionalOptions = '';
    if (userRole === 'learner') {
        additionalOptions = `
            <button id="trial-btn" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
                Trial For 2-Day
            </button>
        `;
    } else if (userRole === 'instructor') {
        additionalOptions = `
            <button id="edit-course-btn" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-4">
                Edit Course
            </button>
            <button id="manage-content-btn" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-4">
                Manage Content
            </button>
        `;
    }

    courseContent.innerHTML = `
        <div class="md:flex">
            <div class="md:flex-shrink-0">
                <img class="h-48 w-full object-cover md:w-48" src="${course.image}" alt="${course.name}">
            </div>
            <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">${course.category}</div>
                <h1 class="block mt-1 text-lg leading-tight font-medium text-black">${course.name}</h1>
                <p class="mt-2 text-gray-500">Instructor: ${course.instructor}</p>
                <p class="mt-2 text-gray-500">Duration: ${course.duration}</p>
                <p class="mt-2 text-3xl text-blue-600">$${course.price.toFixed(2)}</p>
                <p class="mt-4 text-gray-700">${course.description}</p>
                <div class="mt-6">
                    ${additionalOptions}
                    <button id="enroll-btn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for buttons
    document.getElementById('enroll-btn').addEventListener('click', function() {
        window.location.href = 'course-order.html?id=' + courseId;
    });

    if (userRole === 'learner') {
        document.getElementById('trial-btn').addEventListener('click', function() {
            alert('2-day trial started!');
        });
    } else if (userRole === 'instructor') {
        document.getElementById('edit-course-btn').addEventListener('click', function() {
            alert('Edit course functionality not implemented');
        });
        document.getElementById('manage-content-btn').addEventListener('click', function() {
            alert('Manage content functionality not implemented');
        });
    }
});

document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = 'browse-courses.html';
});


function getCourseDetails(courseId) {
    // In a real application, this would fetch data from a server
    // For now, we'll use mock data
    const courses = {
        '1': { 
            name: "JavaScript Basics", 
            instructor: "John Doe", 
            price: 49.99,
            category: "Programming",
            duration: "6 weeks",
            description: "Learn the fundamentals of JavaScript programming in this comprehensive course.",
            image: "https://placehold.co/600x400"
        },
        '2': { 
            name: "Advanced Python", 
            instructor: "Jane Smith", 
            price: 79.99,
            category: "Programming",
            duration: "8 weeks",
            description: "Take your Python skills to the next level with advanced concepts and real-world applications.",
            image: "https://placehold.co/600x400"
        },
        // Add more courses as needed
    };

    return courses[courseId] || { name: "Unknown Course", instructor: "Unknown", price: 0, category: "N/A", duration: "N/A", description: "Course not found", image: "https://placehold.co/600x400" };
}