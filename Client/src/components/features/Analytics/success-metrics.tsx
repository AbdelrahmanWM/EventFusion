"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { engagementData, comparativeData, sessionComparisonData } from "@/lib/analytics/successData"

export function SuccessMetrics() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="engagement">
        <TabsList>
          <TabsTrigger value="engagement">Engagement Metrics</TabsTrigger>
          <TabsTrigger value="comparison">Event Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {engagementData.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {typeof metric.current === "number" && metric.current % 1 === 0
                      ? metric.current
                      : `${metric.current}%`}
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge
                      variant="outline"
                      className={metric.status === "positive" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
                    >
                      {metric.change}
                    </Badge>
                    <span className="text-sm text-muted-foreground ml-2">vs. previous event</span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Event</span>
                      <span>
                        {typeof metric.current === "number" && metric.current % 1 === 0
                          ? metric.current
                          : `${metric.current}%`}
                      </span>
                    </div>
                    <Progress
                      value={
                        typeof metric.current === "number" && metric.current % 1 === 0
                          ? (metric.current / (metric.previous * 1.5)) * 100
                          : metric.current
                      }
                      className="h-2"
                    />

                    <div className="flex justify-between text-sm mb-1 mt-3">
                      <span>Previous Event</span>
                      <span>
                        {typeof metric.previous === "number" && metric.previous % 1 === 0
                          ? metric.previous
                          : `${metric.previous}%`}
                      </span>
                    </div>
                    <Progress
                      value={
                        typeof metric.previous === "number" && metric.previous % 1 === 0
                          ? (metric.previous / (metric.previous * 1.5)) * 100
                          : metric.previous
                      }
                      className="h-2 bg-gray-200"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Session Engagement Comparison</CardTitle>
              <CardDescription>Current vs. previous event</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sessionComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" name="Current Event" fill="#8884d8" />
                  <Bar dataKey="previous" name="Previous Event" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {comparativeData.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metric.name === "Satisfaction Score"
                      ? `${metric.current}/5`
                      : metric.name === "Attendance Rate" || metric.name === "Session Engagement"
                        ? `${metric.current}%`
                        : metric.current}
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge
                      variant="outline"
                      className={
                        metric.change.startsWith("+") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                      }
                    >
                      {metric.change}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-2">vs. previous</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

