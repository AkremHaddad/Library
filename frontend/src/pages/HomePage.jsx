import React from 'react';
import { Link } from 'react-router'; // If using React Router

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-300 rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold text-primary font-mono tracking-tight mb-5">Welcome to your Library</h1>
        
        <Link to="/mylist">
          <button className="btn btn-primary">View My List</button>
        </Link>

        {/* Optional: Add more content or features */}
        <div className="mt-8 text-gray-400">
          <p>Discover and manage your items with ease.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;