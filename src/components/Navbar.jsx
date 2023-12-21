import React from 'react';
import { auth } from '../firebase.config'; // Adjust the path as needed

function Navbar() {
  return (
    <div className='h-20 absolute top-0 w-full flex items-center'>
      <h2 className='text-4xl font-bold text-white pl-20'>JobVista</h2>
      <div className="ml-auto pr-20 text-white">
        {auth.currentUser ? (
          <p>Welcome, {auth.currentUser.email}!</p>
        ) : (
          <p>Please <a href="/login" className="underline">login</a>.</p>
        )}
      </div>
    </div>
  );
}

export default Navbar;
