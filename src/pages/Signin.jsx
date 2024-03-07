import axios from 'axios';
import  { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const Signin = () => {
    
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);



  useEffect(() => {
    const token = Cookies.get('Authorization');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password });
      Cookies.set('Authorization', response.data.token);
      localStorage.setItem('userId', response.data.user._id);
      navigate('/');
    } catch (error) {
      console.error('An error occurred while trying to log in:', error);
    }
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex flex-col justify-center">
      <div className="flex flex-row justify-center">
        <div className="bg-white w-[400px] h-[500px] rounded-lg">
            <h3 className="scroll-m-20 text-2xl font-bold tracking-tight flex flex-row justify-center mt-8">
                to-do list
            </h3>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-8 mt-8">
                Login
            </h4>
            <form onSubmit={handleSubmit} className="my-4 mx-8">
                <div className="font-semibold">
                    Email
                </div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-[35px] rounded-md outline outline-2"/>
                <div className="font-semibold mt-4">
                    Password
                </div>
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-[35px] mt-2 rounded-md outline outline-2"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"} Password</button>
                <div className="flex flex-row justify-center">
                    <button type="submit" className="bg-black text-white rounded-lg px-3 py-1 mt-8">Submit</button>
                </div>
                <div className="flex flex-row justify-center font-semibold py-2">
                    <Link to="/signup">New to the website?</Link>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Signin;