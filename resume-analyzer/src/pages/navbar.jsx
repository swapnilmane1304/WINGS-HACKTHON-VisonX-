import React, { useState } from 'react'
import './navbar.css'
import ResumeAnalyzer from './resumePage.jsx'
import ResumeUpload from './resumeUpload.jsx'
function navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [show,setShow]=useState(false);
  return (
    <>


    <div  
    className='nav-bar'
    >
    <div className="team-name">
        VisionX
    </div>

    <div className='functional'>
    <button className='navBarX'
    onClick={()=>setShow(false)}
    >
        Home
    </button>
    <button className='navBarX'
    onClick={()=>setShow(true)}
    >
        Analyze resume
    </button>
    </div>
    </div>

    {
        show?(
            <ResumeAnalyzer/>
        ):(
            <ResumeUpload/>
        )
    }
    </>
  )
}

export default navbar;