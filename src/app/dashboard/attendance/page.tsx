"use client"

import { useState } from "react"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { attendance as initialAttendance, staff } from "@/lib/data"
import type { Attendance, Staff } from "@/lib/types"
import { toast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>(initialAttendance)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"clockIn" | "clockOut">("clockIn")
  const [selectedStaffId, setSelectedStaffId] = useState<string>("")

  const getStatusBadgeVariant = (status: "Present" | "Absent" | "On Leave") => {
    switch (status) {
      case "Present":
        return "default"
      case "Absent":
        return "destructive"
      case "On Leave":
        return "secondary"
      default:
        return "outline"
    }
  }

  const openDialog = (mode: "clockIn" | "clockOut") => {
    setDialogMode(mode)
    setSelectedStaffId("")
    setDialogOpen(true)
  }

  const handleAction = () => {
    if (!selectedStaffId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a staff member.",
      })
      return
    }

    const today = new Date().toISOString().split("T")[0]
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const staffMember = staff.find(s => s.id === selectedStaffId) as Staff;

    let updated = false;

    const newAttendance = attendance.map(record => {
      if (record.staff.id === selectedStaffId && record.date === today) {
        updated = true;
        if (dialogMode === 'clockIn') {
          if(record.status === 'Present') {
            toast({
              title: "Already Clocked In",
              description: `${staffMember.name} is already clocked in today.`,
            })
            return record;
          }
          toast({
            title: "Clocked In",
            description: `${staffMember.name} has been clocked in.`,
          })
          return { ...record, clockIn: now, status: 'Present' as const };
        } else { // clockOut
          if(!record.clockIn) {
            toast({
              variant: "destructive",
              title: "Cannot Clock Out",
              description: `${staffMember.name} has not clocked in yet.`,
            })
            return record;
          }
          if(record.clockOut) {
             toast({
              title: "Already Clocked Out",
              description: `${staffMember.name} is already clocked out today.`,
            })
            return record;
          }
          toast({
            title: "Clocked Out",
            description: `${staffMember.name} has been clocked out.`,
          })
          return { ...record, clockOut: now };
        }
      }
      return record;
    });

    if (!updated && dialogMode === 'clockIn') {
      const newRecord: Attendance = {
        id: `att-${Date.now()}`,
        staff: staffMember,
        date: today,
        clockIn: now,
        clockOut: null,
        status: 'Present',
      };
      newAttendance.push(newRecord);
      toast({
        title: "Clocked In",
        description: `${staffMember.name} has been clocked in.`,
      })
    } else if (!updated && dialogMode === 'clockOut') {
        toast({
            variant: "destructive",
            title: "Cannot Clock Out",
            description: `${staffMember.name} has no attendance record for today.`,
        })
    }

    setAttendance(newAttendance);
    setDialogOpen(false);
  }

  // Filter staff who can be clocked in/out today
  const today = new Date().toISOString().split('T')[0];
  const staffForClockIn = staff.filter(s => 
    !attendance.some(a => a.staff.id === s.id && a.date === today && a.status === 'Present' && a.clockIn)
  );
  const staffForClockOut = staff.filter(s => 
    attendance.some(a => a.staff.id === s.id && a.date === today && a.clockIn && !a.clockOut)
  );


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
          <Button variant="outline" onClick={() => openDialog("clockIn")}>
            <LogIn className="mr-2 h-4 w-4" />
            Clock In
          </Button>
          <Button variant="destructive" onClick={() => openDialog("clockOut")}>
            <LogOut className="mr-2 h-4 w-4" />
            Clock Out
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "clockIn" ? "Clock In" : "Clock Out"}
            </DialogTitle>
            <DialogDescription>
              Select a staff member to {dialogMode === "clockIn" ? "clock in" : "clock out"}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="staff-select" className="text-right">
                Staff
              </Label>
              <Select onValueChange={setSelectedStaffId} value={selectedStaffId}>
                <SelectTrigger className="col-span-3" id="staff-select">
                  <SelectValue placeholder="Select a staff member" />
                </SelectTrigger>
                <SelectContent>
                  {(dialogMode === 'clockIn' ? staffForClockIn : staffForClockOut).map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAction}>
              {dialogMode === "clockIn" ? "Clock In" : "Clock Out"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Log</CardTitle>
          <CardDescription>
            A record of staff attendance.
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
              {attendance
                .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.staff.name}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.clockIn || "N/A"}</TableCell>
                    <TableCell>{record.clockOut || "N/A"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(record.status)}
                        className={record.status === "Present" ? "bg-primary text-primary-foreground" : ""}
                      >
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
