document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-course-form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const course = {
            id: 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9), // Generate a temporary ID
            name: formData.get('name') || '',
            category: formData.get('category') || '',
            price: parseFloat(formData.get('price')) || 0,
            instructor: formData.get('instructor') || '',
            image: await fileToBase64(formData.get('image')) || '',
            description: formData.get('description') || ''
        };

        console.log('Course data:', course); // Debugging: Check if course object is correct

        try {
            const response = await fetch('http://localhost:3000/api/add-course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(course)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);

            // Check if the server returned a different ID
            if (data.id && data.id !== course.id) {
                console.log('Server assigned ID:', data.id);
                course.id = data.id; // Update the course object with the server-assigned ID
            }

            alert('Course added successfully!');
            
            // Optional: Redirect to the course detail page
            // window.location.href = `course-detail.html?id=${course.id}`;

            // Optional: Clear the form
            form.reset();

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add course.');
        }
    });

    // Function to convert file to Base64
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            if (file instanceof File) {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
                reader.readAsDataURL(file);
            } else {
                resolve(''); // Return an empty string if no file is provided
            }
        });
    }
});