"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, FileWarning, CalendarCheck, Briefcase } from "lucide-react";

import { customers, complaints, attendance, staff } from "@/lib/data";
import { useEffect, useState } from "react";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    openComplaints: 0,
    presentToday: 0,
    totalComplaints: 0,
    totalStaffForToday: 0
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const openComplaints = complaints.filter(
      (c) => c.status === "Open" || c.status === "In Progress"
    ).length;

    const presentToday = attendance.filter(
      (a) => a.date === today && a.status === "Present"
    ).length;
      
    const totalStaffForToday = staff.length;

    setStats({
      openComplaints,
      presentToday,
      totalComplaints: complaints.length,
      totalStaffForToday
    });
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{customers.length}</div>
          <p className="text-xs text-muted-foreground">+2 since last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{staff.length}</div>
          <p className="text-xs text-muted-foreground">company employees</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Complaints</CardTitle>
          <FileWarning className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.openComplaints}</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalComplaints} total complaints
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Attendance Today</CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.presentToday}</div>
          <p className="text-xs text-muted-foreground">
            out of {stats.totalStaffForToday} staff members
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
