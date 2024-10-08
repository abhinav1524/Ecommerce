import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Index from "./pages/Index"
import SignIn from "./pages/SignIn"
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
import About from './pages/About'
import Shoping from './pages/Shoping'
import SingleProduct from './pages/SingleProduct'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    {/* <Index/> */}
    {/* <Contact/> */}
    {/* <About/> */}
    {/* <SignUp/> */}
    <Shoping/>
    {/* <SingleProduct/> */}
     <Footer/>
    </>
  )
}

export default App
