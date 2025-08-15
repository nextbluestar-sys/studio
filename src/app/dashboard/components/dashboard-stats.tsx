import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, FileWarning, CalendarCheck, Briefcase } from "lucide-react";

import { customers, complaints, attendance, staff } from "@/lib/data";

export default function DashboardStats() {
  const openComplaints = complaints.filter(
    (c) => c.status === "Open" || c.status === "In Progress"
  ).length;

  const presentToday = attendance.filter(
    (a) => a.date === "2024-07-12" && a.status === "Present"
  ).length;

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
          <div className="text-2xl font-bold">{openComplaints}</div>
          <p className="text-xs text-muted-foreground">
            {complaints.length} total complaints
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Attendance Today</CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{presentToday}</div>
          <p className="text-xs text-muted-foreground">
            out of {attendance.filter(a => a.date === "2024-07-12").length} staff members
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
