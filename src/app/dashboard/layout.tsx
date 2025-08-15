
"use client"

import Link from "next/link";
import {
  Clock,
  FileText,
  LayoutDashboard,
  Package,
  Users,
  Briefcase,
  AreaChart,
  Settings,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import Header from "./components/header";
import Logo from "../components/logo";
import type { Staff } from "@/lib/types";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ role: string, user?: Staff } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isAdmin = user?.role === 'Admin';
  const isStaff = user?.role === 'Staff';


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7 text-primary" />
            <h1 className="text-xl font-semibold text-sidebar-foreground">
              Bluestar Connect
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {isAdmin && (
              <SidebarMenuItem>
                <Link href="/dashboard" passHref>
                  <SidebarMenuButton tooltip="Dashboard">
                    <LayoutDashboard />
                    Dashboard
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )}
            <SidebarMenuItem>
              <Link href="/dashboard/customers" passHref>
                <SidebarMenuButton tooltip="Customers">
                  <Users />
                  Customers
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            {isAdmin && (
              <SidebarMenuItem>
                <Link href="/dashboard/staff" passHref>
                  <SidebarMenuButton tooltip="Staff">
                    <Briefcase />
                    Staff
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )}
            <SidebarMenuItem>
              <Link href="/dashboard/complaints" passHref>
                <SidebarMenuButton tooltip="Complaints">
                  <FileText />
                  Complaints
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/attendance" passHref>
                <SidebarMenuButton tooltip="Attendance">
                  <Clock />
                  Attendance
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            {isAdmin && (
              <>
                <SidebarMenuItem>
                  <Link href="/dashboard/attendance/configuration" passHref>
                    <SidebarMenuButton tooltip="Attendance Configuration">
                      <Settings />
                      Attendance Config
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/reports" passHref>
                    <SidebarMenuButton tooltip="Reports">
                      <AreaChart />
                      Reports
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/products" passHref>
                    <SidebarMenuButton tooltip="Products">
                      <Package />
                      Products
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </>
            )}
             <SidebarMenuItem>
                <Link href="/dashboard/profile" passHref>
                  <SidebarMenuButton tooltip="Manage Profile">
                    <User />
                    Manage Profile
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/40">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
