import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import {  BrowserRouter as Router } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthenticationProvider } from './contexts/AuthenticationContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import { AlertProvider } from './contexts/AlertContext.jsx'
import Footer from './components/Footer.jsx'


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
