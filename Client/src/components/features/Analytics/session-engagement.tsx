"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import sessionData from "@/lib/analytics/sessionData"


const engagementBySessionData = sessionData
  .filter((session) => session.status !== "upcoming")
  .map((session) => ({
    name: session.name.length > 20 ? session.name.substring(0, 20) + "..." : session.name,
    engagement: session.engagement,
  }))

const attendanceData = [
  { name: "Attended", value: 900 },
  { name: "Registered but Absent", value: 340 },
]

const COLORS = ["#4ade80", "#f87171"]

export function SessionEngagement() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Session Engagement Rates</CardTitle>
                <CardDescription>Percentage of active participation during sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engagementBySessionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, "Engagement"]} />
                    <Bar dataKey="engagement" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overall Attendance</CardTitle>
                <CardDescription>Registered vs actual attendance across all sessions</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, "Attendees"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sessionData.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{session.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        session.status === "completed"
                          ? "bg-green-50 text-green-700"
                          : session.status === "in-progress"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-50 text-gray-700"
                      }
                    >
                      {session.status === "completed"
                        ? "Completed"
                        : session.status === "in-progress"
                          ? "In Progress"
                          : "Upcoming"}
                    </Badge>
                  </div>
                  <CardDescription>
                    {session.time} • {session.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {session.status !== "upcoming" ? (
                    <>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Attendance Rate</span>
                            <span>{Math.round((session.attended / session.registered) * 100)}%</span>
                          </div>
                          <Progress value={(session.attended / session.registered) * 100} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Engagement Score</span>
                            <span>{session.engagement}%</span>
                          </div>
                          <Progress value={session.engagement} className="h-2" />
                        </div>

                        {session.feedback > 0 && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Feedback Rating</span>
                              <span>{session.feedback}/5</span>
                            </div>
                            <Progress value={(session.feedback / 5) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="py-4 text-center text-muted-foreground">
                      <p>{session.registered} attendees registered</p>
                      <p className="text-sm mt-1">Session hasn't started yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

