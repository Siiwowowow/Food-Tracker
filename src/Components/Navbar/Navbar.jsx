import React, { use, useEffect, useState } from 'react';
import { FiBox } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { IoHomeOutline } from 'react-icons/io5';
import { TbFridge } from 'react-icons/tb';
import { Link, NavLink } from 'react-router';
import Toogle from '../Toogle/Toogle';
import { AuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  //Signout user
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success('Logout Successfully ')

      })
      .catch((error) => {
        toast.error("Error signing out:", error)
      });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const link = <>
    <div className='flex flex-col lg:flex-row gap-4'>
      <NavLink to={'/'} className={({ isActive }) => isActive ? "text-[#129990] underline underline-offset-4" : ""}><div className='flex items-center gap-1'><IoHomeOutline />Home</div></NavLink>
      <NavLink to={'/fridge'} className={({ isActive }) => isActive ? "text-[#129990] underline underline-offset-4" : ""}><div className='flex items-center gap-1'><TbFridge />Fridge</div></NavLink>
      <NavLink to={'/add-food'} className={({ isActive }) => isActive ? "text-[#129990] underline underline-offset-4" : ""}><div className='flex items-center gap-1'><GoPlus />Add Food</div></NavLink>
      {
        user && <NavLink to={'/my-items'} className={({ isActive }) => isActive ? "text-[#129990] underline underline-offset-4" : ""}><div className='flex items-center gap-1'><FiBox />My Item</div></NavLink>
      }
    </div>
  </>
  return (
    <div className="navbar sticky z-10 top-0 bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {link}
            <div className='mt-2'>
              <Toogle checked={theme === 'light'} onChange={toggleTheme}></Toogle>

            </div>
          </ul>
        </div>
        <div className='-ml-7 lg:-ml-4'>
          <a className="btn btn-ghost text-xl">Fresh<span className='font-bold text-[#129990] -ml-2'>Tracker</span></a>
        </div>
        <div className='hidden lg:flex items-center gap-2'>
          <Toogle checked={theme === 'light'} onChange={toggleTheme}></Toogle>

        </div>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {link}
        </ul>
      </div>

      <div className="navbar-end ">
        
        
        {
          user ? <button onClick={handleSignOut} className='btn bg-[#129990] text-amber-50 rounded-4xl'>Log out</button> : <>
            <Link to={'/sign-in'} className='btn  bg-[#129990] text-amber-50 rounded-4xl'>Sign In</Link>
            <Link to={'/sign-up'} className='btn bg-[#129990] text-amber-50 rounded-4xl'>Sign Up</Link>
          </>
        }
        {user ? (
          <div className="dropdown dropdown-end">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn bg-amber-50 mx-5 btn-circle avatar tooltip tooltip-bottom" 
              data-tip={user.displayName || user.email}
            >
              <div className="w-8 rounded-full">
                <img
                  alt="User Avatar"
                  src={user?.photoURL || 'https://i.ibb.co/4pDNDk1/default-profile.png'}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.src = 'https://i.ibb.co/4pDNDk1/default-profile.png';
                  }}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <span className="text-sm px-2 py-1">
                  {user.displayName || user.email}
                </span>
              </li>
              <li><Link to="/my-items">My Items</Link></li>
              <li><button onClick={handleSignOut}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            
          </>
        )}


      </div>
    </div>
  );
};

export default Navbar;