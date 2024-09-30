// imports
// context
import { SubmitFormProvider } from './contexts/SubmitFormContext.jsx'
import { AuthenticationContext } from './contexts/AuthenticationContext'
// components
import Header from './components/Header'
import Sidebar from './components/Sidebar'
// import Footer from './components/Footer'
// modals
import SignupModal from './components/modals/Signup'
import LoginModal from './components/modals/Login'
import LogoutModal from './components/modals/Logout'
import AuthenticationPrompt from './components/modals/AuthenticationPrompt'
// pages
import Home from './pages/Home'
import UserHistory from './pages/UserHistory'
import UserProfile from './pages/UserProfile'
import FAQ from './pages/Faqs'
// react
import { useCallback, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import DisplayDiagnosis from './components/DisplayDiagnosis.jsx'


/**
 * The main component of the application.
 *
 * @returns {JSX.Element} The rendered App component.
 */
export default function App() {
  // styles
  const mainDivStyle = {
    minHeight: 'calc(100vh - 14vh)',
  }

  // setup state and context
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [authPromptOpen, setAuthPromptOpen] = useState(true)
  const { isAuthenticated } = useContext(AuthenticationContext)

  // handle sidebar
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  // by default, push user to authenticate before using the service
  const verifyUserAuth = useCallback(() => {
    setAuthPromptOpen(!isAuthenticated)
  }, [isAuthenticated])

  // monitor state changes of isAuthenticated
  useEffect(() => {
    verifyUserAuth()
  }, [isAuthenticated, verifyUserAuth])


  return (
    <div style={mainDivStyle}>
      <Header toggleDrawer={toggleDrawer}  />
      <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} /> 
      <SubmitFormProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosis" element={<DisplayDiagnosis />} />  {/* To Be Implemented */}
        <Route path="/history" element={<UserHistory />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/faqs" element={<FAQ />}/>
        <Route path="/auth" element={<ModalWrapper />} /> {/* user not authorized*/}
        <Route path="/auth?public=logout" element={<ModalWrapper />} /> {/* user authorized */} 
      </Routes>
      </SubmitFormProvider> 
      <AuthenticationPrompt open={authPromptOpen} handleClose={verifyUserAuth}/>
    </div>
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
  else { 
    return(
      <SignupModal 
        open={location.pathname === '/auth'}
        handleClose={returnHome}
    />
    )
  }   
}