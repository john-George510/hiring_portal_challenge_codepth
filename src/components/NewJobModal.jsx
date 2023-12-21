import React, { useState } from 'react';
import { db } from '../firebase.config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 

const JobModal = ({ showModal, setShowModal }) => {
  const [postedOn, setPostedOn] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [type, setType] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [jobLink, setJobLink] = useState('');

  const handlePostJob = async () => {
    try {
			const docRef = await addDoc(collection(db, "jobs"), {
        postedOn : serverTimestamp(),
        title,
        company,
        type,
        experience,
        location,
        skills: skills.split(',').map(skill => skill.trim()), // Convert string to array
        jobLink,
      });
  		console.log("Document written with ID: ", docRef.id);
      // Close the modal after posting the job
      setShowModal(false);
    } catch (error) {
      // Handle error
      console.error('Error posting job:', error);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Your icon or image goes here */}
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Post a New Job Listing</h3>
                    <div className="mt-2">
										<div className="mb-4">
											<label htmlFor="postedOn" className="block text-sm font-medium text-gray-700">
												Posted On
											</label>
											<input
												type="date"
												name="postedOn"
												id="postedOn"
												className="mt-1 p-2 w-full border rounded-md"
												onChange={(e) => setPostedOn(e.target.value)}
											/>
										</div>
										<div className="mb-4">
											<label htmlFor="title" className="block text-sm font-medium text-gray-700">
												Job Title
											</label>
											<select
												type="text"
												name="title"
												id="title"
												className="mt-1 p-2 w-full border rounded-md"
												onChange={(e) => setTitle(e.target.value)}
											>
												<option value="" disabled selected>Select Job Title</option>
												<option value="iOS Developer">iOS Developer</option>
												<option value="Frontend Developer">Frontend Developer</option>
												<option value="Backend Developer">Backend Developer</option>
												<option value="Android Developer">Android Developer</option>
												<option value="Developer Advocate">Developer Advocate</option>
											</select>
										</div>
										<div className="mb-4">
											<label htmlFor="company" className="block text-sm font-medium text-gray-700">
												Company
											</label>
											<input
												type="text"
												name="company"
												id="company"
												className="mt-1 p-2 w-full border rounded-md"
												onChange={(e) => setCompany(e.target.value)}
											/>
										</div>
										<div className="mb-4">
											<label htmlFor="type" className="block text-sm font-medium text-gray-700">
												Job Type
											</label>
											<select
												id="type"
												name="type"
												className="mt-1 p-2 w-full border rounded-md"
												onChange={(e) => setType(e.target.value)}
											>
												<option value="" disabled selected>Select Job Type</option>
												<option value="Full time">Full Time</option>
												<option value="Part time">Part Time</option>
												<option value="Contract">Contract</option>
											</select>
										</div>
										<div className="mb-4">
											<label htmlFor="experience" className="block text-sm font-medium text-gray-700">
												Experience Level
											</label>
											<select
												type="text"
												name="experience"
												id="experience"
												className="mt-1 p-2 w-full border rounded-md"
												onChange={(e) => setExperience(e.target.value)}
											>
												<option value="" disabled selected>Select Experience Level</option>
												<option value="Fresher">Fresher</option>
												<option value="Junior Level">Junior Level</option>
												<option value="Mid Level">Mid Level</option>
												<option value="Senior Level">Senior Level</option>
											</select>
										</div>
										<div className="mb-4">
											<label htmlFor="location" className="block text-sm font-medium text-gray-700">
												Location
											</label>
											<select
												type="text"
												name="location"
												id="location"
												className="mt-1 p-2 w-full border rounded-md"
												onChange={(e) => setLocation(e.target.value)}
											>
												<option value="" disabled selected>Select Location</option>
												<option value="Remote">Remote</option>
												<option value="In-office">In-Office</option>
												<option value="Hybrid">Hybrid</option>
											</select>
										</div>
										<div className="mb-4">
											<label htmlFor="skills" className="block text-sm font-medium text-gray-700">
												Skills (comma-separated)
											</label>
											<input
												type="text"
												name="skills"
												id="skills"
												className="mt-1 p-2 w-full border rounded-md"
												onChange={(e) => setSkills(e.target.value)}
											/>
										</div>
										<div className="mb-4">
											<label htmlFor="jobLink" className="block text-sm font-medium text-gray-700">
												Job Link
											</label>
											<input
												type="text"
												name="jobLink"
												id="jobLink"
												className="mt-1 p-2 w-full border rounded-md"
												onChange={(e) => setJobLink(e.target.value)}
											/>
										</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handlePostJob}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Post Job
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobModal;
