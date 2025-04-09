"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TokenUtility, { MyTokenPayload } from "@/ServicesClient/tokenUtility";

export const UserContext = createContext<{
  token: string | null;
  user: MyTokenPayload | null;
}>({
  token: null,
  user: null,
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<MyTokenPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    const token = TokenUtility.getToken();
    if (!token) {
      router.push("/login");
    } else {
      setToken(token);
      setUser(TokenUtility.getDecodedToken());
    }

    setIsLoading(false);
  }, [router]);  


  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <UserContext.Provider value={{ token, user }}>
      {children}
    </UserContext.Provider>
  );
};
