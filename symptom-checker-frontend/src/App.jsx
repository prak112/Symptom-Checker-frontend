// imports
//import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SymptomForm from './components/SymptomForm'
import Diagnosis from './components/Diagnosis'
import Footer from './components/Footer'

import Home from './pages/Home'
import Profile from './pages/Profile'
import FAQ from './pages/Faqs'

import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'


// top level component
function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }
//      <SymptomForm />

  return (
    <div>
      <Header toggleDrawer={toggleDrawer} />
      <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer}/> 
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faqs" element={<FAQ />}/>
        <Route path="/logout" element={<Home />} />
      </Routes>
      <Diagnosis />
        <Footer />
    </div>  
  )
}

export default App
