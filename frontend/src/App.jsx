import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ResumeAnalyzer from './resumePage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ResumeAnalyzer/>
    </>
  )
}

export default App
