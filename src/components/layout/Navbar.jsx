import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, Calendar, LogOut } from "lucide-react";
import StudentLoginModal from "../../pages/Auth/StudentLoginModal";
import useAuthStore from "../../stores/authStore";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [showStudentLogin, setShowStudentLogin] = useState(false);
  const dropDownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

    const handleSelect = (role) => {
    localStorage.setItem("role", role); 
    setDropDown(false);  
    if (role === "mentor") {
      navigate("/mentor/login");  
    } else { 
      setShowStudentLogin(true); 
    } 
  };

  const handleLogout = async () => {
    await logout();
    setProfileDropdown(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDown(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClasses =
    "relative text-base px-3 py-2 transition-colors duration-300 hover:text-blue-500 font-medium";
  const activeClasses = "text-blue-500";

   return (
    <header className="flex justify-center w-full">
      <nav className="flex justify-between items-center fixed top-5 left-1/2 -translate-x-1/2 w-[90%] bg-white/70 backdrop-blur-md shadow-lg rounded-xl px-6 md:px-10 py-3 z-40 transition-all duration-300">
        <NavLink to="/" className="cursor-pointer flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-2xl font-bold text-blue-600">MentorMap</span>
        </NavLink> 

        <div className="hidden md:flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `cursor-pointer ${linkClasses} ${isActive ? activeClasses : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/college"
            className={({ isActive }) =>
              `cursor-pointer ${linkClasses} ${isActive ? activeClasses : ""}`
            }
          >
            Explore Colleges
          </NavLink>
          <NavLink
            to="/mentorspage"
            className={({ isActive }) =>
              `cursor-pointer ${linkClasses} ${isActive ? activeClasses : ""}`
            }
          >
            Explore Mentors
          </NavLink>
        </div>

        <div className="hidden md:flex items-center relative">
          {isAuthenticated ? (
            <div ref={profileDropdownRef} className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  {user?.avatar || user?.image ? (
                    <img 
                      src={user.avatar || user.image} 
                       alt={user.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-medium text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                   )}
                </div>
                 <ChevronDown 
                  className={`w-4 h-4 text-gray-600 transition-transform ${
                    profileDropdown ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {profileDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-lg border z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate('/student/dashboard');
                        setProfileDropdown(false);
                      }}
                      className="cursor-pointer flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </button>
                    
                    <button
                      onClick={() => {
                        navigate('/my-meetings');
                        setProfileDropdown(false);
                      }}
                      className="cursor-pointer flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      My Meetings
                    </button>
                    
                    <hr className="my-1" />
                    
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div ref={dropDownRef} className="relative">
              <button
                onClick={() => setDropDown((prev) => !prev)}
                className="cursor-pointer flex items-center gap-1 px-4 py-2 bg-black text-white text-base font-semibold rounded-lg shadow-md hover:bg-gray-900 transition"
              >
                Login
              </button>

              {dropDown && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                  <button
                    onClick={() => handleSelect("mentor")}
                    className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Login as Mentor
                  </button>
                  <button
                    onClick={() => handleSelect("student")}
                    className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Login as Student
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="md:hidden text-black focus:outline-none cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden fixed top-20 left-1/2 -translate-x-1/2 w-[90%] bg-white/95 backdrop-blur-md shadow-lg rounded-xl p-6 flex flex-col gap-4 z-40 transition-all duration-300">
          <NavLink to="/" onClick={toggleMenu} className={`cursor-pointer ${linkClasses}`}>
            Home
          </NavLink>
          <NavLink to="/college" onClick={toggleMenu} className={`cursor-pointer ${linkClasses}`}>
            Explore Colleges
          </NavLink>
          <NavLink
            to="/mentorspage"
            onClick={toggleMenu}
            className={`cursor-pointer ${linkClasses}`}
          >
            Explore Mentors
          </NavLink>

          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  {user?.avatar || user?.image ? (
                    <img 
                      src={user.avatar || user.image} 
                      alt={user.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-medium">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  navigate('/dashboard');
                  toggleMenu();
                }}
                className="cursor-pointer flex items-center gap-3 text-base font-semibold px-4 py-2 rounded-lg text-left hover:bg-gray-100"
              >
                <User className="w-4 h-4" />
                Dashboard
              </button>
              
              <button
                onClick={() => {
                  navigate('/my-meetings');
                  toggleMenu();
                }}
                className="cursor-pointer flex items-center gap-3 text-base font-semibold px-4 py-2 rounded-lg text-left hover:bg-gray-100"
              >
                <Calendar className="w-4 h-4" />
                My Meetings
              </button>
              
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="cursor-pointer flex items-center gap-3 text-base font-semibold px-4 py-2 rounded-lg text-left text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setDropDown(false);
                  toggleMenu();
                  navigate("/auth/mentor-login");
                }}
                className="cursor-pointer text-base font-semibold px-4 py-2 rounded-lg text-left"
              >
                Login as Mentor
              </button>
              <button
                onClick={() => {
                  setDropDown(false);
                  toggleMenu();
                  setShowStudentLogin(true);
                }}
                className="cursor-pointer text-base font-semibold px-4 py-2 rounded-lg text-left"
              >
                Login as Student
              </button>
            </>
          )}
        </div>
      )}


      <StudentLoginModal
        isOpen={showStudentLogin}
        onClose={() => setShowStudentLogin(false)}
      />
    </header>
  );
}
