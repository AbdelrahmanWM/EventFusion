"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { feedbackRatingData, recentFeedback } from "@/lib/analytics/feedbackData"

export function AttendeeFeedback() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Distribution</CardTitle>
                <CardDescription>Breakdown of attendee ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={feedbackRatingData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="rating" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Number of Ratings" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Summary</CardTitle>
                <CardDescription>Overall event satisfaction metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">4.7/5</div>
                    <div className="flex justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Based on 342 responses</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center">
                        <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-xl font-bold">92%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Positive Feedback</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center">
                        <ThumbsDown className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-xl font-bold">8%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Areas for Improvement</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>Latest comments from attendees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <Avatar className="h-9 w-9 border">
                        <MessageSquare className="h-4 w-4 translate-2" />
                      </Avatar>
                      <div className="ml-4 space-y-1 flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">{feedback.attendee}</p>
                          <Badge
                            variant="outline"
                            className={
                              feedback.sentiment === "positive"
                                ? "bg-green-50 text-green-700"
                                : feedback.sentiment === "negative"
                                  ? "bg-red-50 text-red-700"
                                  : feedback.sentiment === "mixed"
                                    ? "bg-orange-50 text-orange-700"
                                    : "bg-gray-50 text-gray-700"
                            }
                          >
                            {feedback.sentiment}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {feedback.session} • {feedback.time}
                        </p>
                        <div className="flex mt-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm">{feedback.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

