import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { db } from './firebase.config';
import { collection, getDocs, query, where } from "firebase/firestore";
import Navbar from './components/Navbar';

const JobApplicationsPage = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const q = query(collection(db, "applications"), where("jobId", "==", jobId));
				const querySnapshot = await getDocs(q);
				const applicationsData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

        setApplications(applicationsData);
      } catch (error) {
        console.error('Error fetching applications:', error);
        // Handle error, show error message, etc.
      }
    };

    fetchApplications();
  }, [jobId]);

  return (
    <>
    	<Navbar />
			<div className="mt-20 w-4/5 mx-auto flex flex-col items-center gap-8">
				<h2 className="text-4xl font-bold mb-4">Job Applications</h2>
					{applications.length > 0 ? 
					(<ul className="flex flex-col w-1/2 gap-5">
							{applications.map((application) => (
								<li key={application.id} className="bg-white bg-opacity-25 p-6 rounded-lg shadow-md backdrop-filter backdrop-blur-lg flex flex-col items-center justify-center">
									<h3 className="text-2xl font-semibold mb-2">{application.name}</h3>
									<p className="text-lg text-gray-600 mb-2">Email: {application.email}</p>
									<a href={application.resume} className="underline text-lg text-gray-600 mb-2"  target="_blank" rel="noopener noreferrer" >View Resume</a>
								</li>
							))}
						</ul>) : (<p>No applications available.</p>)}
			</div>
    </>
  );
};

export default JobApplicationsPage;
