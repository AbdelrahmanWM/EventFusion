"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegistrationTrends } from "./registration-trends";
import { RecentActivities } from "./recent-activites";
import { SessionEngagement } from "./session-engagement";
import { AttendeeFeedback } from "./attendee-feedback";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ParticipationMetrics } from "./participation-metrics";
import { SuccessMetrics } from "./success-metrics";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, Activity, Star } from "lucide-react";

export default function DashboardPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const [clientTime, setClientTime] = useState<string | null>(null);

  useEffect(() => {
    setClientTime(lastUpdated.toLocaleTimeString());
  }, [lastUpdated]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="container mx-auto flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              SEES Event Analytics Dashboard - <span className="text-blue-600">StartUp Expo2025</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {clientTime}
              <Badge variant="outline" className="ml-2 bg-green-50">
                <span className="mr-1 h-2 w-2 rounded-full bg-green-500 inline-block"></span>{" "}
                Live
              </Badge>
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Registrations
              </CardTitle>
              <UserPlus className="h-5 w-5 text-blue-500"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+24%</span> from last event
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Attendees
              </CardTitle>
              <Users className="h-5 w-5 text-green-500"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">876</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">70.2%</span> attendance rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Session Engagement
              </CardTitle>
              <Activity className="h-5 w-5 text-orange-500"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85.3%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+5.1%</span> from last event
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Satisfaction Score
              </CardTitle>
              <Star className="h-5 w-5 text-yellow-500"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7/5</div>
              <p className="text-xs text-muted-foreground">
                Based on <span className="font-medium">342</span> feedback
                responses
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Registration Trends</CardTitle>
                  <CardDescription>
                    Daily registration activity over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <RegistrationTrends />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    Latest registrations and session check-ins
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivities />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="registrations">
            <ParticipationMetrics />
          </TabsContent>
          <TabsContent value="sessions">
            <SessionEngagement />
          </TabsContent>
          <TabsContent value="feedback">
            <AttendeeFeedback />
          </TabsContent>
          <TabsContent value="engagement">
            <SuccessMetrics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
