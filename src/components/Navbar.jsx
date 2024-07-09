import React from 'react'

const Navbar = () => {
  return (
   <>
   <div className="main  bg-slate-500 flex justify-between p-2 ">
    <div className="logo">
        <span className='font-bold text-xl'>iTASK</span>
    </div>
    <ul className="flex flex-row gap-10 ">
        <li>Home</li>
        <li>About</li>
        <li>Contact Us</li>
    </ul>
   </div>
   
   
   </>
  )
}

export default Navbar