import React,{ useState} from 'react';
import { storage } from '../firebase.config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../firebase.config';

function ApplyJobModal({showModal, setShowModal, job}) {
	const [name, setName] = useState('');
	const [resume, setResume] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const storageRef = ref(storage, `resumes/${name}_${job.id}_${resume.name}`);
			const uploadTask = uploadBytesResumable(storageRef, resume);
			uploadTask.on('state_changed', 
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
				}, 
				(error) => {
					console.log(error);
				}, 
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						console.log('File available at', downloadURL);
						console.log(job);
						addDoc(collection(db, "applications"), {
							name,
							email,
							resume: downloadURL,
							jobId: job.id,
							createdAt: serverTimestamp(),
						});
					});
				}
			);
			setName('');
			setEmail('');
			setResume('');
			setShowModal(false);
		} catch (error) {
			console.error('Error posting job:', error);
		}
	}

  return (
		<>
			{showModal && (
				<div className="mt-3 text-center sm:text-left bg-zinc-200 w-full rounded-md p-4">
				<h3 className="text-lg leading-6 font-medium text-gray-900">Apply for a Job</h3>
				<div className="mt-2 flex gap-5">
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
							<input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500  shadow-sm sm:text-sm border-gray-300 rounded-md" required />
						</div>
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
							<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md" required />
						</div>
						<div className="mb-4">
							<label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
							<input type="file" onChange={(e) => setResume(e.target.files[0])} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
						</div>
						<div className='flex gap-4'>
						<button type="submit" className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Apply
						</button>
						<button onClick={() => setShowModal(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
							Close
						</button>
						</div>
					</form>
					
				</div>
			</div>				
			)}
		</>
  )
}

export default ApplyJobModal