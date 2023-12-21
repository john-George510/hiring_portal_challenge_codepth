import React, { useState } from 'react'
import NewJobModal from './NewJobModal'

function Header() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='flex justify-between w-4/5 items-center my-20'>
      <div className='mt-10 flex flex-col gap-5 items-start justify-center text-white'>
          <h1 className='text-5xl font-bold'>Your ideal job awaits, start the search</h1>
          <p className='text-xl'>Get latest job openings that best suits you!</p>
      </div>
      <button onClick={() => setShowModal(true)} className='bg-blue-500 text-white font-bold py-3 px-10 rounded-md mt-10'>Post a job</button>
      <NewJobModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default Header