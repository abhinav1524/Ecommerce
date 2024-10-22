import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer' 
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <UserProvider>
      <Router>
        <Header />
        <App />
        <Footer />
      </Router>
    </UserProvider>
  </StrictMode>,
)
