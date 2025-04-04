"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Users,
  MessageSquare,
  Megaphone,
  FolderArchive,
  BarChart,
  CreditCard,
  ArrowRight,
  GraduationCap,
} from "lucide-react"

import Hero from "../public/images/hero.png"
import { useEffect } from "react"

export default function HomePage() {
  const router = useRouter();
  useEffect(()=>{
  if(!localStorage.getItem("auth_token")){
    router.push("/login")
  }
  },[router])

  return (
    <div className='flex flex-col min-h-screen transition-all`'>
      {/* Header */}
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Smart Education Events System
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A cutting-edge platform for organizing, managing, and engaging with educational events -
                    conferences, workshops, seminars, and webinars, in-person, online, or hybrid.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md px-8">Get Started</Button>
                  <Button variant="outline" className="inline-flex h-10 items-center justify-center rounded-md px-8">
                    Learn More
                  </Button>
                </div>
              </div>
              <Image
                src={Hero}
                width={550}
                height={550}
                alt="SEES Platform"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Comprehensive Features for Educational Events
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SEES provides a complete suite of tools to streamline every aspect of educational event management.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/event-planning">
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-5">
                  <Calendar className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Event Planning & Scheduling</h3>
                  <p className="text-center text-muted-foreground">
                    Create detailed event agendas, manage venue bookings, and integrate with calendars.
                  </p>
                </div>
             </Link>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Stakeholder Management</h3>
                <p className="text-center text-muted-foreground">
                  Robust registration portal, ticketing options, and role-based access control.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <MessageSquare className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Networking & Engagement</h3>
                <p className="text-center text-muted-foreground">
                  Live polling, Q&A sessions, chatrooms, and personalized itineraries.
                </p>
              </div>
              <Link href="/event-promotion">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <Megaphone className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Event Promotion</h3>
                <p className="text-center text-muted-foreground">
                  Integrated marketing tools, email campaigns, and customizable event pages.
                </p>
              </div>
              </Link>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <FolderArchive className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Resource Management</h3>
                <p className="text-center text-muted-foreground">
                  Distribute digital materials and manage exhibitor resources efficiently.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <BarChart className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Analytics & Reporting</h3>
                <p className="text-center text-muted-foreground">
                  Real-time insights into registration trends, session engagement, and feedback.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 md:col-span-2 lg:col-span-3">
                <CreditCard className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Payment & Financial Management</h3>
                <p className="text-center text-muted-foreground">
                  Secure payment gateways, sponsorship tracking, and budget management tools for financial transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User Roles Section */}
        <section id="users" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Tailored for Every User</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SEES provides specialized features for all stakeholders in the educational event ecosystem.
                </p>
              </div>
            </div>
            <div className="grid gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col space-y-4 rounded-lg border bg-background p-6">
                <h3 className="text-2xl font-bold">For Organizers</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Comprehensive event planning tools</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Attendee management and communication</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Budget tracking and financial reporting</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Marketing and promotion capabilities</span>
                  </li>
                </ul>
                <Button className="mt-4 w-full sm:w-auto">Organizer Portal</Button>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border bg-background p-6">
                <h3 className="text-2xl font-bold">For Attendees</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Easy registration and ticketing</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Personalized event schedules</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Networking opportunities with other attendees</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Access to event materials and resources</span>
                  </li>
                </ul>
                <Button className="mt-4 w-full sm:w-auto">Attendee Portal</Button>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border bg-background p-6">
                <h3 className="text-2xl font-bold">For Administrative Users</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>System maintenance and user management</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Comprehensive analytics and reporting</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Financial oversight and payment processing</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Resource allocation and management</span>
                  </li>
                </ul>
                <Button className="mt-4 w-full sm:w-auto">Admin Dashboard</Button>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border bg-background p-6">
                <h3 className="text-2xl font-bold">For Stakeholders</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Event performance metrics and ROI analysis</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Branding and visibility opportunities</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Attendee engagement and feedback data</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Partnership and sponsorship management</span>
                  </li>
                </ul>
                <Button className="mt-4 w-full sm:w-auto">Stakeholder Portal</Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Transform Your Educational Events?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join SEES today and experience the future of educational event management.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="inline-flex h-10 items-center justify-center rounded-md px-8">Get Started</Button>
                <Button variant="outline" className="inline-flex h-10 items-center justify-center rounded-md px-8">
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Smart Education Events System (SEES) - SOEN343. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

