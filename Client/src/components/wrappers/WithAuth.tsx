"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        // Redirect to login if token is missing
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;