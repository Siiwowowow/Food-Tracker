import React, { useState, useEffect, useContext } from 'react';
import { FiBox } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { IoHomeOutline } from 'react-icons/io5';
import { TbFridge } from 'react-icons/tb';
import { Link, NavLink } from 'react-router';
import Toogle from '../Toogle/Toogle';
import { AuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import { RiCustomerService2Fill } from "react-icons/ri";
import logo from '../../../public/img2.svg'; // Assuming you have a logo image
const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Signout user
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success('Logout Successfully');
      })
      .catch((error) => {
        toast.error("Error signing out:", error);
      });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const allNavLinks = [
    { to: '/', icon: <IoHomeOutline />, text: 'Home', protected: false },
    { to: '/fridge', icon: <TbFridge />, text: 'Fridge', protected: false },
    
    
    { to: '/my-items', icon: <FiBox />, text: 'My Items', protected: true },
    { to: '/add-food', icon: <GoPlus />, text: 'Add Food', protected: true },
    { to: '/service', icon: <RiCustomerService2Fill />, text: 'Services', protected: false },
  ];

  const visibleLinks = user 
    ? allNavLinks 
    : allNavLinks.filter(link => !link.protected && ['Home', 'Fridge', 'Services'].includes(link.text));

  const link = (
    <div className='flex flex-col lg:flex-row gap-4'>
      {visibleLinks.map((link) => (
        <NavLink 
          key={link.to}
          to={link.to}
          className={({ isActive }) => 
            isActive ? "text-black font-medium underline underline-offset-4" : "text-white hover:text-gray-200"
          }
        >
          <div className='flex items-center gap-1'>
            {link.icon}
            {link.text}
          </div>
        </NavLink>
      ))}
    </div>
  );

  return (
    <div className="w-full sticky top-0 left-0 z-50 bg-[#279991] shadow-sm">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white -ml-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-[#279991] rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                {link}
                <div className='mt-2'>
                  <Toogle checked={theme === 'light'} onChange={toggleTheme} />
                </div>
              </ul>
            </div>
            <div className='-ml-7 lg:-ml-4'>
              <Link to={'/'}><a className="btn btn-ghost text-xl text-white">
      
                <img className='sm:hide lg:w-10' src={logo}
                alt="Logo"/>
              </a></Link>
            </div>
            <div className='hidden lg:flex items-center gap-2 ml-4'>
              <Toogle checked={theme === 'light'} onChange={toggleTheme} />
            </div>
          </div>
          
          <div className="navbar-center hidden lg:flex">
            
            <ul className="menu menu-horizontal ">
              {link}
            </ul>
          </div>

          <div className="navbar-end">
            {user ? (
              <>
                
                <div className="dropdown dropdown-end">
                  <div 
                    tabIndex={0} 
                    role="button" 
                    className="btn bg-white mx-2 btn-circle avatar tooltip tooltip-bottom" 
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
  className="menu menu-sm dropdown-content bg-base-100 text-base-400 rounded-box z-[1] mt-3 w-52 lg:-mr-9 p-2 shadow-xl"
>
  {/* User Profile Section */}
  <li className="border-b border-white/10 mb-1">
    <div className="flex items-center gap-3 px-2 py-3">
      <div className="avatar">
        <div className="w-10 rounded-full  border flex items-center justify-center">
          {user.photoURL ? (
            <img src={user.photoURL} alt="User" />
          ) : (
            <span className="text-xl">👤</span>
          )}
        </div>
      </div>
      <div>
        <p className="font-medium">{user.displayName || "User"}</p>
        <p className="text-xs text-base-400">{user.email}</p>
      </div>
    </div>
  </li>

  {/* Menu Items */}
  <li>
    <Link to="/my-items" className="flex items-center gap-2 hover:bg-white/10">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      My Items
    </Link>
  </li>

  {/* Logout Button */}
  <li className="mt-1">
    <button 
      onClick={handleSignOut} 
      className="flex items-center gap-2 w-full text-left hover:bg-white/10 text-red-500 "
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Log Out
    </button>
  </li>
</ul>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to={'/sign-in'} 
                  className='btn bg-white text-[#279991] hover:bg-gray-100 rounded-full mr-2'
                >
                  Sign In
                </Link>
                <Link 
                  to={'/sign-up'} 
                  className='btn bg-white text-[#279991] hover:bg-gray-100 rounded-full'
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;