document.addEventListener('DOMContentLoaded', function() {
    // Responsive navigation menu
    const navToggle = document.createElement('button');
    navToggle.innerHTML = '&#9776;'; // Hamburger icon
    navToggle.className = 'nav-toggle';
    document.querySelector('header').prepend(navToggle);

    navToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav');
        nav.classList.toggle('active');
    });

    // Dropdown functionality
    const browseDropdown = document.querySelector('.browse-dropdown');
    browseDropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.querySelector('.dropdown-content').classList.toggle('show');
        }
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', function(e) {
        if (!e.target.matches('.browse-dropdown')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    });

    // Dynamic loading of instructors and courses
    loadInstructors('new-instructors', 5);
    loadInstructors('featured-instructors', 5);
    loadCourses('new-courses', 5);
    loadCourses('featured-courses', 5);
});

function loadInstructors(sectionId, count) {
    const section = document.getElementById(sectionId);
    // In a real application, this data would be fetched from a server
    const instructors = [
        { name: 'John Doe', avatar: 'path/to/avatar1.jpg', profileUrl: 'instructor1.html' },
        { name: 'Jane Smith', avatar: 'path/to/avatar2.jpg', profileUrl: 'instructor2.html' },
        // Add more instructors as needed
    ];

    const instructorList = document.createElement('ul');
    instructorList.className = 'instructor-list';

    instructors.slice(0, count).forEach(instructor => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${instructor.profileUrl}">
                <img src="${instructor.avatar}" alt="${instructor.name}" class="instructor-avatar">
                <span class="instructor-name">${instructor.name}</span>
            </a>
        `;
        instructorList.appendChild(li);
    });

    section.appendChild(instructorList);
}

function loadCourses(sectionId, count) {
    const section = document.getElementById(sectionId);
    // In a real application, this data would be fetched from a server
    const courses = [
        { name: 'Introduction to JavaScript', image: 'path/to/course1.jpg', price: 49.99, instructor: 'John Doe', detailUrl: 'course1.html' },
        { name: 'Advanced Python Programming', image: 'path/to/course2.jpg', price: 79.99, instructor: 'Jane Smith', detailUrl: 'course2.html' },
        // Add more courses as needed
    ];

    const courseList = document.createElement('ul');
    courseList.className = 'course-list';

    courses.slice(0, count).forEach(course => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${course.detailUrl}" class="course-card">
                <img src="${course.image}" alt="${course.name}" class="course-image">
                <h3 class="course-name">${course.name}</h3>
                <p class="course-instructor">${course.instructor}</p>
                <p class="course-price">$${course.price.toFixed(2)}</p>
            </a>
        `;
        courseList.appendChild(li);
    });

    section.appendChild(courseList);
}