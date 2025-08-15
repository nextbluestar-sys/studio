"use client"

import { useState } from "react"
import { Clock, LogIn, LogOut, MoreHorizontal, Edit } from "lucide-react"

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Input } from "@/components/ui/input"

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>(initialAttendance)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"clockIn" | "clockOut">("clockIn")
  const [selectedStaffId, setSelectedStaffId] = useState<string>("")
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Attendance | null>(null);

  const getStatusBadgeVariant = (status: Attendance['status']) => {
    switch (status) {
      case "Present":
        return "default"
      case "Absent":
        return "destructive"
      case "On Leave":
      case "Paid Leave":
      case "Half Day":
        return "secondary"
      case "Holiday":
      case "Weekly Off":
        return "outline"
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

  const openEditDialog = (record: Attendance) => {
    setEditingRecord(record);
    setEditDialogOpen(true);
  }

  const handleUpdateAttendance = () => {
    if(!editingRecord) return;

    setAttendance(prev => prev.map(rec => rec.id === editingRecord.id ? editingRecord : rec));
    toast({
      title: "Attendance Updated",
      description: `Record for ${editingRecord.staff.name} on ${editingRecord.date} has been updated.`,
    });
    setEditDialogOpen(false);
    setEditingRecord(null);
  }

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

      {/* Clock In/Out Dialog */}
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

      {/* Edit Attendance Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Attendance</DialogTitle>
            <DialogDescription>
                Update the attendance record for {editingRecord?.staff.name} on {editingRecord?.date}.
            </DialogDescription>
          </DialogHeader>
          {editingRecord && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="clockIn" className="text-right">
                  Clock In
                </Label>
                <Input
                  id="clockIn"
                  value={editingRecord.clockIn || ""}
                  onChange={(e) => setEditingRecord({...editingRecord, clockIn: e.target.value})}
                  className="col-span-3"
                  placeholder="HH:MM"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="clockOut" className="text-right">
                  Clock Out
                </Label>
                <Input
                  id="clockOut"
                  value={editingRecord.clockOut || ""}
                  onChange={(e) => setEditingRecord({...editingRecord, clockOut: e.target.value})}
                  className="col-span-3"
                  placeholder="HH:MM"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select 
                  value={editingRecord.status} 
                  onValueChange={(value: Attendance['status']) => setEditingRecord({...editingRecord, status: value})}
                >
                  <SelectTrigger className="col-span-3" id="status">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Paid Leave">Paid Leave</SelectItem>
                    <SelectItem value="Half Day">Half Day</SelectItem>
                    <SelectItem value="Holiday">Holiday</SelectItem>
                    <SelectItem value="Weekly Off">Weekly Off</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateAttendance}>Save Changes</Button>
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
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
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
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openEditDialog(record)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
