import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './Pages/Form'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/form' element={<Form />} />
      </Routes>
    </>
  )
}

export default App
