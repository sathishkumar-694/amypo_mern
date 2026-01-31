import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <label>Name</label>
      <input type="text"></input>
      <br></br>
      <label>Age</label>
      <input type="Number"></input>
    </>
  )
}

export default App
