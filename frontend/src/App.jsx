import { Routes, Route ,Navigate } from 'react-router-dom'; 
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
import Success from './pages/OrderPlacedMessage';
import UserManagement from './admin/pages/UserManagement';
import CategoryManagement from './admin/pages/CategoryManagement';
import OrderManagement from './admin/pages/OrderManagement';
import ProductManagement from './admin/pages/ProductManagement';
function App() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const isAdmin = storedUser?.role === 'admin';
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
      <Route path="/admin" element={isAdmin?<AdminDashboard />:<Navigate to="/signin" replace/>}/>
      <Route path="/products-management" element={isAdmin?<ProductManagement />:<Navigate to="/signin" replace/>}/>
      <Route path="/orders-management" element={isAdmin?<OrderManagement />:<Navigate to="/signin" replace/>}/>
      <Route path="/categories-management" element={isAdmin?<CategoryManagement />:<Navigate to="/signin" replace/>}/>
      <Route path="/users-management" element={isAdmin?<UserManagement />:<Navigate to="/signin" replace/>}/>
    </Routes>
  )
}

export default App
