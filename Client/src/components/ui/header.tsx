import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

export default function Header(){
    return (
<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
<div className="container mx-auto flex h-16 items-center justify-between">
  <div className="flex items-center gap-2">
    <GraduationCap className="h-6 w-6" />
    <span className="text-xl font-bold">SEES</span>
  </div>
  <nav className="hidden md:flex items-center gap-6">
    <Link href="#about" className="text-sm font-medium hover:text-primary">
      About
    </Link>
    <Link href="#features" className="text-sm font-medium hover:text-primary">
      Features
    </Link>
    <Link href="#users" className="text-sm font-medium hover:text-primary">
      For Users
    </Link>
    <Link href="#contact" className="text-sm font-medium hover:text-primary">
      Contact
    </Link>
  </nav>
  <div className="flex items-center gap-4">
    <div className="hidden md:flex items-center gap-4">
      <Link href="login">
      <Button variant="outline" size="sm">
        Log in
      </Button>
      </Link>
      <Button size="sm">Sign up</Button>
    </div>
  </div>
</div>
</header>
    )
}
