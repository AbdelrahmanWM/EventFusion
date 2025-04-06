"use client";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { useEffect, useState } from "react";
import TokenDecoder, { MyTokenPayload } from "@/ServicesClient/tokenDecoder";
import dotenv from "dotenv";
import AccountMenu from "./accountMenu";
dotenv.config();

export default function Header() {
  const [showButton, setShowButton] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [showAccount, setShowAccount] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      setShowButton(true);
      setUsername(null);
    } else {
      const verifiedToken: MyTokenPayload | null =
        TokenDecoder.decodeToken(token);
      if (!verifiedToken) {
        setShowButton(true);
        setUsername(null);
      } else {
        setUsername(verifiedToken.username);
        setShowButton(false);

      }
    }
  };

  useEffect(() => {
    checkAuth();

    // Listen for login updates
    window.addEventListener("auth-changed", checkAuth);

    return () => {
      window.removeEventListener("auth-changed", checkAuth);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          <Link className="text-xl font-bold" href={"/"}>
            SEES
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="#about" className=" font-medium hover:text-primary">
            About
          </Link>
          <Link href="#features" className="font-medium hover:text-primary">
            Features
          </Link>
          <Link href="#users" className="font-medium hover:text-primary">
            For Users
          </Link>
          <Link href="#contact" className="font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
        {showButton ? (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Link href="login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="register">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          </div>
        ) : (
           <AccountMenu username={username} isMenuOpen={showAccount} setIsMenuOpen={setShowAccount} />
        )}
      </div>
    </header>
  );
}
