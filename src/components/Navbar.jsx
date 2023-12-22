import React, { useState, useEffect } from 'react';
import { auth } from '../firebase.config'; // Adjust the path as needed
import { Link } from 'react-router-dom';
import { db } from '../firebase.config';
import { collection, getDocs, query, where } from "firebase/firestore";

function Navbar() {
  const [jobId, setJobId] = useState('');

  useEffect(() => {
    const fetchJobId = async () => {
      if (!auth.currentUser) return;
      try {
        const q = query(collection(db, "jobs"), where("postedBy", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setJobId(data[0].id);
      } catch (error) {
        console.error('Error fetching job ID:', error);
      }
    };

    fetchJobId();
  }, [auth.currentUser]);

  return (
    <div className='h-20 absolute top-0 w-full flex items-center'>
      <a href='/' className='text-4xl font-bold text-white pl-20'>JobVista</a>
      <div className="ml-auto pr-20 text-white">
        {auth.currentUser ? (
          <div className='flex gap-6'>
            <p>Welcome, {auth.currentUser.email}!</p>
            <Link to={`/job/${jobId}/applications`} className="underline">View My Jobs</Link>
          </div>
        ) : (
          <p>Please <a href="/login" className="underline">login</a>.</p>
        )}
      </div>
    </div>
  );
}

export default Navbar;
