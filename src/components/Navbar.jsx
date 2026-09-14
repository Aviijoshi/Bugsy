import React from 'react'
import { LuSettings } from "react-icons/lu";
const Navbar = () => {
  return (
    <>
    <div className='navbar'>
        <div className="logo">
            <h3 className='text-3xl font-bold text-[var(--mint)]'> <span>⌬</span> Bugsy</h3>
        </div>
        <div className="links">
            <a href="#" className='active'>Analyze</a>
            <a href="#">Findings</a>
            <a href="#">Projects</a>
            <a href="#">Insights</a>
        </div>
        <div className="right">
            <button className="trans">Copy Report</button>
            <button className="green-btn">Download Code</button>
            <i className='icon'><LuSettings /></i>
        </div>
        
    </div>
    </>
  )
}

export default Navbar
