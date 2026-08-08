import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Edit from './pages/Edit'
import Week from './pages/Week'
import Register from './pages/Register'

function App() {

  return (
    <div className="min-h-screen bg-[#09090F] text-white relative overflow-x-hidden">
      {/* Ambient background glow accents */}
      <div className="pointer-events-none fixed top-[-100px] left-1/4 w-[600px] h-[600px] bg-[#7C3AED]/12 rounded-full blur-[140px]" />
      <div className="pointer-events-none fixed bottom-[10%] right-[10%] w-[500px] h-[500px] bg-[#A855F7]/8 rounded-full blur-[140px]" />

      <Routes>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/habit/:id' element={<Edit></Edit>}></Route>
        <Route path='/habit/weeklyreport' element={<Week></Week>}></Route>


        <Route path='/' element={<Register></Register>}></Route>
        
      </Routes>
    </div>
  )
}

export default App
