"use client";
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

  // 🔔 Fetch REAL notification count from API
  const fetchNotificationCount = async () => {
    if (!user) {
      setNotificationCount(0);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/notifications/count', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Notification count:', data.count);
        setNotificationCount(data.count || 0);
      }
    } catch (error) {
      console.error('Error fetching notification count:', error);
      // Fallback: fetch all notifications and count unread
      fetchTotalNotifications();
    }
  };

  // Backup method if count API doesn't work
  const fetchTotalNotifications = async () => {
    try {
      const response = await fetch('http://localhost:3000/notifications', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        const unreadCount = data.filter(notif => !notif.read).length;
        setNotificationCount(unreadCount);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotificationCount();
      
      // Refresh every 30 seconds
      const interval = setInterval(fetchNotificationCount, 30000);
      return () => clearInterval(interval);
    } else {
      setNotificationCount(0);
    }
  }, [user]);

  // Refresh count when notification modal closes
  useEffect(() => {
    if (!isNotificationOpen) {
      setTimeout(() => {
        fetchNotificationCount();
      }, 500);
    }
  }, [isNotificationOpen]);

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
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold underline underline-offset-4"
                        : "hover:text-gray-200"
                    }
                  >
                    <div className="flex items-center gap-1">{link.icon} {link.text}</div>
                  </NavLink>
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
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-semibold underline underline-offset-4"
                      : "text-white hover:text-gray-200"
                  }
                >
                  <div className="flex items-center gap-1">{link.icon}{link.text}</div>
                </NavLink>
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
                <div className="absolute right-0 mt-2 w-80 bg-base-100 p-3 rounded-lg shadow-lg z-50">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <SiOpenai className="text-xl" /> AI Assistant
                  </h3>
                  <AiAssistant />
                </div>
              )}
            </div>

            {/* 🔔 Notification Icon with Live Count */}
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
                    <span>{user.displayName || user.email}</span>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="text-red-500">
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
          onRefresh={fetchNotificationCount}
        />
      )}
    </div>
  );
};

export default Navbar;