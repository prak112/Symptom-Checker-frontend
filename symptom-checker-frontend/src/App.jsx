// imports
// context
import { UserProvider } from './contexts/UserContext'
// components
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
// modals
import SignupModal from './components/modals/Signup'
import LoginModal from './components/modals/Login'
import LogoutModal from './components/modals/Logout'
// pages
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import FAQ from './pages/Faqs'
// react
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'


// top level component
export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  // handle sidebar
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <UserProvider>
      <div>
        <Header toggleDrawer={toggleDrawer}  />
        <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<ModalWrapper />} /> {/* user not authorized*/}
          <Route path="/faqs" element={<FAQ />}/>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/auth?public=logout" element={<ModalWrapper />} /> {/* user authorized */} 
        </Routes>
        <Footer />
      </div> 
    </UserProvider>
  )
}

/**TO DO - Client Side Routing (CSR):
 * FEAT-Login Validation : Throw login error on invalid credentials
 * DEBUG-Diagnosis : Long texts in 'Detail' column are converted to NaN 
 * FEAT-Diagnosis : Symptom form input validation and sanitization
 * FEAT-Diagnosis : Understand and build Triage system logic
**/


// Handler for Modals
function ModalWrapper() {
  const location = useLocation()
  const navigate = useNavigate()

  const returnHome = () => navigate('/')
  // Extract query parameter
  const queryParams = new URLSearchParams(location.search)
  const queryType = queryParams.get('public')
  
  if(queryType === 'login'){
    return(
      <LoginModal
      open={location.pathname === '/auth'}
      handleClose={returnHome} 
    />)
  }
  else if(queryType === 'logout') {
    return(
      <LogoutModal
      open={location.pathname === '/auth'}
      handleClose={returnHome}
    />
    )
  }
  else {  // signup if neither
    return(
      <SignupModal 
        open={location.pathname === '/auth'}
        handleClose={returnHome}
    />
    )
  }   
}