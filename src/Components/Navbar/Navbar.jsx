import React, { useState, useEffect, useContext, useRef } from "react";
import { IoHomeOutline, IoNotificationsOutline } from "react-icons/io5";
import { TbFridge } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { SiOpenai } from "react-icons/si";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Toogle from "../Toogle/Toogle";
import AiAssistant from "../AiAssistant/AiAssistant";
import toast from "react-hot-toast";
import logo from "../../../public/img2.svg";
import Notification from "../Notification/Notification";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const aiRef = useRef();

  // 🌗 Handle Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🔔 Fetch REAL notification count from API - FIXED
  const fetchNotificationCount = async () => {
    if (!user?.email) {
      setNotificationCount(0);
      return;
    }

    try {
      console.log('🔄 Fetching notification count for:', user.email);
      
      // FIXED: Use localhost:5000 for backend API
      const response = await fetch(`https://foodtracker-server-2.onrender.com/notifications/count?userEmail=${encodeURIComponent(user.email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('📡 Notification count response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Notification count:', data.count);
        setNotificationCount(data.count || 0);
      } else {
        console.error('❌ Failed to fetch notification count:', response.status);
        // Use demo count if API fails
        setNotificationCount(0);
      }
    } catch (error) {
      console.error('❌ Error fetching notification count:', error);
      // Use demo count on error
      setNotificationCount(0);
    }
  };

  // Refresh notification count - called from Notification component
  const refreshNotificationCount = () => {
    console.log('🔄 Manually refreshing notification count...');
    fetchNotificationCount();
  };

  // Real-time count updates
  useEffect(() => {
    if (user) {
      console.log('👤 User detected, setting up notification polling...');
      
      // Initial fetch
      fetchNotificationCount();
      
      // Poll every 10 seconds for real-time updates
      const interval = setInterval(fetchNotificationCount, 10000);
      
      return () => {
        console.log('🧹 Cleaning up notification interval');
        clearInterval(interval);
      };
    } else {
      console.log('👤 No user, setting count to 0');
      setNotificationCount(0);
    }
  }, [user]);

  // Refresh count when notification modal opens/closes
  useEffect(() => {
    if (isNotificationOpen) {
      console.log('📢 Notification modal opened, refreshing count...');
      fetchNotificationCount();
    }
  }, [isNotificationOpen]);

  // Listen for custom events from other components
  useEffect(() => {
    const handleNotificationUpdate = () => {
      console.log('📢 Received notification update event');
      setTimeout(fetchNotificationCount, 1000);
    };

    // Listen for custom events when notifications are created/updated
    window.addEventListener('notificationUpdated', handleNotificationUpdate);
    
    return () => {
      window.removeEventListener('notificationUpdated', handleNotificationUpdate);
    };
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // 🧾 Handle Logout
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logout Successfully");
        setNotificationCount(0);
      })
      .catch(() => toast.error("Error signing out"));
  };

  // 🧭 Navigation Links
  const allNavLinks = [
    { to: "/", icon: <IoHomeOutline />, text: "Home", protected: false },
    { to: "/fridge", icon: <TbFridge />, text: "Fridge", protected: true },
    { to: "/my-items", icon: <FiBox />, text: "My Items", protected: true },
    { to: "/add-food", icon: <GoPlus />, text: "Add Food", protected: true },
    { to: "/FoodDashboard", icon: <MdDashboard />, text: "Dashboard", protected: true },
    { to: "/service", icon: <RiCustomerService2Fill />, text: "Services", protected: false },
  ];
  const visibleLinks = user ? allNavLinks : allNavLinks.filter((link) => !link.protected);

  // Close AI when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aiRef.current && !aiRef.current.contains(event.target)) {
        setIsAiOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full sticky top-0 z-50 bg-[#279991] shadow-sm">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar">
          {/* LEFT */}
          <div className="navbar-start">
            {/* Mobile Menu Button */}
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-[#279991] rounded-box mt-3 w-52 p-2 shadow text-white"
              >
                {visibleLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        isActive
                          ? "font-semibold underline underline-offset-4"
                          : "hover:text-gray-200"
                      }
                    >
                      <div className="flex items-center gap-1">{link.icon} {link.text}</div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="btn btn-ghost text-xl text-white hidden lg:flex">
              <img className="w-10" src={logo} alt="Logo" />
            </Link>
          </div>

          {/* CENTER */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex gap-6">
              {visibleLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive
                        ? "text-black font-semibold underline underline-offset-4"
                        : "text-white hover:text-gray-200"
                    }
                  >
                    <div className="flex items-center gap-1">{link.icon}{link.text}</div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="navbar-end flex items-center gap-3">
            {/* Theme Toggle */}
            <Toogle checked={theme === "light"} onChange={toggleTheme} />

            {/* AI Assistant */}
            <div className="relative" ref={aiRef}>
              <button
                onClick={() => setIsAiOpen((prev) => !prev)}
                className="btn btn-ghost text-white tooltip tooltip-bottom"
                data-tip="AI Assistant"
              >
                <SiOpenai className="text-2xl" />
              </button>
              {isAiOpen && (
                <div className="absolute right-0 top-12 w-80 bg-base-100 p-3 rounded-lg shadow-lg z-50 border">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <SiOpenai className="text-xl" /> AI Assistant
                    </h3>
                    <button 
                      onClick={() => setIsAiOpen(false)}
                      className="btn btn-xs btn-ghost"
                    >
                      ✕
                    </button>
                  </div>
                  <AiAssistant />
                </div>
              )}
            </div>

            {/* 🔔 Notification Icon with Live Count */}
            {user && (
              <button
                onClick={() => setIsNotificationOpen(true)}
                className="btn btn-ghost text-white tooltip tooltip-bottom relative"
                data-tip="Notifications"
              >
                <div className="indicator">
                  <IoNotificationsOutline className="text-2xl" />
                  {/* Live notification count */}
                  {notificationCount > 0 && (
                    <span className="badge badge-sm indicator-item bg-red-500 text-white border-0 animate-pulse">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </div>
              </button>
            )}

            {/* USER PROFILE */}
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn bg-white mx-2 btn-circle avatar">
                  <div className="w-8 rounded-full">
                    <img
                      alt="User Avatar"
                      src={user?.photoURL || "https://i.ibb.co/4pDNDk1/default-profile.png"}
                      onError={(e) => {
                        e.target.src = "https://i.ibb.co/4pDNDk1/default-profile.png";
                      }}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"
                >
                  <li>
                    <span className="font-semibold">{user.displayName || user.email}</span>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="text-red-500 font-medium">
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to={"/sign-in"}
                  className="btn bg-white text-[#279991] hover:bg-gray-100 rounded-full mr-2"
                >
                  Sign In
                </Link>
                <Link
                  to={"/sign-up"}
                  className="btn bg-white text-[#279991] hover:bg-gray-100 rounded-full"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 🔔 Notification Modal */}
      {isNotificationOpen && (
        <Notification
          onClose={() => setIsNotificationOpen(false)}
          onRefresh={refreshNotificationCount}
        />
      )}
    </div>
  );
};

export default Navbar;