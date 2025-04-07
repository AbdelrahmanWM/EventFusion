"use client";
import { incomeCategories } from "@/lib/financeCategory";
import { expenseCategories } from "@/lib/financeCategory";
import { useState, useEffect, useCallback } from "react";
import { timePeriods, COLORS } from "@/lib/financeData";
import {
  Plus,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Calendar,
  Trash2,
  Edit2,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

// Define transaction type
type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
};

export default function FinanceTracker() {
  // State for transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  // State for form
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>(
    {
      type: "expense",
      amount: 0,
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    }
  );

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All Time");

  // State for analytics view
  const [analyticsView, setAnalyticsView] = useState("overview");

  // State to track if data is loading
  const [isLoading, setIsLoading] = useState(true);

  // Load transactions from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      try {
        const parsed = JSON.parse(savedTransactions);
        setTransactions(parsed);
      } catch (e) {
        console.error("Error parsing saved transactions:", e);
        setTransactions([]);
      }
    }
    setIsLoading(false);
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  // Apply filters to transactions - memoized to prevent unnecessary recalculations
  const applyFilters = useCallback(() => {
    let filtered = [...transactions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    // Apply time filter
    if (timeFilter !== "All Time") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startDate = new Date(today);

      if (timeFilter === "This Week") {
        startDate.setDate(today.getDate() - today.getDay());
      } else if (timeFilter === "This Month") {
        startDate.setDate(1);
      } else if (timeFilter === "Last Month") {
        startDate.setMonth(today.getMonth() - 1);
        startDate.setDate(1);
        const endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        filtered = filtered.filter((t) => {
          const transactionDate = new Date(t.date);
          return transactionDate >= startDate && transactionDate <= endDate;
        });
      } else if (timeFilter === "Last 3 Months") {
        startDate.setMonth(today.getMonth() - 3);
        filtered = filtered.filter((t) => new Date(t.date) >= startDate);
      }
    }

    return filtered;
  }, [transactions, searchTerm, categoryFilter, timeFilter]);

  // Update filtered transactions whenever filters or transactions change
  useEffect(() => {
    setFilteredTransactions(applyFilters());
  }, [applyFilters]);

  // Calculate balance
  const calculateBalance = useCallback(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === "income") {
        return acc + transaction.amount;
      } else {
        return acc - transaction.amount;
      }
    }, 0);
  }, [transactions]);

  // Calculate total income
  const calculateTotalIncome = useCallback(() => {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  // Calculate total expenses
  const calculateTotalExpenses = useCallback(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  // Add new transaction
  const addTransaction = () => {
    // Validate form
    if (
      !newTransaction.category ||
      !newTransaction.description ||
      newTransaction.amount <= 0
    ) {
      alert("Please fill in all fields with valid values");
      return;
    }

    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    };

    setTransactions((prev) => [transaction, ...prev]);
    setNewTransaction({
      type: "expense",
      amount: 0,
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
    setIsAddDialogOpen(false);
  };

  // Edit transaction
  const startEditTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setNewTransaction({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      date: transaction.date,
    });
    setIsEditDialogOpen(true);
  };

  // Update transaction
  const updateTransaction = () => {
    if (!currentTransaction) return;

    // Validate form
    if (
      !newTransaction.category ||
      !newTransaction.description ||
      newTransaction.amount <= 0
    ) {
      alert("Please fill in all fields with valid values");
      return;
    }

    setTransactions((prev) =>
      prev.map((t) =>
        t.id === currentTransaction.id
          ? { ...newTransaction, id: currentTransaction.id }
          : t
      )
    );

    setIsEditDialogOpen(false);
    setCurrentTransaction(null);
  };

  // Delete transaction
  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Prepare data for category chart
  const prepareCategoryData = useCallback(() => {
    const categoryMap = new Map<string, number>();

    filteredTransactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const current = categoryMap.get(t.category) || 0;
        categoryMap.set(t.category, current + t.amount);
      });

    return Array.from(categoryMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value); // Sort by value descending
  }, [filteredTransactions]);

  // Prepare data for monthly chart
  const prepareMonthlyData = useCallback(() => {
    const monthlyData = new Map<string, { income: number; expense: number }>();

    // Initialize with last 6 months
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey =
        month.toLocaleString("default", { month: "short" }) +
        " " +
        month.getFullYear();
      monthlyData.set(monthKey, { income: 0, expense: 0 });
    }

    // Fill with transaction data
    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey =
        date.toLocaleString("default", { month: "short" }) +
        " " +
        date.getFullYear();

      if (monthlyData.has(monthKey)) {
        const current = monthlyData.get(monthKey)!;
        if (t.type === "income") {
          current.income += t.amount;
        } else {
          current.expense += t.amount;
        }
        monthlyData.set(monthKey, current);
      }
    });

    return Array.from(monthlyData.entries()).map(([name, data]) => ({
      name,
      Income: data.income,
      Expenses: data.expense,
      Balance: data.income - data.expense,
    }));
  }, [transactions]);

  // Prepare data for sponsorship chart
  const prepareMonthlySponsorshipData = useCallback(() => {
    const monthlyData = new Map<string, number>();

    // Initialize the last 6 months
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey =
        month.toLocaleString("default", { month: "short" }) +
        " " +
        month.getFullYear();
      monthlyData.set(monthKey, 0);
    }

    // Sum sponsorship incomes for each month
    transactions
      .filter((t) => t.type === "income" && t.category === "Sponsorship")
      .forEach((t) => {
        const date = new Date(t.date);
        const monthKey =
          date.toLocaleString("default", { month: "short" }) +
          " " +
          date.getFullYear();

        if (monthlyData.has(monthKey)) {
          monthlyData.set(monthKey, monthlyData.get(monthKey)! + t.amount);
        }
      });

    return Array.from(monthlyData.entries()).map(([name, amount]) => ({
      name,
      Sponsorships: amount,
    }));
  }, [transactions]);

  // Prepare data for daily spending
  const prepareDailyData = useCallback(() => {
    const dailyData = new Map<string, number>();

    // Get last 14 days
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const dayKey = day.toISOString().split("T")[0];
      dailyData.set(dayKey, 0);
    }

    // Fill with transaction data
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        if (dailyData.has(t.date)) {
          dailyData.set(t.date, (dailyData.get(t.date) || 0) + t.amount);
        }
      });

    return Array.from(dailyData.entries()).map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      amount,
    }));
  }, [transactions]);

  // Calculate spending trends
  const calculateTrends = useCallback(() => {
    const monthlyData = prepareMonthlyData();

    if (monthlyData.length < 2) return { incomeChange: 0, expenseChange: 0 };

    const currentMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData[monthlyData.length - 2];

    const incomeChange =
      previousMonth.Income === 0
        ? 100
        : ((currentMonth.Income - previousMonth.Income) /
            previousMonth.Income) *
          100;

    const expenseChange =
      previousMonth.Expenses === 0
        ? 100
        : ((currentMonth.Expenses - previousMonth.Expenses) /
            previousMonth.Expenses) *
          100;

    return { incomeChange, expenseChange };
  }, [prepareMonthlyData]);

  // Get top spending categories
  const getTopCategories = useCallback(() => {
    return prepareCategoryData().slice(0, 3);
  }, [prepareCategoryData]);

  // Get category icon
  const getCategoryIcon = (category: string, type: "income" | "expense") => {
    if (type === "income") {
      const found = incomeCategories.find((c) => c.name === category);
      return found ? found.icon : <DollarSign className="h-4 w-4" />;
    } else {
      const found = expenseCategories.find((c) => c.name === category);
      return found ? found.icon : <DollarSign className="h-4 w-4" />;
    }
  };

  return (
    <div className={`min-h-screen bg-background`}>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              SEES Finance Tracker -{" "}
              <span className="text-blue-600">StartUp Expo2025</span>{" "}
              {/* Make Event Name dynamique */}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Transaction</DialogTitle>
                  <DialogDescription>
                    Enter the details of your transaction below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="transaction-type">Type</Label>
                      <Select
                        value={newTransaction.type}
                        onValueChange={(value: "income" | "expense") =>
                          setNewTransaction({ ...newTransaction, type: value })
                        }
                      >
                        <SelectTrigger id="transaction-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="transaction-amount">Amount</Label>
                      <Input
                        id="transaction-amount"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={newTransaction.amount || ""}
                        onChange={(e) =>
                          setNewTransaction({
                            ...newTransaction,
                            amount: Number.parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="transaction-category">Category</Label>
                    <Select
                      value={newTransaction.category}
                      onValueChange={(value) =>
                        setNewTransaction({
                          ...newTransaction,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger id="transaction-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {newTransaction.type === "income"
                          ? incomeCategories.map((cat) => (
                              <SelectItem key={cat.name} value={cat.name}>
                                <div className="flex items-center">
                                  {cat.icon}
                                  <span className="ml-2">{cat.name}</span>
                                </div>
                              </SelectItem>
                            ))
                          : expenseCategories.map((cat) => (
                              <SelectItem key={cat.name} value={cat.name}>
                                <div className="flex items-center">
                                  {cat.icon}
                                  <span className="ml-2">{cat.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="transaction-description">Description</Label>
                    <Input
                      id="transaction-description"
                      value={newTransaction.description}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="transaction-date">Date</Label>
                    <Input
                      id="transaction-date"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={addTransaction}>Add Transaction</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Transaction</DialogTitle>
                  <DialogDescription>
                    Update the details of your transaction.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-transaction-type">Type</Label>
                      <Select
                        value={newTransaction.type}
                        onValueChange={(value: "income" | "expense") =>
                          setNewTransaction({ ...newTransaction, type: value })
                        }
                      >
                        <SelectTrigger id="edit-transaction-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-transaction-amount">Amount</Label>
                      <Input
                        id="edit-transaction-amount"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={newTransaction.amount || ""}
                        onChange={(e) =>
                          setNewTransaction({
                            ...newTransaction,
                            amount: Number.parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="edit-transaction-category">Category</Label>
                    <Select
                      value={newTransaction.category}
                      onValueChange={(value) =>
                        setNewTransaction({
                          ...newTransaction,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger id="edit-transaction-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {newTransaction.type === "income"
                          ? incomeCategories.map((cat) => (
                              <SelectItem key={cat.name} value={cat.name}>
                                <div className="flex items-center">
                                  {cat.icon}
                                  <span className="ml-2">{cat.name}</span>
                                </div>
                              </SelectItem>
                            ))
                          : expenseCategories.map((cat) => (
                              <SelectItem key={cat.name} value={cat.name}>
                                <div className="flex items-center">
                                  {cat.icon}
                                  <span className="ml-2">{cat.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-transaction-description">
                      Description
                    </Label>
                    <Input
                      id="edit-transaction-description"
                      value={newTransaction.description}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-transaction-date">Date</Label>
                    <Input
                      id="edit-transaction-date"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={updateTransaction}>
                    Update Transaction
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  calculateBalance() >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                ${calculateBalance().toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Current financial balance
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Income
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                ${calculateTotalIncome().toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total money coming in
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expenses
              </CardTitle>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                ${calculateTotalExpenses().toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total money going out
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="sponsorships">Sponsorships</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search transactions"
                />
              </div>
              <div className="flex gap-2 flex-wrap md:flex-nowrap">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Income" disabled>
                      -- Income --
                    </SelectItem>
                    {incomeCategories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name}>
                        <div className="flex items-center">
                          {cat.icon}
                          <span className="ml-2">{cat.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                    <SelectItem value="Expense" disabled>
                      -- Expenses --
                    </SelectItem>
                    {expenseCategories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name}>
                        <div className="flex items-center">
                          {cat.icon}
                          <span className="ml-2">{cat.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    {timePeriods.map((period) => (
                      <SelectItem key={period} value={period}>
                        {period}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  {filteredTransactions.length} transactions found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                      <p>Loading transactions...</p>
                    </div>
                  ) : filteredTransactions.length > 0 ? (
                    <div className="space-y-4">
                      {filteredTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-2 rounded-full ${
                                transaction.type === "income"
                                  ? "bg-green-100 dark:bg-green-900"
                                  : "bg-red-100 dark:bg-red-900"
                              }`}
                            >
                              {transaction.type === "income" ? (
                                <ArrowUpRight className="h-5 w-5 text-green-500" />
                              ) : (
                                <ArrowDownRight className="h-5 w-5 text-red-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">
                                {transaction.description}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge
                                  variant="outline"
                                  className="flex items-center gap-1"
                                >
                                  {getCategoryIcon(
                                    transaction.category,
                                    transaction.type
                                  )}
                                  {transaction.category}
                                </Badge>
                                <span>
                                  {new Date(
                                    transaction.date
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span
                              className={`font-bold ${
                                transaction.type === "income"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {transaction.type === "income" ? "+" : "-"}$
                              {transaction.amount.toFixed(2)}
                            </span>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  startEditTransaction(transaction)
                                }
                                aria-label={`Edit ${transaction.description}`}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  deleteTransaction(transaction.id)
                                }
                                aria-label={`Delete ${transaction.description}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                      <p className="text-muted-foreground mb-2">
                        No transactions found
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Transaction
                      </Button>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant={analyticsView === "overview" ? "default" : "outline"}
                onClick={() => setAnalyticsView("overview")}
              >
                Overview
              </Button>
              <Button
                variant={analyticsView === "spending" ? "default" : "outline"}
                onClick={() => setAnalyticsView("spending")}
              >
                Spending Analysis
              </Button>
              <Button
                variant={analyticsView === "trends" ? "default" : "outline"}
                onClick={() => setAnalyticsView("trends")}
              >
                Trends
              </Button>
              <Button
                variant={analyticsView === "budget" ? "default" : "outline"}
                onClick={() => setAnalyticsView("budget")}
              >
                Budget Health
              </Button>
            </div>

            {analyticsView === "overview" && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Overview</CardTitle>
                      <CardDescription>
                        Income vs Expenses over the last 6 months
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={prepareMonthlyData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ReTooltip
                            formatter={(value) =>
                              `$${Number(value).toFixed(2)}`
                            }
                          />
                          <Legend />
                          <Bar dataKey="Income" fill="#10b981" name="Income" />
                          <Bar
                            dataKey="Expenses"
                            fill="#ef4444"
                            name="Expenses"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Breakdown</CardTitle>
                      <CardDescription>
                        Detailed breakdown of expenditures
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                          <Pie
                            data={prepareCategoryData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {prepareCategoryData().map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <ReTooltip
                            formatter={(value) =>
                              `$${Number(value).toFixed(2)}`
                            }
                          />
                        </RePieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Spending Summary</CardTitle>
                    <CardDescription>
                      Breakdown of expenses by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prepareCategoryData().map((category, index) => (
                        <div key={category.name} className="flex items-center">
                          <div className="w-full">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium flex items-center gap-1">
                                {getCategoryIcon(category.name, "expense")}
                                {category.name}
                              </span>
                              <span className="text-sm font-medium">
                                ${category.value.toFixed(2)}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div
                                className="h-2.5 rounded-full"
                                style={{
                                  width: `${(
                                    (category.value /
                                      calculateTotalExpenses()) *
                                    100
                                  ).toFixed(0)}%`,
                                  backgroundColor:
                                    COLORS[index % COLORS.length],
                                }}
                                aria-label={`${category.name}: ${(
                                  (category.value / calculateTotalExpenses()) *
                                  100
                                ).toFixed(0)}%`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {analyticsView === "spending" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Spending</CardTitle>
                    <CardDescription>
                      Expenses over the last 14 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={prepareDailyData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ReTooltip
                          formatter={(value) => `$${Number(value).toFixed(2)}`}
                        />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#ef4444"
                          fill="#ef4444"
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Spending Categories</CardTitle>
                      <CardDescription>
                        Expenses where the money goes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {getTopCategories().map((category, index) => (
                          <div
                            key={category.name}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{
                                  backgroundColor:
                                    COLORS[index % COLORS.length],
                                }}
                              ></div>
                              <span>{category.name}</span>
                            </div>
                            <span className="font-medium">
                              ${category.value.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Spending Insights</CardTitle>
                      <CardDescription>Analysis of spendings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {calculateTotalExpenses() > 0 ? (
                          <>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Average daily spending:
                              </p>
                              <p className="text-lg font-medium">
                                ${(calculateTotalExpenses() / 30).toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Biggest expense category:
                              </p>
                              <p className="text-lg font-medium">
                                {prepareCategoryData()[0]?.name || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Percentage of income spent:
                              </p>
                              <p className="text-lg font-medium">
                                {calculateTotalIncome() > 0
                                  ? `${(
                                      (calculateTotalExpenses() /
                                        calculateTotalIncome()) *
                                      100
                                    ).toFixed(0)}%`
                                  : "N/A"}
                              </p>
                            </div>
                          </>
                        ) : (
                          <p className="text-center text-muted-foreground">
                            Add some expenses to see spending insights
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {analyticsView === "trends" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Balance Trend</CardTitle>
                    <CardDescription>
                      Net balance over the last 6 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={prepareMonthlyData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ReTooltip
                          formatter={(value) => `$${Number(value).toFixed(2)}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="Balance"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Income Trend</CardTitle>
                      <CardDescription>
                        How your income has changed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Monthly change
                          </p>
                          <div className="flex items-center gap-1">
                            {calculateTrends().incomeChange > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-red-500" />
                            )}
                            <span
                              className={`text-lg font-medium ${
                                calculateTrends().incomeChange > 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {Math.abs(calculateTrends().incomeChange).toFixed(
                                1
                              )}
                              %
                            </span>
                          </div>
                        </div>
                        <div className="h-16 w-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={prepareMonthlyData().slice(-3)}>
                              <Line
                                type="monotone"
                                dataKey="Income"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Trend</CardTitle>
                      <CardDescription>
                        How your expenses have changed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Monthly change
                          </p>
                          <div className="flex items-center gap-1">
                            {calculateTrends().expenseChange > 0 ? (
                              <TrendingUp className="h-4 w-4 text-red-500" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-green-500" />
                            )}
                            <span
                              className={`text-lg font-medium ${
                                calculateTrends().expenseChange > 0
                                  ? "text-red-500"
                                  : "text-green-500"
                              }`}
                            >
                              {Math.abs(
                                calculateTrends().expenseChange
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                        </div>
                        <div className="h-16 w-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={prepareMonthlyData().slice(-3)}>
                              <Line
                                type="monotone"
                                dataKey="Expenses"
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Spending Pattern Analysis</CardTitle>
                    <CardDescription>
                      Insights based on your transaction history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.length > 5 ? (
                        <>
                          <div className="p-4 border rounded-lg">
                            <h3 className="font-medium">Income Stability</h3>
                            <p className="text-muted-foreground mt-1">
                              {Math.abs(calculateTrends().incomeChange) < 10
                                ? "Income has been relatively stable over the past months."
                                : calculateTrends().incomeChange > 0
                                ? "Income has increased recently, which is a positive trend."
                                : "Income has decreased recently. Consider looking for additional income sources."}
                            </p>
                          </div>

                          <div className="p-4 border rounded-lg">
                            <h3 className="font-medium">Expense Management</h3>
                            <p className="text-muted-foreground mt-1">
                              {calculateTotalIncome() > 0 &&
                              calculateTotalExpenses() /
                                calculateTotalIncome() <
                                0.7
                                ? "The event has spent less than 70% of the income, which is good financial discipline."
                                : calculateTotalIncome() > 0 &&
                                  calculateTotalExpenses() /
                                    calculateTotalIncome() <
                                    0.9
                                ? "The event has spent between 70-90% of the income. Try to reduce expenses to save more."
                                : "Your expenses are close to or exceeding your income. Consider creating a stricter budget."}
                            </p>
                          </div>

                          <div className="p-4 border rounded-lg">
                            <h3 className="font-medium">
                              Top Spending Category
                            </h3>
                            <p className="text-muted-foreground mt-1">
                              {prepareCategoryData()[0]
                                ? `The highest spending category is ${
                                    prepareCategoryData()[0].name
                                  } at $${prepareCategoryData()[0].value.toFixed(
                                    2
                                  )}. ${"Review if this spending aligns with your financial goals."}`
                                : "Add more transactions to see insights about your top spending category."}
                            </p>
                          </div>
                        </>
                      ) : (
                        <p className="text-center text-muted-foreground">
                          Add more transactions to see pattern analysis
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {analyticsView === "budget" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Health</CardTitle>
                    <CardDescription>
                      How well does the event manage its finance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {transactions.length > 0 ? (
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Savings Rate
                            </span>
                            <span className="text-sm font-medium">
                              {calculateTotalIncome() > 0
                                ? `${(
                                    ((calculateTotalIncome() -
                                      calculateTotalExpenses()) /
                                      calculateTotalIncome()) *
                                    100
                                  ).toFixed(0)}%`
                                : "N/A"}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full bg-green-500"
                              style={{
                                width: `${
                                  calculateTotalIncome() > 0
                                    ? Math.min(
                                        ((calculateTotalIncome() -
                                          calculateTotalExpenses()) /
                                          calculateTotalIncome()) *
                                          100,
                                        100
                                      )
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Aim for at least 20% savings rate
                          </p>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Expense to Income Ratio
                            </span>
                            <span className="text-sm font-medium">
                              {calculateTotalIncome() > 0
                                ? `${(
                                    (calculateTotalExpenses() /
                                      calculateTotalIncome()) *
                                    100
                                  ).toFixed(0)}%`
                                : "N/A"}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${
                                calculateTotalIncome() > 0 &&
                                calculateTotalExpenses() /
                                  calculateTotalIncome() <=
                                  0.7
                                  ? "bg-green-500"
                                  : calculateTotalIncome() > 0 &&
                                    calculateTotalExpenses() /
                                      calculateTotalIncome() <=
                                      0.9
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${
                                  calculateTotalIncome() > 0
                                    ? Math.min(
                                        (calculateTotalExpenses() /
                                          calculateTotalIncome()) *
                                          100,
                                        100
                                      )
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Keep expenses below 70% of income
                          </p>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Essential vs. Non-essential Spending
                            </span>
                            <span className="text-sm font-medium">
                              {calculateTotalExpenses() > 0
                                ? `${(
                                    (filteredTransactions
                                      .filter(
                                        (t) =>
                                          t.type === "expense" &&
                                          (t.category === "Venue & Setup" ||
                                            t.category === "Food & Catering" ||
                                            t.category ===
                                              "Promotional Materials" ||
                                            t.category ===
                                              "Speaker & Guest Fees" ||
                                            t.category ===
                                              "Sponsorship Deliverables" ||
                                            t.category === "Other")
                                      )
                                      .reduce((sum, t) => sum + t.amount, 0) /
                                      calculateTotalExpenses()) *
                                    100
                                  ).toFixed(0)}% essential`
                                : "N/A"}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5 flex">
                            <div
                              className="h-2.5 rounded-l-full bg-blue-500"
                              style={{
                                width: `${
                                  calculateTotalExpenses() > 0
                                    ? (filteredTransactions
                                        .filter(
                                          (t) =>
                                            t.type === "expense" &&
                                            (t.category === "Venue & Setup" ||
                                              t.category ===
                                                "Speaker & Guest Fees" ||
                                              t.category ===
                                                "Sponsorship Deliverables")
                                        )
                                        .reduce((sum, t) => sum + t.amount, 0) /
                                        calculateTotalExpenses()) *
                                      100
                                    : 0
                                }%`,
                              }}
                            ></div>
                            <div
                              className="h-2.5 rounded-r-full bg-purple-500"
                              style={{
                                width: `${
                                  calculateTotalExpenses() > 0
                                    ? 100 -
                                      (filteredTransactions
                                        .filter(
                                          (t) => (t) =>
                                            t.type === "expense" &&
                                            (t.category === "Food & Catering" ||
                                              t.category ===
                                                "Promotional Materials" ||
                                              t.category ===
                                                "Sponsorship Deliverables" ||
                                              t.category === "Other")
                                        )
                                        .reduce((sum, t) => sum + t.amount, 0) /
                                        calculateTotalExpenses()) *
                                        100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Balance between essential (blue) and non-essential
                            (purple) spending
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">
                        Add transactions to see your budget health
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Budget Recommendations</CardTitle>
                    <CardDescription>
                      Personalized financial advice based on event data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {transactions.length > 5 ? (
                      <div className="space-y-4">
                        {calculateTotalIncome() > 0 &&
                          calculateTotalExpenses() / calculateTotalIncome() >
                            0.9 && (
                            <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800 rounded-lg">
                              <h3 className="font-medium text-red-800 dark:text-red-300">
                                Reduce Expenses
                              </h3>
                              <p className="text-red-700 dark:text-red-400 mt-1">
                                Expenses are{" "}
                                {(
                                  (calculateTotalExpenses() /
                                    calculateTotalIncome()) *
                                  100
                                ).toFixed(0)}
                                % of the income, which is too high. Look for
                                ways to cut back on non-essential spending.
                              </p>
                            </div>
                          )}

                        {calculateTotalIncome() > 0 &&
                          ((calculateTotalIncome() - calculateTotalExpenses()) /
                            calculateTotalIncome()) *
                            100 <
                            10 && (
                            <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800 rounded-lg">
                              <h3 className="font-medium text-yellow-800 dark:text-yellow-300">
                                Increase Savings
                              </h3>
                              <p className="text-yellow-700 dark:text-yellow-400 mt-1">
                                The event is only saving{" "}
                                {(
                                  ((calculateTotalIncome() -
                                    calculateTotalExpenses()) /
                                    calculateTotalIncome()) *
                                  100
                                ).toFixed(0)}
                                % of total income. Try to increase this to at
                                least 20% for financial security.
                              </p>
                            </div>
                          )}

                        {prepareCategoryData()[0] &&
                          prepareCategoryData()[0].value /
                            calculateTotalExpenses() >
                            0.4 && (
                            <div className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800 rounded-lg">
                              <h3 className="font-medium text-blue-800 dark:text-blue-300">
                                Diversify Spending
                              </h3>
                              <p className="text-blue-700 dark:text-blue-400 mt-1">
                                {prepareCategoryData()[0].name} makes up{" "}
                                {(
                                  (prepareCategoryData()[0].value /
                                    calculateTotalExpenses()) *
                                  100
                                ).toFixed(0)}
                                % of the expenses. Consider if you can balance
                                your spending more evenly.
                              </p>
                            </div>
                          )}

                        {calculateTotalIncome() > 0 &&
                          calculateTotalExpenses() / calculateTotalIncome() <=
                            0.7 &&
                          ((calculateTotalIncome() - calculateTotalExpenses()) /
                            calculateTotalIncome()) *
                            100 >=
                            20 && (
                            <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 rounded-lg">
                              <h3 className="font-medium text-green-800 dark:text-green-300">
                                You're On Track!
                              </h3>
                              <p className="text-green-700 dark:text-green-400 mt-1">
                                The event is saving{" "}
                                {(
                                  ((calculateTotalIncome() -
                                    calculateTotalExpenses()) /
                                    calculateTotalIncome()) *
                                  100
                                ).toFixed(0)}
                                % of total income, which is excellent. Consider
                                setting specific financial goals for your
                                savings.
                              </p>
                            </div>
                          )}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">
                        Add more transactions to receive personalized
                        recommendations
                      </p>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="sponsorships" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sponsorships Balance</CardTitle>
                <CardDescription>
                  Net sponsorship fundings over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={prepareMonthlySponsorshipData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ReTooltip
                      formatter={(value) => `$${Number(value).toFixed(2)}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Sponsorships"
                      stroke="#2ad175"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sponsorships History</CardTitle>
                <CardDescription>
                  {
                    transactions.filter(
                      (t) => t.type === "income" && t.category === "Sponsorship"
                    ).length
                  }{" "}
                  sponsorship transactions found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                      <p>Loading transactions...</p>
                    </div>
                  ) : filteredTransactions.length > 0 ? (
                    <div className="space-y-4">
                      {transactions
                        .filter(
                          (t) =>
                            t.type === "income" && t.category === "Sponsorship"
                        )
                        .map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`p-2 rounded-full bg-green-100 dark:bg-green-900`}
                              >
                                <ArrowUpRight className="h-5 w-5 text-green-500" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {transaction.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Badge
                                    variant="outline"
                                    className="flex items-center gap-1"
                                  >
                                    {getCategoryIcon(
                                      transaction.category,
                                      transaction.type
                                    )}
                                    {transaction.category}
                                  </Badge>
                                  <span>
                                    {new Date(
                                      transaction.date
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={`font-bold text-green-500`}>
                                +{transaction.amount.toFixed(2)}
                              </span>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    startEditTransaction(transaction)
                                  }
                                  aria-label={`Edit ${transaction.description}`}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    deleteTransaction(transaction.id)
                                  }
                                  aria-label={`Delete ${transaction.description}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                      <p className="text-muted-foreground mb-2">
                        No sponsorships found
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Sponsorship Transaction
                      </Button>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
