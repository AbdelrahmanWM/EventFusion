"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { registrationsByDemographic, registrationTimeData } from "@/lib/analytics/participationMetricsData"

export function ParticipationMetrics() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="timeline">
        <TabsList>
          <TabsTrigger value="timeline">Registration Timeline</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Registration Timeline</CardTitle>
              <CardDescription>Registration patterns leading up to the event</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={registrationTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="registrations"
                    name="Weekly Registrations"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="cumulativePercentage"
                    name="Cumulative (%)"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-sky-600">1,248</div>
                  <p className="text-sm text-muted-foreground">Total Registrations</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sky-600">138.7</div>
                  <p className="text-sm text-muted-foreground">Average Per Week</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sky-600">223</div>
                  <p className="text-sm text-muted-foreground">Peak (4 Weeks Prior)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registration Conversion</CardTitle>
              <CardDescription>From initial interest to completed registration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Website Visitors</span>
                    <span>5,000</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Registration Page Views</span>
                    <span>2,735 (46.8%)</span>
                  </div>
                  <Progress value={46.8} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Started Registration</span>
                    <span>1,890 (32.4%)</span>
                  </div>
                  <Progress value={32.4} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completed Registration</span>
                    <span>1,248 (21.4%)</span>
                  </div>
                  <Progress value={21.4} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            {registrationsByDemographic.map((demographic, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{demographic.category} Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {demographic.data.map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.name}</span>
                          <span>
                            {item.value} ({Math.round((item.value / 1248) * 100)}%)
                          </span>
                        </div>
                        <Progress value={(item.value / 1248) * 100} className="h-2 [&>div]:!bg-indigo-500"/>
                      </div>
                    ))}
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

