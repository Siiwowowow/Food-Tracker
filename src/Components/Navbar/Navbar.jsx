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
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
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
              <a className="btn btn-ghost text-xl text-white">
                Fresh<span className='font-bold text-white -ml-2'>Tracker</span>
              </a>
            </div>
            <div className='hidden lg:flex items-center gap-2 ml-4'>
              <Toogle checked={theme === 'light'} onChange={toggleTheme} />
            </div>
          </div>
          
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
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
                    className="menu menu-sm dropdown-content bg-[#279991] rounded-box z-[1] mt-3 w-42 p-2 shadow"
                  >
                    <li>
                      <span className="text-sm px-2 py-1">
                        {user.displayName || user.email}
                      </span>
                    </li>
                    <li><Link to="/my-items">My Items</Link></li>
                    <button 
                  onClick={handleSignOut} 
                  className='btn bg-gray text-[#279991] hover:bg-gray-100 rounded-full mr-2'
                >
                  Log out
                </button>
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