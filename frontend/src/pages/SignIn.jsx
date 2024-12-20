import React, { useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { Link } from 'react-router-dom';
const SignIn = () => {
    const { login} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {getitemsandcount } = useCart();
  
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);        
        try {
            const response = await fetch('https://ecommerce-kj7x.onrender.com/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }), 
            });
    
            const data = await response.json(); 
            // console.log(data); // Ensure this contains a token
            
            if (!response.ok) {
                // If the login fails, handle the error message returned from the server
                if (data.message) {
                    alert(data.message); // Alert the message received from the server
                } else {
                    alert("Login failed. Please try again."); // General error message
                }
                setLoading(false);
                return; // Exit the function early
            }
    
            // Now, check if the user is blocked
            if (data.user.isBlocked) {
                alert("Your account is blocked by admin. Contact the site owner to unblock your account.");
                setLoading(false);
                return; // Exit the function early
            }

            if (response.ok) {
                // Save user data in context and localStorage
                login(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                // Store the JWT token in local storage
                const token = data.token; // Ensure your server sends the token
                localStorage.setItem('jwt', token);
                // console.log("Token stored:", token);
                // Redirect based on user role
                // console.log(data.user.role);
                getitemsandcount();
                if (data.user.role === 'admin') {
                    navigate('/admin');
                }else {
                        navigate('/');
                }
                setLoading(false);
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setLoading(false);
        }
    }; 
  return (
    <>
    <section className="bg-white mt-10 lg:mt-0">
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in to Celebration</h2>
                <form onSubmit={handleLogin} className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="" className="text-base font-medium text-gray-900"> Email address </label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter email to get started"
                                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="" className="text-base font-medium text-gray-900"> Password </label>

                                <a href="#" title="" className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700"> Forgot password? </a>
                            </div>
                            <div className="mt-2.5">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">Log in</button>
                        </div>
                    </div>
                </form>

                <div className="mt-3 space-y-3">
                    <button
                        type="button"
                        className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                    >
                        <div className="absolute inset-y-0 left-0 p-4">
                            <svg className="w-6 h-6 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                                ></path>
                            </svg>
                        </div>
                        Sign in with Google
                    </button>

                    <button
                        type="button"
                        className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                        disabled={loading} // Disable button when loading
                    >
                        <div className="absolute inset-y-0 left-0 p-4">
                            <svg className="w-6 h-6 text-[#2563EB]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                            </svg>
                        </div>
                        Sign in with Facebook
                    </button>
                    <p className="mt-2 text-base text-gray-600">Don’t have an account? <Link to="/signup" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">Create a free account</Link></p>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
            <div>
                <img className="w-full mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png" alt="" />

                <div className="w-full max-w-md mx-auto xl:max-w-xl">
                    <h3 className="text-2xl font-bold text-center text-black">Design your own card</h3>
                    <p className="leading-relaxed text-center text-gray-500 mt-2.5">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>

                    <div className="flex items-center justify-center mt-10 space-x-3">
                        <div className="bg-orange-500 rounded-full w-20 h-1.5"></div>

                        <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>

                        <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
                    </div>
                </div>
            </div>
        </div>
        {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
            )}
    </div>
</section>
    </>
  )
}

export default SignIn
