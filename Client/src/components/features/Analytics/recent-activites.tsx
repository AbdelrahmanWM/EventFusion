import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { activities } from "@/lib/analytics/recentActivitiesData"

export function RecentActivities() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="border">
            <activity.icon className="h-5 w-5 translate-1" />
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.description}</p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
          <div className="ml-auto">
            <Badge
              variant="default"
              className={
                activity.type === "registration"
                  ? "bg-blue-50 text-blue-700"
                  : activity.type === "session"
                    ? "bg-green-50 text-green-700"
                    : activity.type === "feedback"
                      ? "bg-purple-50 text-purple-700"
                      : "bg-orange-50 text-orange-700"
              }
            >
              {activity.type}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

