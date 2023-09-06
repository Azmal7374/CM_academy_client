import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';

const MyBlogs = () => {
    const { user } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const userEmail = user?.email;

    useEffect(() => {
        // Fetch all blogs from your server
        fetch('http://localhost:5000/all-blog')
            .then((response) => response.json())
            .then((data) => {
                // Filter blogs based on the user's email
                const filteredBlogs = data.filter((blog) => blog.email === userEmail);
                setBlogs(filteredBlogs);
            })
            .catch((error) => {
                console.error('Error fetching blogs:', error);
            });
    }, [userEmail]);

    return (
        <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
            {blogs.map((blog, index) => (
                <Link to={`/blog-details/${blog._id}`} key={index}>
                    <div className="bg-white rounded-lg shadow-md p-4 transform transition duration-300 hover:shadow-lg">
                        <div className="relative h-52 mb-4 overflow-hidden rounded-md hover:scale-105">
                            <img
                                src={blog.blogImage}
                                alt={blog.blogTitle}
                                className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">{blog.blogTitle}</h2>
                            <p className="text-gray-600 mb-4 text-lg">
                                {blog.blogDetails.slice(0, 130)}...
                                <span className="text-blue-600 font-bold ml-2 text-lg">Read More</span>
                            </p>
                            <div className="flex justify-between items-center text-gray-400 text-sm">
                                <p>{new Date(blog.blogDate).toLocaleDateString()}</p>
                                <p className="font-semibold">{blog.blogAuthor}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default MyBlogs;
