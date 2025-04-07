// Define category options with icons
import {
  Plus,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Calendar,
  Trash2,
  Edit2,
  PieChart,
  Moon,
  Sun,
  Settings,
  HelpCircle,
  TrendingUp,
  DollarSign,
  BookOpen,
  Coffee,
  Home,
  ShoppingBag,
  Handshake,
  Gift,
  RectangleEllipsis,
  Utensils,
  Laptop,
  Mic,
  Megaphone,
} from "lucide-react";

export const incomeCategories = [
    { name: "Event Ticket Sales", icon: <DollarSign className="h-4 w-4" /> }, // 
    { name: "Sponsorship", icon: <Handshake className="h-4 w-4" /> },
    { name: "Reimbursement", icon: <ArrowUpRight className="h-4 w-4" /> },
    { name: "Merchandise Sales", icon: <ShoppingBag className="h-4 w-4" /> },
    { name: "Donations", icon: <Gift className="h-4 w-4" /> },
    { name: "Grants & Subsidies", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Other", icon: <RectangleEllipsis className="h-4 w-4" /> },
  ];

export const expenseCategories = [
    { name: "Venue & Setup", icon: <Home className="h-4 w-4" /> },
    { name: "Food & Catering", icon: <Utensils className="h-4 w-4" /> },
    { name: "Promotional Materials", icon: <Megaphone className="h-4 w-4" /> },
    { name: "Speaker & Guest Fees", icon: <Mic className="h-4 w-4" /> },
    { name: "Sponsorship Deliverables", icon: <Handshake className="h-4 w-4" /> },
    { name: "Other", icon: <RectangleEllipsis className="h-4 w-4" /> },
  ];