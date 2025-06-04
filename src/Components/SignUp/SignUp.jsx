import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiEye, FiEyeOff, FiImage, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const validatePassword = (pwd) => {
        return {
            hasUppercase: /[A-Z]/.test(pwd),
            hasLowercase: /[a-z]/.test(pwd),
            hasNumber: /\d/.test(pwd),
            hasMinLength: pwd.length >= 8,
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        };
    };
    const errors = validatePassword(password);
    // Handle form submission
    const { createUser, upDateUser, setUser, signInWithGoogle } = use(AuthContext)
    const handelSignup = (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(username, photo, email, password);
        createUser(email, password)
            .then(result => {
                const user = result.user;

                upDateUser({
                    displayName: username,
                    photoURL: photo
                })
                    .then(() => {
                        setUser({ ...user, displayName: username, photoURL: photo });
                        navigate('/')
                        toast.success('Account Created Successfully')
                    })
                    .catch(error => {
                        setUser(user); // Reset user state on error
                        console.error("Error updating user profile:", error);
                        toast.error("Failed to update user profile. Please try again.")
                    });
            })
            .catch(error => {
                console.error("Error creating user:", error);
                toast.error("Error creating user")
            })
        form.reset();
    };
    const handelSignWithgoogle = () => {
        signInWithGoogle()
            .then(res => {
                const user = res.user;
                setUser(user);
                toast.success('Sign in successfully!')
                navigate('/')
            })
            .catch((err) => {
                console.error(err);
                toast.error("Google sign-in failed")
            });
    }
    return (
        <div className="w-11/12 m-3 mx-auto p-8 space-y-3 rounded-xl bg-base-200 shadow-xl text-base-400">
            <h1 className="text-3xl font-bold text-center">Create Account</h1>
            <p className="text-sm font-light text-center">Join FreshTracker and start reducing food waste</p>

            <form onSubmit={handelSignup} className="space-y-6">
                {/* Username */}
                <div className="space-y-1 text-sm">
                    <label htmlFor="username" className="block">Username</label>
                    <div className="relative text-gray-500">
                        <input
                            required
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            className="w-full px-10 py-3 rounded-md bg-white border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#129990]"
                        />
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    </div>
                </div>

                {/* Photo URL */}
                <div className="space-y-1 text-sm">
                    <label htmlFor="photo" className="block">Photo Url</label>
                    <div className="relative text-gray-500">
                        <input
                            required
                            type="url"
                            name="photo"
                            id="photo"
                            placeholder="Photo Url"
                            className="w-full px-10 py-3 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#129990]"
                        />
                        <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    </div>
                </div>

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

                {/* Password with Validation */}
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
                            onBlur={() => setTouched(true)}
                            className="w-full pl-10 pr-10 py-3 rounded-md bg-white"
                        />
                    </div>
                    <div
                        className="absolute right-3 top-10 cursor-pointer text-gray-600"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                    <div className="flex justify-end text-xs text-base-400 mt-1">
                        <Link to="/sign-in" className="underline text-[#129990] ml-1">Forgot Password?</Link>
                    </div>

                    {/* Password Requirements */}
                    {touched && (
                        <div className="text-xs mt-2 text-red-500 space-y-1">
                            <p className={errors.hasUppercase ? 'text-green-600' : 'text-red-500'}>
                                • At least one uppercase letter (A–Z)
                            </p>
                            <p className={errors.hasLowercase ? 'text-green-600' : 'text-red-500'}>
                                • At least one lowercase letter (a–z)
                            </p>
                            <p className={errors.hasNumber ? 'text-green-600' : 'text-red-500'}>
                                • At least one number (0–9)
                            </p>
                            <p className={errors.hasMinLength ? 'text-green-600' : 'text-red-500'}>
                                • At least 8 characters long
                            </p>
                            <p className={errors.hasSpecialChar ? 'text-green-600' : 'text-red-500'}>
                                • At least one special character (!@#$%^&* etc.)
                            </p>
                        </div>
                    )}
                </div>

                <button
                    className="block w-full p-3 text-center rounded-sm cursor-pointer text-white bg-[#129990]"
                    type="submit"

                >
                    Sign Up
                </button>
            </form>

            <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                <p className="px-3 text-sm">Login with social accounts</p>
                <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-4">
                <button onClick={handelSignWithgoogle} aria-label="Log in with Google" className="p-3 rounded-sm cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                </button>

                <button aria-label="Log in with GitHub" className="p-3 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                    </svg>
                </button>
            </div>

            {/* Social Login Buttons (keep as-is) */}

            <p className="text-xs text-center sm:px-6 text-base-400 mt-4">
                Already have an account?
                <Link to="/sign-in" className="underline text-[#129990] ml-1">Sign In</Link>
            </p>
        </div>
    );
};

export default SignUp;
