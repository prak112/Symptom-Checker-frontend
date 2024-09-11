// imports
// context
import { UserProvider } from './contexts/UserContext'
import { AlertProvider } from './contexts/AlertContext'
import { AuthenticationProvider } from './contexts/AuthenticationContext'
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
import AuthenticationPrompt from './components/modals/AuthenticationPrompt'


/* REFACTOR <Diagnosis />
TO-DOs:
=======
- Set returnSymptomForm prop in <Home />
- FEATURE: Show pain location in 2D-body image 
*/


/**
 * The main component of the application.
 *
 * @returns {JSX.Element} The rendered App component.
 */
export default function App() {
  // styles
  const mainDivStyle = {
    minHeight: 'calc(100vh - 16vh)',
  }

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(true)

  // handle sidebar
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  // handle Authentication Prompt close event
  const handleAuthPromptClose = () => {
    setIsAuthPromptOpen(false)
  }

  return (
    <AlertProvider>
      <UserProvider>
        <AuthenticationProvider>
          <div style={mainDivStyle}>
            <Header toggleDrawer={toggleDrawer}  />
            <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} /> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<ModalWrapper />} /> {/* user not authorized*/}
              <Route path="/faqs" element={<FAQ />}/>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/auth?public=logout" element={<ModalWrapper />} /> {/* user authorized */} 
            </Routes>
          </div>
          <Footer />
          <AuthenticationPrompt open={isAuthPromptOpen} handleClose={handleAuthPromptClose}/>
          </AuthenticationProvider>
      </UserProvider>
    </AlertProvider>
  )
}

/**
 * Renders a modal based on the query parameter 'public' in the URL.
 * @returns {JSX.Element} The rendered modal component.
 */
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
  else if(queryType === 'signup') { 
    return(
      <SignupModal 
        open={location.pathname === '/auth'}
        handleClose={returnHome}
    />
    )
  }   
}