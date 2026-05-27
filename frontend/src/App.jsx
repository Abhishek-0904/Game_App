import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Bank from '../pages/bank'
import Upi from '../pages/upi'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Bank />} />
          <Route path="/upi" element={<Upi />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
