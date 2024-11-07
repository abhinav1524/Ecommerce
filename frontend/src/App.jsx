import { Routes, Route } from 'react-router-dom'; 
import Index from "./pages/Index"
import SignIn from "./pages/SignIn"
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
import About from './pages/About'
import Shoping from './pages/Shoping'
import SingleProduct from './pages/SingleProduct'
import AddToCart from './pages/AddToCart'
import CheckOut from './pages/CheckOut'
import OrderPlacedMessage from './pages/OrderPlacedMessage'
import AdminDashboard from './admin/AdminDashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './middleware/ProtectedRoute';
import PaymentForm from './pages/PaymentForm';
import Cancel from './pages/Cancel';
import Success from './pages/success';
import UserManagement from './admin/pages/UserManagement';
import CategoryManagement from './admin/pages/CategoryManagement';
import OrderManagement from './admin/pages/OrderManagement';
import ProductManagement from './admin/pages/ProductManagement';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shoping />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/cart" element={<AddToCart />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/order-placed" element={<OrderPlacedMessage />} />
      <Route path="/payment" element={<PaymentForm />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
      {/* Add more routes as needed */}
      <Route path="/admin" element={<AdminDashboard/>} />
      <Route path="/products-management" element={<ProductManagement/>} />
      <Route path="/orders-management" element={<OrderManagement/>} />
      <Route path="/categories-management" element={<CategoryManagement/>} />
      <Route path="/users-management" element={<UserManagement/>} />
    </Routes>
  )
}

export default App
