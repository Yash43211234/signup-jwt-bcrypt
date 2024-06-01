// PostList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  return (
    <div className="post-list-container">
    <h1 className="post-list-title">Post List</h1>
    {loading ? (
      <p className="post-list-loading">Loading...</p>
    ) : (
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
            <Link to={`/posts/${post.id}`} className='m-btn'>View</Link>
          </div>
        ))}
      </div>
    )}
    <style>
      {
        `
        .post-list-container {
          margin: 0 auto;
          padding: 20px;
          max-width: 800px;
        }
        
        .post-list-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        
        .post-list-loading {
          color: gray;
        }
        
        .post-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .post-item {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .post-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        
        .post-body {
          font-size: 16px;
          color: #333;
        }
        
        `
      }
    </style>
  </div>
  );
};

export default PostList;
