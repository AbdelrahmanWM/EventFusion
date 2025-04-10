"use client";
import { useState, useEffect } from "react";
import { useServicesClient } from "@/hooks/userServicesClient";
import TokenUtility from "@/ServicesClient/tokenUtility";

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  balance: number;
}

const UserProfileForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const servicesClient = useServicesClient();

  useEffect(() => {
    const fetchUser = async () => {
      const decodedToken = TokenUtility.getDecodedToken();
      const jsonWebToken = TokenUtility.getToken();
      const username = decodedToken?.username;

      if (username && jsonWebToken) {
        const response = await servicesClient.getUserByUsername(
          username,
          jsonWebToken
        );

        if (response?.status === "success" && response?.data) {
          const { username, firstName, lastName, email, phoneNumber, balance } =
            response.data;
          setUser({ username, firstName, lastName, email, phoneNumber, balance });
        }
      }
    };

    fetchUser();
  }, [servicesClient]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        User Profile
      </h2>
      {user ? (
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={user.username}
                disabled
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={user.firstName}
                disabled
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={user.lastName}
                disabled
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={user.phoneNumber}
                disabled
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label
                htmlFor="balance"
                className="block text-sm font-medium text-gray-600"
              >
                Balance
              </label>
              <input
                type="text"
                id="balance"
                value={`$${user.balance? user.balance.toFixed(2):"Balance not available for this user"}`}
                disabled
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </form>
      ) : (
        <p className="text-center text-gray-500">Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfileForm;
