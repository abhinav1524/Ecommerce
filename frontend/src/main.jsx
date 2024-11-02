import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer' 
import App from './App.jsx'
import './index.css'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51NxPmTSCzRo3Tfm12xjbQZVjqzVYJ9u4Xt2ziAwSVXfw9TJ0zwptwowVPiNE2ZdzcXWZ27eSiseIzLX1RhkSLmTe00ku8sqeIU');
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <UserProvider>
   <ProductProvider>
    <CartProvider>
      <Router>
        <Header />
        <Elements stripe={stripePromise}>
        <App />
        </Elements>
        <Footer />
      </Router>
      </CartProvider>
      </ProductProvider>
    </UserProvider>
  </StrictMode>,
)
