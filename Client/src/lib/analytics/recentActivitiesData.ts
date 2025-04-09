import { UserPlus, Calendar, Users, MessageSquare } from "lucide-react"

export const activities = [
    {
      id: "1",
      description: "Sarah Johnson registered",
      time: "2 minutes ago",
      type: "registration",
      icon: UserPlus,
    },
    {
      id: "2",
      description: "Michael Chen checked in to 'Keynote Address'",
      time: "5 minutes ago",
      type: "session",
      icon: Calendar,
    },
    {
      id: "3",
      description: "Emma Wilson registered",
      time: "12 minutes ago",
      type: "registration",
      icon: UserPlus,
    },
    {
      id: "4",
      description: "David Brown checked in to 'Workshop A'",
      time: "15 minutes ago",
      type: "session",
      icon: Calendar,
    },
    {
      id: "5",
      description: "Lisa Garcia submitted feedback",
      time: "18 minutes ago",
      type: "feedback",
      icon: MessageSquare,
    },
    {
      id: "6",
      description: "John Smith joined networking session",
      time: "25 minutes ago",
      type: "networking",
      icon: Users,
    },
  ]