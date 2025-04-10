"use client";

import React, { useState } from "react";
import { useServicesClient } from "@/hooks/userServicesClient";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); // NEW: for showing login errors
  const servicesClient = useServicesClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(""); // clear any previous error

    try {
      const response = await servicesClient.login(username, password);
      if(response){
      if (!response.error) {
        localStorage.setItem("auth_token", response.data.token);
        window.dispatchEvent(new Event("auth-changed"));
        router.push("/");
      } else {
        setLoginError(response.message || "Invalid username or password.");
      }
      }else{
        setLoginError("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-black border-1 dark:border-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {loginError && (
          <div className="text-red-500 text-sm text-center">{loginError}</div>
        )}

        <div className="flex justify-center">
          <Button className="w-full py-2 px-4 text-white bg-primary rounded-md hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
