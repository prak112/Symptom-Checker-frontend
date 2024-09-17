// react
import React from 'react'
import ReactDOM from 'react-dom/client'
// components
import App from './App.jsx'
import Footer from './components/Footer.jsx'
// styles
import './App.css'
// Router
import { BrowserRouter as Router } from 'react-router-dom'
// Context Providers
import { AuthenticationProvider } from './contexts/AuthenticationContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import { AlertProvider } from './contexts/AlertContext.jsx'
// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <UserProvider>
        <AlertProvider>
          <AuthenticationProvider>
            <App />
            <Footer />
          </AuthenticationProvider>
        </AlertProvider>
      </UserProvider>
    </React.StrictMode>
  </Router>
)
