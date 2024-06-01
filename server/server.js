const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection'); // Assuming this file exports a MySQL connection
const cors = require('cors');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');


const app = express();
const PORT = 3001;
const jwtkey = 'your_secret_key';

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Define the destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  }
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Signup route with image upload
app.post('/signup', upload.single('profile_picture'), (req, res) => {
    const { username, email, password } = req.body;
    const profile_picture = req.file ? req.file.filename : ''; // Get filename from uploaded image

    if (!email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Error hashing password' });
        }

        const userData = { username, email, password: hashedPassword, profile_picture };

        connection.query('INSERT INTO users SET ?', userData, (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ message: 'Error inserting data' });
            }
            
            // Generate JWT for the authenticated user
            jwt.sign({ email }, jwtkey, { expiresIn: '10s' }, (error, token) => {
                if (error) {
                    console.error('JWT signing error:', error);
                    return res.status(500).json({ error: 'Error signing JWT.' });
                }

                // Send a single response with user, token, and uploaded image details
                res.json({ user: email, auth: token });
            });
        });
    });
});
const posts = [
  { id: 1, title: 'Post 1', body: 'This is the body of Post 1' },
  { id: 2, title: 'Post 2', body: 'This is the body of Post 2' },
  { id: 3, title: 'Post 3', body: 'This is the body of Post 3' },
  { id: 4, title: 'Post 4', body: 'This is the body of Post 1' },
  { id: 5, title: 'Post 5', body: 'This is the body of Post 2' },
  { id: 6, title: 'Post 6', body: 'This is the body of Post 3' },
  { id: 7, title: 'Post 7', body: 'This is the body of Post 1' },
  { id: 8, title: 'Post 8', body: 'This is the body of Post 2' },
  { id: 9, title: 'Post 9', body: 'This is the body of Post 3' },
  { id: 10, title: 'Post 10', body: 'This is the body of Post 1' },
  { id: 11, title: 'Post 11', body: 'This is the body of Post 2' },
  { id: 12, title: 'Post 12', body: 'This is the body of Post 3' },
  { id: 13, title: 'Post 13', body: 'This is the body of Post 1' },
  { id: 14, title: 'Post 14', body: 'This is the body of Post 2' },
  { id: 15, title: 'Post 15', body: 'This is the body of Post 3' },
  { id: 16, title: 'Post 16', body: 'This is the body of Post 1' },
  { id: 17, title: 'Post 17', body: 'This is the body of Post 2' },
  { id: 18, title: 'Post 18', body: 'This is the body of Post 3' },
  { id: 19, title: 'Post 19', body: 'This is the body of Post 1' },
  { id: 20, title: 'Post 20', body: 'This is the body of Post 2' },
  { id: 21, title: 'Post 21', body: 'This is the body of Post 3' },
  { id: 22, title: 'Post 22', body: 'This is the body of Post 1' },
  { id: 23, title: 'Post 23', body: 'This is the body of Post 2' },
  { id: 24, title: 'Post 24', body: 'This is the body of Post 3' },
  { id: 25, title: 'Post 25', body: 'This is the body of Post 1' },
  { id: 26, title: 'Post 26', body: 'This is the body of Post 2' },
  { id: 27, title: 'Post 27', body: 'This is the body of Post 3' },
  { id: 28, title: 'Post 28', body: 'This is the body of Post 1' },
  { id: 29, title: 'Post 29', body: 'This is the body of Post 2' },
  { id: 30, title: 'Post 30', body: 'This is the body of Post 3' },
  { id: 31, title: 'Post 31', body: 'This is the body of Post 1' },
  { id: 32, title: 'Post 32', body: 'This is the body of Post 2' },
  { id: 33, title: 'Post 33', body: 'This is the body of Post 3' },
  { id: 34, title: 'Post 34', body: 'This is the body of Post 1' },
  { id: 35, title: 'Post 35', body: 'This is the body of Post 2' },
  { id: 36, title: 'Post 36', body: 'This is the body of Post 3' },
  // Add more posts here
];


app.get('/posts', (req, res) => {
  res.json(posts);
});

app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id); 

    const post = posts.find(post => post.id === postId);
  
    if (!post) {
      // If no post found with the provided ID
      res.status(404).json({ error: 'Post not found' });
    } else {
      // If post found, return it
      res.json(post);
      console,log(post);
    }
  });




// Port setup
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
