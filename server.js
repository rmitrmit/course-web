const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

let courses = [
    { id: 1, name: "JavaScript Fundamentals", category: "Web Development", price: 49.99, instructor: "John Doe", image: "https://placehold.co/300x200" },
    // Add other courses here
];

let users = [];

const SECRET_KEY = 'your_secret_key'; // In a real app, use an environment variable

function generateUniqueId() {
    return courses.length ? Math.max(...courses.map(course => course.id)) + 1 : 1;
}

app.get('/api/courses', (req, res) => {
    res.json(courses);
});

app.post('/api/add-course', (req, res) => {
    const course = req.body;

    if (!course.name || !course.category || !course.price || !course.instructor) {
        return res.status(400).json({ message: 'Invalid course data' });
    }

    if (course.image && typeof course.image === 'string') {
        if (!course.image.startsWith('data:image/')) {
            return res.status(400).json({ message: 'Invalid image data' });
        }
    }

    course.id = generateUniqueId();
    courses.push(course);
    res.json({ message: 'Course added successfully!' });
});

app.delete('/api/delete-course/:id', (req, res) => {
    const courseId = parseInt(req.params.id, 10);
    courses = courses.filter(course => course.id !== courseId);
    res.json({ message: 'Course deleted successfully!' });
});

app.post('/api/register', async (req, res) => {
    const { email, password, name, phone, country, accountType } = req.body;

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword, name, phone, country, accountType };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
    const { loginId, password } = req.body;

    const user = users.find(user => user.email === loginId || user.phone === loginId);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user: { name: user.name, email: user.email, phone: user.phone } });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});