import React, { useEffect, useState } from 'react'

function SearchBar(props) {
	const [filter, setFilter] = useState(false);
	const intialJobCriteria = {
		title: "",
		location: "",
		experience: "",
		type:""
	}
	const [jobCriteria, setJobCriteria] = useState(intialJobCriteria)

	const handleChange = (e) => {
			setJobCriteria((prevState) => ({
					...prevState,
					[e.target.name]: e.target.value
			}))
	}

	const clearFilters = () => {
		setFilter(false);
		setJobCriteria(intialJobCriteria);
		props.fetchJobs();
	}

	const search = async() => {
			setFilter(true);
			await props.fetchFilteredJobs(jobCriteria);
	}
		
	return (
		<div className='flex gap-4 my-10 justify-center px-10 w-full'>
			<select onChange={handleChange} name="title" value={jobCriteria.title} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
				<option value="" disabled hidden>Job Role</option>
				<option value="iOS Developer">iOS Developer</option>
				<option value="Frontend Developer">Frontend Developer</option>
				<option value="Backend Developer">Backend Developer</option>
				<option value="Android Developer">Android Developer</option>
				<option value="Developer Advocate">Developer Advocate</option>
			</select>
			<select onChange={handleChange} name="type" value={jobCriteria.type} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
				<option value="" disabled hidden>Job Type</option>
				<option value="Full time">Full Time</option>
				<option value="Part time">Part Time</option>
				<option value="Contract">Contract</option>
			</select>
			<select onChange={handleChange} name="location" value={jobCriteria.location} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
				<option value="" disabled hidden>Location</option>
				<option value="Remote">Remote</option>
				<option value="In-office">In-Office</option>
				<option value="Hybrid">Hybrid</option>
			</select>
			<select onChange={handleChange} name="experience" value={jobCriteria.experience} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
				<option value="" disabled hidden>Experience</option>
				<option value="Fresher">Fresher</option>
				<option value="Junior Level">Junior Level</option>
				<option value="Mid Level">Mid Level</option>
				<option value="Senior Level">Senior Level</option>
			</select>
			<button onClick={search} className='w-64 bg-blue-500 text-white font-bold py-3 rounded-md'>Search</button>
			{filter && 
				<button onClick={clearFilters} className="flex">
					<p className="bg-blue-500 px-10 py-2 rounded-md text-white">Clear Filters</p>
				</button>
			}
		</div>
  )
}

export default SearchBar