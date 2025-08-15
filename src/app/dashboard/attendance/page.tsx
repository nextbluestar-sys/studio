import { Clock, LogIn, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { attendance } from "@/lib/data"

export default function AttendancePage() {
  const getStatusBadgeVariant = (status: "Present" | "Absent" | "On Leave") => {
    switch (status) {
      case "Present":
        return "default";
      case "Absent":
        return "destructive";
      case "On Leave":
        return "secondary";
      default:
        return "outline";
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            Track and manage staff attendance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <LogIn className="mr-2 h-4 w-4" />
            Clock In
          </Button>
          <Button variant="destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Clock Out
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Log</CardTitle>
          <CardDescription>
            A record of staff attendance for the last two days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.staff.name}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.clockIn || "N/A"}</TableCell>
                  <TableCell>{record.clockOut || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(record.status)} className={record.status === 'Present' ? 'bg-green-500 text-white' : ''}>
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
