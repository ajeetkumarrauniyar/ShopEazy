"use client";

// import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart4,
  CircleDollarSign,
  Package,
  ShoppingCart,
  Users
} from "lucide-react";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recentSales";
import { Revenue } from "@/components/dashboard/revenue";

// export const metadata: Metadata = {
//   title: "Admin Dashboard",
//   description: "Admin dashboard with analytics, charts, and tables.",
// };

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <div className="flex items-center gap-2">
          <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,780.00</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              8.7% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="flex items-center text-xs text-red-500">
              <ArrowDownIcon className="mr-1 h-3 w-3" />
              3.2% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              12.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              Monthly revenue breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>
              Revenue by channel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Revenue />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              Recent transactions and revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              Tasks that need your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-1.5 text-blue-600 dark:text-blue-400">
                  <BarChart4 className="h-4 w-4" />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Q2 Financial Review</p>
                  <p className="text-xs text-muted-foreground">Due in 2 days</p>
                </div>
                <div className="ml-auto rounded-full px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  Review
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-1.5 text-green-600 dark:text-green-400">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Team Standup Meeting</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                </div>
                <div className="ml-auto rounded-full px-2 py-1 text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  Meeting
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-1.5 text-orange-600 dark:text-orange-400">
                  <Package className="h-4 w-4" />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Inventory Restock</p>
                  <p className="text-xs text-muted-foreground">3 items below threshold</p>
                </div>
                <div className="ml-auto rounded-full px-2 py-1 text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  Action
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
