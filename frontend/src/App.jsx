import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Edit from './pages/Edit'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/habit/:id' element={<Edit></Edit>}></Route>
    </Routes>

    </>
  )
}

export default App
