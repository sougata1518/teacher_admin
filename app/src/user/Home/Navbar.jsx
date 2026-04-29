import StudentSignup from "../Student_Register/signup";
import StudentLogin from "../Student_Register/login";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout, getUserData } from "../../localstorage";
import { FiUser, FiLogOut, FiSearch } from "react-icons/fi";
import StudentProfile from "./StudentProfile";
// import { search_courses } from "../../service/student/course";

import { search_courses } from "../../dumy_data/course_data";

const Navbar = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // 🔍 SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ login check
  const loggedIn = isLoggedIn?.() || false;

  // ✅ get user data
  useEffect(() => {
    if (loggedIn) {
      const data = getUserData?.() || null;
      setUserData(data);
    }
  }, [loggedIn]);

  // ✅ close dropdown if profile opens
  useEffect(() => {
    if (showProfile) {
      setShowDropdown(false);
    }
  }, [showProfile]);

  // ✅ outside click close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ logout
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setUserData(null);
    window.location.reload();
  };

  // 🔍 SEARCH FUNCTION
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const res = await search_courses(searchTerm);

      const data = res;

      console.log("Search results:", data?.courseDto);

      navigate(`/student/home/search/course/${searchTerm}/1`, {
        state: {
          data: data,  
        },
      });
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow">

        {/* LOGO */}
        <h1
          className="text-2xl font-bold text-[#0A66C2] cursor-pointer"
          onClick={() => setShowDropdown(false)}
        >
          Student Portal
        </h1>

        {/* 🔍 SEARCH BAR */}
        <div className="flex items-center border rounded-full px-4 py-2 w-[350px] shadow-sm focus-within:ring-2 focus-within:ring-[#0A66C2]">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="flex-1 outline-none text-sm"
          />

          <button onClick={handleSearch}>
            <FiSearch className="text-gray-500 hover:text-[#0A66C2]" />
          </button>
        </div>

        <div className="flex gap-4 items-center">

          {/* NOT LOGGED IN */}
          {!loggedIn ? (
            <button
              onClick={() => setShowLogin(true)}
              className="border border-[#0A66C2] text-[#0A66C2] px-4 py-2 rounded-md"
            >
              Sign In
            </button>
          ) : (
            /* LOGGED IN */
            <div className="relative" ref={dropdownRef}>

              {/* PROFILE ICON */}
              <div
                onClick={() => setShowDropdown((prev) => !prev)}
                className="w-10 h-10 bg-[#0A66C2] text-white flex items-center justify-center rounded-full cursor-pointer"
              >
                <FiUser size={18} />
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">

                  {/* USER INFO */}
                  <div className="px-4 py-3 bg-gray-50 border-b">
                    <p className="text-sm font-semibold text-gray-800">
                      {userData?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {userData?.email || "No email"}
                    </p>
                  </div>

                  {/* PROFILE */}
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      setShowProfile(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <div className="p-2 bg-blue-100 text-[#0A66C2] rounded-lg">
                      <FiUser size={16} />
                    </div>
                    <span className="font-medium">Profile</span>
                  </button>

                  {/* DIVIDER */}
                  <div className="mx-3 border-t"></div>

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
                  >
                    <div className="p-2 bg-red-100 text-red-500 rounded-lg">
                      <FiLogOut size={16} />
                    </div>
                    <span className="font-medium">Logout</span>
                  </button>

                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* SIGNUP MODAL */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative max-h-[93vh] overflow-y-auto">
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-3 right-3 text-gray-500 text-xl"
            >
              ✕
            </button>

            <StudentSignup setShowSignup={setShowSignup} setShowLogin={setShowLogin} />
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-500 text-xl"
            >
              ✕
            </button>

            <StudentLogin setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
          </div>
        </div>
      )}

      {/* PROFILE MODAL */}
      {showProfile && (
        <StudentProfile
          userData={userData}
          onClose={() => setShowProfile(false)}
        />
      )}
    </>
  );
};

export default Navbar;