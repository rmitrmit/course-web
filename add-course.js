document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-course-form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const course = {
            name: formData.get('name') || '', // Match the name attribute in HTML
            category: formData.get('category') || '',
            price: parseFloat(formData.get('price')) || 0,
            instructor: formData.get('instructor') || '',
            image: await fileToBase64(formData.get('image')) || ''
        };

        console.log('Course data:', course); // Debugging: Check if course object is correct

        fetch('http://localhost:3000/api/add-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Course added successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add course.');
        });
    });

    // Function to convert file to Base64
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            if (file instanceof File) { // Ensure the input is a File object
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
