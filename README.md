# **Post Management System with JWT Authentication**

## **Project Overview**

This project is a full-stack application that allows users to sign up, upload a profile picture, and view posts. It uses **React** on the frontend and **Node.js** with **Express** on the backend, along with **MySQL** for database management. The application leverages **JWT authentication** for securing user sessions.

## **Features**
- **User Signup**: Allows users to sign up with a profile picture, email, and password.
- **JWT Authentication**: Secure the user session with JWT tokens.
- **Post Management**: View a list of posts and individual post details.
- **File Upload**: Profile pictures are uploaded with each user registration.
- **Protected Routes**: Only authenticated users can view certain pages (e.g., posts).

## **Technologies Used**
- **Frontend**:
  - React.js
  - React Router for navigation
  - Axios for HTTP requests
  - JSX and CSS for UI styling
- **Backend**:
  - Node.js
  - Express.js
  - MySQL
  - JWT (JSON Web Token) for authentication
  - Multer for file upload handling
- **Database**: MySQL

## **Setup Instructions**

### **1. Clone the repository**
To get started with the project, clone this repository to your local machine.

```bash
git clone https://github.com/yourusername/post-management-system.git
cd post-management-system
```

### **2. Backend Setup**
- a. Install dependencies
Navigate to the backend directory and install the required dependencies.

```bash
cd backend
npm install
```

- b. Setup Database
Make sure you have MySQL installed. Create a new database, e.g., post_management, and run the SQL queries in the schema.sql file to set up the tables.

- c. Configuration
Create a .env file and set the following environment variables for database and JWT key:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=post_management
JWT_SECRET_KEY=your_secret_key
```
- d. Start the Server
Run the following command to start the backend server:

```bash
npm start
Your backend should now be running on http://localhost:3001
```

### **3. Frontend Setup**
- a. Install dependencies
Navigate to the frontend directory and install the required dependencies.

```bash
cd frontend
npm install
```
- b. Start the React Application
Run the following command to start the frontend React app:

```bash
npm start
Your frontend should now be running on http://localhost:3000
```

### **4. Testing the Application**
Once both servers are running:

- Open http://localhost:3000 in your browser.
Sign up with a username, email, password, and a profile picture.
- View a list of posts and individual post details by navigating to /posts and /Page/:id.

### API Endpoints
- POST /signup – User signup with profile picture upload.

- Request: username, email, password, profile_picture
Response: user, auth token
GET /posts – Get a list of all posts.

- Response: Array of posts with id, title, body
GET /posts/:id – Get a specific post by ID.

- Request: id (post ID)
Response: Single post details

## Folder Structure

```bash
post-management-system/
│
├── backend/                  # Backend server with Express.js
│   ├── config/                # Database configuration
│   ├── controllers/           # Routes handlers
│   ├── uploads/               # Profile picture uploads
│   ├── server.js              # Express server entry point
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/        # React components (SignupForm, PostList, etc.)
│   │   ├── App.js             # Main app file with routing
│
└── README.md                  # This file
```

## Contributions

- Name: Yashwant kumar
- Email: yashwant4769@gmail.com
- GitHub: https://github.com/Yash43211234/signup-jwt-bcrypt
