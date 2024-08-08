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

/**User authentication
 * FEAT-setup auth services - DONE 
 * FEAT-setup registration UI - DONE 
 * DEBUG-signup : User registration fails without any error - FIXED
 * FEAT-signup : setup navigation to modal - DONE
 * FEAT-signup success : reroute to 'Home' - DONE
 * FEAT-signup success : update Header with <Avatar> navigate to User Profile 
 * FEAT-signup success : update Sidebar with Profile and Logout items
 * FEAT-Update Sidebar with conditional render of 'Home', 'Signup', 'Login'-'Profile' 
 * FEAT-setup login UI
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
