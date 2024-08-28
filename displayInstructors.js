// Global closeModal function
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Featured Instructors
    const featuredInstructors = [
        {
            name: "John Doe",
            title: "Senior Developer",
            image: "path-to-image1.jpg",
            bio: "John has over 10 years of experience in software development and specializes in web technologies.",
            moreInfo: "John has worked on various large-scale projects, including e-commerce platforms and enterprise software solutions. He is also an active contributor to open-source projects."
        },
        {
            name: "Jane Smith",
            title: "Data Scientist",
            image: "path-to-image2.jpg",
            bio: "Jane is a data science expert with a passion for machine learning and AI.",
            moreInfo: "Jane has published numerous papers in the field of AI and has presented at major conferences worldwide. She is also a mentor for budding data scientists."
        },
        // Add more featured instructors as needed
    ];

    function populateFeaturedInstructors() {
        const container = document.getElementById('featured-instructor');
        
        featuredInstructors.forEach((instructor, index) => {
            const instructorDiv = document.createElement('div');
            instructorDiv.className = "bg-white rounded-lg shadow-lg p-6";

            instructorDiv.innerHTML = `
                <img src="${instructor.image}" alt="${instructor.name}" class="w-full h-48 object-cover rounded-t-lg mb-4">
                <h3 class="text-xl font-bold text-gray-800">${instructor.name}</h3>
                <p class="text-gray-600">${instructor.title}</p>
                <p class="text-gray-700 mt-4">${instructor.bio}</p>
                <button data-index="${index}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block view-more-btn">View More</button>
            `;

            container.appendChild(instructorDiv);
        });

        // Attach event listeners to the "View More" buttons
        container.querySelectorAll('.view-more-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                viewMore(index);
            });
        });
    }

    function viewMore(index) {
        const instructor = featuredInstructors[index];
        const modal = document.getElementById('instructor-modal');

        if (!instructor) {
            console.error('Instructor not found at index:', index);
            return;
        }

        modal.querySelector('.modal-content').innerHTML = `
            <h3 class="text-2xl font-bold text-gray-800">${instructor.name}</h3>
            <p class="text-gray-600">${instructor.title}</p>
            <img src="${instructor.image}" alt="${instructor.name}" class="w-full h-48 object-cover rounded-t-lg my-4">
            <p class="text-gray-700">${instructor.bio}</p>
            <p class="text-gray-700 mt-4">${instructor.moreInfo}</p>
            <button onclick="closeModal()" class="mt-4 text-red-600 underline">Close</button>
        `;
        modal.classList.remove('hidden');
    }

    // New Instructors
    const newInstructors = [
        {
            name: "Alice Johnson",
            title: "Full-Stack Developer",
            image: "path-to-image3.jpg",
            bio: "Alice is a full-stack developer with expertise in both front-end and back-end technologies.",
            moreInfo: "Alice has worked with various startups to build scalable web applications and has a passion for teaching coding to beginners."
        },
        {
            name: "Bob Martinez",
            title: "Cloud Engineer",
            image: "path-to-image4.jpg",
            bio: "Bob specializes in cloud computing and has experience working with major cloud platforms.",
            moreInfo: "Bob has led several successful migrations to cloud environments and is an advocate for serverless architecture."
        },
        // Add more new instructors as needed
    ];

    function populateNewInstructors() {
        const container = document.getElementById('new-instructor');

        newInstructors.forEach((instructor, index) => {
            const instructorDiv = document.createElement('div');
            instructorDiv.className = "bg-white rounded-lg shadow-lg p-6";

            instructorDiv.innerHTML = `
                <img src="${instructor.image}" alt="${instructor.name}" class="w-full h-48 object-cover rounded-t-lg mb-4">
                <h3 class="text-xl font-bold text-gray-800">${instructor.name}</h3>
                <p class="text-gray-600">${instructor.title}</p>
                <p class="text-gray-700 mt-4">${instructor.bio}</p>
                <button data-index="${index}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block view-more-btn">View More</button>
            `;

            container.appendChild(instructorDiv);
        });

        // Attach event listeners to the "View More" buttons
        container.querySelectorAll('.view-more-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                viewMoreNewInstructor(index);
            });
        });
    }

    function viewMoreNewInstructor(index) {
        const instructor = newInstructors[index];
        const modal = document.getElementById('instructor-modal');

        if (!instructor) {
            console.error('Instructor not found at index:', index);
            return;
        }

        modal.querySelector('.modal-content').innerHTML = `
            <h3 class="text-2xl font-bold text-gray-800">${instructor.name}</h3>
            <p class="text-gray-600">${instructor.title}</p>
            <img src="${instructor.image}" alt="${instructor.name}" class="w-full h-48 object-cover rounded-t-lg my-4">
            <p class="text-gray-700">${instructor.bio}</p>
            <p class="text-gray-700 mt-4">${instructor.moreInfo}</p>
            <button onclick="closeModal()" class="mt-4 text-red-600 underline">Close</button>
        `;
        modal.classList.remove('hidden');
    }

    // New Courses
    const newCoursesContainer = document.getElementById('new-course');

    const newCourses = [
        { id: 'new1', name: "How to Harmonize", category: "Music", price: 49.99, instructor: "Sarah Lee", image: "https://via.placeholder.com/300x200?text=How+to+Harmonize", description: "Learn the basics of harmonizing in music." },
        { id: 'new2', name: "Start your own company from scratch", category: "Business Management", price: 59.99, instructor: "Michael Brown", image: "https://via.placeholder.com/300x200?text=Start+Your+Company", description: "A comprehensive guide to starting and managing your own business." },
        // Add more new courses as needed
    ];

    function displayNewCourses() {
        newCoursesContainer.innerHTML = newCourses.map(course => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <img src="${course.image || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${course.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">${course.name}</h3>
                    <p class="text-gray-600 mb-2">Instructor: ${course.instructor}</p>
                    <p class="text-gray-600 mb-2">Category: ${course.category}</p>
                    <p class="text-2xl font-bold text-blue-600 mb-4">$${course.price.toFixed(2)}</p>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block view-more-btn" data-id="${course.id}">
                        View More
                    </button>
                </div>
            </div>
        `).join('');

        // Attach event listeners to View More buttons
        newCoursesContainer.querySelectorAll('.view-more-btn').forEach(button => {
            button.addEventListener('click', function () {
                const courseId = this.getAttribute('data-id');
                viewMoreCourse(courseId);
            });
        });
    }

    function viewMoreCourse(courseId) {
        const course = newCourses.find(c => c.id === courseId);
        if (!course) {
            console.error('Course not found:', courseId);
            return;
        }

        const modal = document.getElementById('course-modal');
        modal.querySelector('.modal-content').innerHTML = `
            <h3 class="text-2xl font-bold text-gray-800">${course.name}</h3>
            <p class="text-gray-600">${course.category}</p>
            <img src="${course.image || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${course.name}" class="w-full h-48 object-cover rounded-t-lg my-4">
            <p class="text-gray-700">${course.description}</p>
            <p class="text-2xl font-bold text-blue-600 mb-4">$${course.price.toFixed(2)}</p>
            <button onclick="closeModal()" class="mt-4 text-red-600 underline">Close</button>
        `;

        modal.classList.remove('hidden');
    }

    // Initialize all sections
    populateFeaturedInstructors();
    populateNewInstructors();
    displayNewCourses();
});