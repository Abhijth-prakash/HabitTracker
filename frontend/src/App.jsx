import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Edit from './pages/Edit'
import Week from './pages/Week'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/habit/:id' element={<Edit></Edit>}></Route>
      <Route path='/habit/weeklyreport' element={<Week></Week>}></Route>

    </Routes>

    </>
  )
}

export default App
