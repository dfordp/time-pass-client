import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = Cookies.get('Authorization');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, { email, password });
      Cookies.set('Authorization', response.data.token);
      localStorage.setItem('userId', response.data.newUser._id);
      navigate('/');
    } catch (error) {
      console.error('An error occurred while trying to sign up:', error);
    }
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex flex-col justify-center">
      <div className="flex flex-row justify-center">
        <div className="bg-white w-[500px] h-[650px] rounded-lg">
            <h3 className="scroll-m-20 text-2xl font-bold tracking-tight flex flex-row justify-center mt-8">
                to-do list
            </h3>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-8 mt-8">
                Signup
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
                <div className="font-semibold mt-4">
                    Confirm Password
                </div>
                <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full h-[35px] mt-2 rounded-md outline outline-2"/>
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "Hide" : "Show"} Confirm Password</button>
                <div className="flex flex-row justify-center">
                    <button type="submit" className="bg-black text-white rounded-lg px-3 py-1 mt-8">Submit</button>
                </div>
                <div className="flex flex-row justify-center font-semibold py-2">
                    <Link to="/signin">Already an active user?</Link>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;