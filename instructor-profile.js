document.addEventListener('DOMContentLoaded', function() {
    // Mock data for instructor
    const instructor = {
        name: "John Doe",
        profilePicture: "path/to/john-doe.jpg",
        bio: "John Doe is an experienced software engineer with over 10 years of industry experience..."
    };

    // Mock data for courses
    const courses = [
        { id: 1, name: "JavaScript Basics", price: 49.99, image: "path/to/js-course.jpg" },
        { id: 2, name: "Advanced Python", price: 79.99, image: "path/to/python-course.jpg" },
        { id: 3, name: "Web Development Bootcamp", price: 99.99, image: "path/to/web-dev-course.jpg" },
        // Add more courses as needed
    ];

    // Populate header and footer
    document.getElementById('instructor-header').innerHTML = `
        <img src="${instructor.profilePicture}" alt="${instructor.name}" class="instructor-avatar">
        <h1>${instructor.name}</h1>
    `;
    document.getElementById('instructor-footer').innerHTML = `
        <p>&copy; 2024 ${instructor.name}. All rights reserved.</p>
    `;

    // Populate about section
    document.getElementById('about-instructor').innerHTML += `
        <p>${instructor.bio}</p>
    `;

    // Function to display courses
    function displayCourses(containerId, courseList) {
        const container = document.getElementById(containerId);
        container.innerHTML += courseList.map(course => `
            <div class="course-card">
                <img src="${course.image}" alt="${course.name}" class="course-image">
                <h3>${course.name}</h3>
                <p>Price: $${course.price.toFixed(2)}</p>
                <a href="course-detail.html?id=${course.id}" class="view-course-btn">View Course</a>
            </div>
        `).join('');
    }

    // Display new courses (assuming the first 5 are the newest)
    displayCourses('new-courses', courses.slice(0, 5));

    // Display all courses
    displayCourses('all-courses', courses);
});