import { useState } from 'react'

import ResumeUpload from './pages/resumeUpload.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ResumeUpload/>
    </>
  )
}

export default App
