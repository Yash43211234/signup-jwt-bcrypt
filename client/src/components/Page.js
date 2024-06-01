import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Page = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5); // Number of posts per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/posts/${id}`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [id]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) {
        return <p>Loading...</p>; 
    }
    
    if (error) {
        return <p>{error}</p>;
    }
    
    return (
        <div className="post-list-container">
            <h1 className="post-list-title">Post List</h1>
            <div className="post-list">
                {currentPosts.map(post => (
                    <div key={post.id} className="post-item">
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-body">{post.body}</p>
                        <Link to={`/posts/${post.id}`} className='m-btn'>View</Link>
                    </div>
                ))}
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
            <style>
                {/* Styles for post list */}
            </style>
        </div>
    );
}

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Page;
