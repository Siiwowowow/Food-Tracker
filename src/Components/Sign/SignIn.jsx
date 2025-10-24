import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const { signInUser, signInWithGoogle, setUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Email Sign-In
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);
      const user = result.user;

      setUser(user);
      toast.success('Signed in successfully!');

      // send login email notification (optional)
      await axios.get(`https://foodtracker-server-2.onrender.com/send-login-email?email=${user.email}`);

      navigate(from);
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Sign-in failed');
    }

    form.reset();
    setPassword('');
  };

  // Google Sign-In
  const handleSignInWithGoogle = async () => {
    try {
      const res = await signInWithGoogle();
      const user = res.user;

      setUser(user);
      toast.success('Signed in with Google!');
      await axios.get(`https://foodtracker-server-2.onrender.com/send-login-email?email=${user.email}`);

      navigate(from);
    } catch (err) {
      console.error(err);
      toast.error('Google Sign-in failed');
    }
  };

  return (
    <div className="w-11/12 m-3 mx-auto p-8 space-y-3 rounded-xl bg-base-200 shadow-xl text-base-400">
      <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
      <p className="text-sm font-light text-center">Sign in to your FreshTracker account</p>

      <form onSubmit={handleSignIn} className="space-y-6">
        {/* Email */}
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block">Email</label>
          <div className="relative text-gray-500">
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full px-10 py-3 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#129990]"
            />
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1 text-sm relative">
          <label htmlFor="password" className="block">Password</label>
          <div className="relative text-gray-500">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            <input
              required
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-3 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#129990]"
            />
          </div>
          <div
            className="absolute right-3 top-10 cursor-pointer text-gray-600 "
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
          <div className="flex justify-end text-xs text-base-400 mt-1">
            <Link to="/forgot-password" className="underline text-[#129990] ml-1">Forgot Password?</Link>
          </div>
        </div>

        <button
          className="block w-full p-3 text-center rounded-sm cursor-pointer text-white bg-[#129990]"
          type="submit"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        <p className="px-3 text-sm">Login with social accounts</p>
        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
      </div>

      {/* Social buttons */}
      <div className="flex justify-center space-x-4">
        <button onClick={handleSignInWithGoogle} aria-label="Log in with Google" className="p-3 rounded-sm cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
        </button>
      </div>

      <p className="text-xs text-center sm:px-6 text-base-400 mt-4">
        Don't have an account?
        <Link to="/sign-up" className="underline text-[#129990] ml-1">Sign up</Link>
      </p>
    </div>
  );
};

export default SignIn;
