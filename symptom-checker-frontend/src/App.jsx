// imports
//import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

import Home from './pages/Home'
import SignupModal from './components/modals/SignupModal'
import FAQ from './pages/Faqs'

import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'


// top level component
function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  // handle sidebar
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div>
      <Header toggleDrawer={toggleDrawer} />
      <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer}/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<ModalWrapper />} />{/*if user not authorized*/}
        <Route path="/faqs" element={<FAQ />}/>
        <Route path="/logout" element={<Home />} />
      </Routes>
      <Footer />
    </div>  
  )
}

/**TO DO :
 * FEAT-Services : setup auth services - DONE 
 * FEAT-Signup : setup registration UI - DONE 
 * DEBUG-Signup : User registration fails without any error - FIXED
 * FEAT-Signup : setup navigation to modal - DONE
 * FEAT-Signup : reroute to 'Home' after signup success - DONE
 * FEAT-Header : update Header with <Avatar> navigate to User Profile 
 * FEAT-Signup : update Sidebar with Profile and Logout items
 * FEAT-Sidebar : Update Sidebar with conditional render of 'Home', 'Signup', 'Login'-'Profile' 
 * FEAT-Login : setup login UI
 * DEBUG-Diagnosis : Long texts in 'Detail' column are converted to NaN
 * FEAT-Diagnosis : Symptom form input validation and sanitization
 * FEAT-Diagnosis : Understand and build Triage system logic
**/

// Handler for Modals
function ModalWrapper() {
  const location = useLocation()
  const navigate = useNavigate()

  const returnHome = () => navigate('/')

  return(
    <>
        <SignupModal 
          modalTitle='Sign Up!' 
          open={location.pathname==='/signup'}
          handleClose={returnHome}
        />
    </>
  )

}

export default App
