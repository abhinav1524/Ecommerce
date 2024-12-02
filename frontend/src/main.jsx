import { StrictMode, useEffect, useState, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { UserProvider, UserContext } from './context/UserContext.jsx'; // Make sure to import UserContext as well
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

function MainApp() {
    const { user } = useContext(UserContext); // Access user from context
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            setIsAdmin(user.role === 'admin'); // Set admin state based on context
        }
    }, [user]); // Re-run effect when `user` changes
    return (
        <StrictMode>
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
        </StrictMode>
    );
}

// Wrap MainApp with UserProvider to make the context available
createRoot(document.getElementById('root')).render(
    <UserProvider>
        <MainApp />
    </UserProvider>
);
