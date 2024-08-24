document.addEventListener('DOMContentLoaded', function() {
    const courseContent = document.getElementById('course-content');
    
    // Get the course ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    // Fetch course details
    getCourseDetails(courseId).then(course => {
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
                    <img class="h-48 w-full object-cover md:w-48" src="${course.image || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${course.name}">
                </div>
                <div class="p-8">
                    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">${course.category}</div>
                    <h1 class="block mt-1 text-lg leading-tight font-medium text-black">${course.name}</h1>
                    <p class="mt-2 text-gray-500">Instructor: ${course.instructor}</p>
                    <p class="mt-2 text-3xl text-blue-600">$${course.price.toFixed(2)}</p>
                    <p class="mt-4 text-gray-700">${course.description || 'No description available.'}</p>
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
});

document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = 'browse-courses.html';
});

async function getCourseDetails(courseId) {
    const mockCourses = [
        { id: 'mock1', name: "Introduction to React", category: "Web Development", price: 59.99, instructor: "Alice Johnson", image: "https://via.placeholder.com/300x200?text=Intro+to+React", description: "Learn the basics of React and start building modern web applications." },
        { id: 'mock2', name: "Advanced Machine Learning", category: "Machine Learning", price: 89.99, instructor: "Bob Smith", image: "https://via.placeholder.com/300x200?text=Advanced+ML", description: "Dive deep into advanced machine learning techniques and algorithms." },
        { id: 'mock3', name: "Digital Marketing Mastery", category: "Digital Marketing", price: 69.99, instructor: "Carol White", image: "https://via.placeholder.com/300x200?text=Digital+Marketing", description: "Master the art of digital marketing and grow your online presence." },
        { id: 'mock4', name: "iOS App Development", category: "Mobile App Development", price: 79.99, instructor: "David Brown", image: "https://via.placeholder.com/300x200?text=iOS+Development", description: "Learn to build iOS apps using Swift and Xcode." },
        { id: 'mock5', name: "Cybersecurity Fundamentals", category: "Cybersecurity", price: 74.99, instructor: "Eva Green", image: "https://via.placeholder.com/300x200?text=Cybersecurity", description: "Understand the basics of cybersecurity and protect against common threats." }
    ];

    // First, check if the course is in our mock data
    const mockCourse = mockCourses.find(course => course.id === courseId);
    if (mockCourse) {
        return mockCourse;
    }

    // If not in mock data, fetch all courses from API
    try {
        const response = await fetch('http://localhost:3000/api/courses');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const allCourses = await response.json();
        
        // Find the specific course
        const course = allCourses.find(course => course.id === courseId);
        
        if (course) {
            return course;
        } else {
            throw new Error('Course not found');
        }
    } catch (error) {
        console.error('Error fetching course details:', error);
        // If there's an error fetching the course, return a default "not found" course
        return { 
            id: courseId,
            name: "Course Not Found", 
            instructor: "Unknown", 
            price: 0, 
            category: "N/A", 
            image: "https://via.placeholder.com/300x200?text=Course+Not+Found",
            description: "The requested course could not be found."
        };
    }
}