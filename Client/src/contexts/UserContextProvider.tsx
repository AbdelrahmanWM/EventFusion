"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useServicesClient } from "@/hooks/userServicesClient";
import TokenUtility, { MyTokenPayload } from "@/ServicesClient/tokenUtility";

export const UserContext = createContext<{ token: string | null; user: MyTokenPayload | null }>({
  token: null,
  user: null,
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<MyTokenPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const servicesClient = useServicesClient();

  useEffect(() => {
        const interval = setInterval(async () => {
          const token = TokenUtility.getToken();
          if (!token) {
            router.push("/login");
            clearInterval(interval);
            return;
          }
          const validToken = await servicesClient.verifyToken(token);
          if (!validToken) {
            console.log("Invalid")
            TokenUtility.removeToken();
            router.push("/login");
            clearInterval(interval); 
          } else {
            console.log("valid")
            setToken(TokenUtility.getToken());
            setUser(TokenUtility.getDecodedToken());
          }
        }, 1000);
    
        return () => clearInterval(interval); 
    
  });

  return (
    <UserContext.Provider value={{ token, user }}>
      {children}
    </UserContext.Provider>
  );
};
