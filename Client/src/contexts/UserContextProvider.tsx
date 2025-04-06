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
    async function checkToken() {
      const token = TokenUtility.getToken();
      if (!token) {
        router.push("/login");
        return;
      }
      const response = await servicesClient.verifyToken(token);
      if (response.error) {
        TokenUtility.removeToken();
        router.push("/login");
      } else {
        setToken(TokenUtility.getToken());
        setUser(TokenUtility.getDecodedToken());
      }
    }
    checkToken();
  }, [servicesClient, router]);

  return (
    <UserContext.Provider value={{ token, user }}>
      {children}
    </UserContext.Provider>
  );
};
