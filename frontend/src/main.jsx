import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from './context/UserContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminHeader from './admin/components/Header.jsx';
import AdminFooter from './admin/components/Footer.jsx';
import App from './App.jsx';
import './index.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NxPmTSCzRo3Tfm12xjbQZVjqzVYJ9u4Xt2ziAwSVXfw9TJ0zwptwowVPiNE2ZdzcXWZ27eSiseIzLX1RhkSLmTe00ku8sqeIU');

// Create a functional component for the main app structure
function MainApp() {
    const [isAdmin, setIsAdmin] = useState(false);

    // Check for admin role on mount
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 'admin') {
            setIsAdmin(true);
        }
    }, []);

    return (
        <StrictMode>
            <UserProvider>
                <ProductProvider>
                    <CartProvider>
                        <Router>
                            {isAdmin ? <AdminHeader /> : <Header />}
                            <Elements stripe={stripePromise}>
                                <App />
                            </Elements>
                            {isAdmin ? <AdminFooter /> : <Footer />}
                        </Router>
                    </CartProvider>
                </ProductProvider>
            </UserProvider>
        </StrictMode>
    );
}

createRoot(document.getElementById('root')).render(<MainApp />);
