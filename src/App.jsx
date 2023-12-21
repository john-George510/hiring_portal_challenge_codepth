import Header from "./components/Header"
import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import JobCard from "./components/JobCard"
import { useState, useEffect } from "react"
import { collection, query, where, orderBy, getDocs } from "firebase/firestore"
import { db } from "./firebase.config"

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState(false);
  const [clearFilter, setClearFilter] = useState(false);

  const fetchJobs = async() => {
    setClearFilter(true);
    setFilter(false);
    const jobsRef = query(collection(db, "jobs"));
    const q = query(jobsRef, orderBy("postedOn", "desc"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      postedOn: doc.data().postedOn.toDate(),
    }))
    setJobs(data)
  }

  const fetchFilteredJobs = async(jobCriteria) => {
    console.log(jobCriteria);
    setFilter(true);
    let jobsRef = collection(db, "jobs");

    if (jobCriteria.type) jobsRef = query(jobsRef, where("type","==", jobCriteria.type));
    if (jobCriteria.title) jobsRef = query(jobsRef, where("title","==", jobCriteria.title));
    if (jobCriteria.location) jobsRef = query(jobsRef, where("location","==", jobCriteria.location));
    if (jobCriteria.experience) jobsRef = query(jobsRef, where("experience","==", jobCriteria.experience));

    jobsRef = query(jobsRef, orderBy("postedOn", "desc"));

    const q = jobsRef;
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      postedOn: doc.data().postedOn.toDate(),
    }))
    console.log(data);
    setJobs(data)
  }
  useEffect(() => {
    fetchJobs();
  }, [])
  return (
    <div className="flex flex-col items-center pb-10">
      <Navbar />
      <Header />
      <SearchBar fetchFilteredJobs={fetchFilteredJobs} fetchJobs={fetchJobs} clearFilters={clearFilter}/>
      {jobs.map((job)=> (
        <JobCard key={job.id} {...job}/>
      ))}
    </div>

  )
}

export default App
