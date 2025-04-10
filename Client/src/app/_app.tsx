"use client"
// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    // Protect all pages except login
    if (!token && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  return <Component {...pageProps} />;
};

export default App;