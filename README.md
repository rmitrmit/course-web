# Online Learning Platform Server

This is the server-side code for the Online Learning Platform. It provides APIs for course management, user registration, and authentication.

## Prerequisites

Before you begin, ensure you have the following installed on your computer:

- [Node.js](https://nodejs.org/) (version 12.0 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. Clone this repository to your local machine:
git clone https://github.com/rmitrmit/course-web.git
2. Navigate to the project directory:
cd course-web
3. Install the required dependencies:
npm install

## Running the Application

1. Start the server:
node server.js 

The server will run on `http://localhost:3000`.

2. Open `index.html` in your browser to access the client-side application.

## API Endpoints

- GET `/api/courses`: Fetch all courses
- POST `/api/add-course`: Add a new course
- DELETE `/api/delete-course/:id`: Delete a course
- POST `/api/register`: Register a new user
- POST `/api/login`: Authenticate a user

