"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming Button component is available
import TokenUtility from "@/ServicesClient/tokenUtility";
import { CircleChevronDown } from 'lucide-react';
import Link from "next/link";

interface AccountMenuProps {
  username: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (bool: boolean) => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
  username,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove user session (e.g., token) from localStorage or context
    TokenUtility.removeToken();
    window.dispatchEvent(new Event("auth-changed"));
    router.push("/login"); // Redirect to login page
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Account button */}
      <Button
        onClick={toggleMenu}
        className="flex items-center space-x-2 py-2 px-4 bg-primary rounded-md hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary"
      >
        <div className="flex items-center gap-2 font-semibold tracking-wide">
          Welcome{username ? `, ${username}!` : "!"}
        </div>
        {/* Add a small icon for dropdown */}
        <CircleChevronDown/>
      </Button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10">
          <ul className="py-2">
            <li>

                <Link href="/userProfile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                Profile
                </Link>
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
