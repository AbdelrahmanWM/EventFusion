"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming Button component is available

const AccountMenu: React.FC = ({username, isMenuOpen,setIsMenuOpen}) => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove user session (e.g., token) from localStorage or context
    localStorage.removeItem("auth_token");
     window.dispatchEvent(new Event("auth-changed"));
    router.push("/login"); // Redirect to login page
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="relative">
      {/* Account button */}
      <Button onClick={toggleMenu} className="flex items-center space-x-2 py-2 px-4 bg-primary rounded-md hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary">
      <div className="flex items-center gap-2 font-bold">
                
                  Welcome{username ? `, ${username}!` : "!!"}
               
              </div>
        {/* Add a small icon for dropdown */}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10">
          <ul className="py-2">
            <li>
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Help
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-200 dark:text-red-400 dark:hover:bg-gray-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
