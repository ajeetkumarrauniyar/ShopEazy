"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Package2,
  Settings,
  ShoppingCart,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarNavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems: SidebarNavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="size-5" />,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="size-5" />,
    },
    {
      title: "Sales",
      href: "/sales",
      icon: <ShoppingCart className="size-5" />,
    },
    {
      title: "Inventory",
      href: "/inventory",
      icon: <Package2 className="size-5" />,
    },
    {
      title: "Customers",
      href: "/customers",
      icon: <Users className="size-5" />,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: <FileText className="size-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="size-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "bg-background flex h-full flex-col border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        {!collapsed && (
          <Link
            href="/"
            className="text-primary flex items-center gap-2 text-xl font-bold"
          >
            <LayoutDashboard className="size-6" />
            <span>AdminHub</span>
          </Link>
        )}
        {collapsed && (
          <div className="flex w-full justify-center">
            <LayoutDashboard className="text-primary size-6" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
                collapsed && "justify-center",
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-2">
        <Button
          variant="ghost"
          className="w-full justify-center"
          onClick={() => setCollapsed(!collapsed)}
          size="sm"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
    </aside>
  );
}
