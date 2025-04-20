"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sales = [
  {
    id: "INV-001",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "JS",
    },
    amount: "$430.00",
    status: "Paid",
    date: "2023-04-17",
  },
  {
    id: "INV-002",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "SJ",
    },
    amount: "$258.50",
    status: "Pending",
    date: "2023-04-16",
  },
  {
    id: "INV-003",
    customer: {
      name: "Michael Brown",
      email: "mbrown@example.com",
      avatar: "MB",
    },
    amount: "$1,200.00",
    status: "Paid",
    date: "2023-04-15",
  },
  {
    id: "INV-004",
    customer: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "ED",
    },
    amount: "$680.25",
    status: "Paid",
    date: "2023-04-14",
  },
  {
    id: "INV-005",
    customer: {
      name: "David Wilson",
      email: "dwilson@example.com",
      avatar: "DW",
    },
    amount: "$542.00",
    status: "Pending",
    date: "2023-04-13",
  },
];

export function RecentSales() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell className="font-medium">{sale.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{sale.customer.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{sale.customer.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {sale.customer.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{sale.amount}</TableCell>
              <TableCell>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    sale.status === "Paid"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {sale.status}
                </div>
              </TableCell>
              <TableCell>{sale.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center">
        <button className="text-primary text-sm font-medium hover:underline">
          View all transactions
        </button>
      </div>
    </div>
  );
}
