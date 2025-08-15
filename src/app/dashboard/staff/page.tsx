"use client"

import { useState } from "react"
import { MoreHorizontal, PlusCircle } from "lucide-react"

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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { staff as initialStaff } from "@/lib/data"
import { Staff } from "@/lib/types"
import StaffForm from "./staff-form"

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>(initialStaff)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [deletingStaff, setDeletingStaff] = useState<Staff | null>(null)

  const handleAddStaff = (newStaffMember: Omit<Staff, "id">) => {
    const newStaff = { ...newStaffMember, id: `staff-${Date.now()}` }
    setStaff((prevStaff) => [...prevStaff, newStaff])
    setDialogOpen(false)
  }

  const handleUpdateStaff = (updatedStaff: Staff) => {
    setStaff((prevStaff) =>
      prevStaff.map((s) => (s.id === updatedStaff.id ? updatedStaff : s))
    )
    setEditingStaff(null)
    setDialogOpen(false)
  }

  const handleDeleteStaff = () => {
    if (deletingStaff) {
      setStaff((prevStaff) => prevStaff.filter((s) => s.id !== deletingStaff.id))
      setDeletingStaff(null)
    }
  }

  const openEditDialog = (staffMember: Staff) => {
    setEditingStaff(staffMember)
    setDialogOpen(true)
  }

  const openAddDialog = () => {
    setEditingStaff(null)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
          <p className="text-muted-foreground">Manage your staff members.</p>
        </div>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={(isOpen) => {
          setDialogOpen(isOpen)
          if (!isOpen) {
            setEditingStaff(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
            </DialogTitle>
            <DialogDescription>
              {editingStaff
                ? "Update the details for this staff member."
                : "Fill in the details to add a new staff member."}
            </DialogDescription>
          </DialogHeader>
          <StaffForm
            onSave={editingStaff ? handleUpdateStaff : handleAddStaff}
            initialData={editingStaff}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingStaff}
        onOpenChange={() => setDeletingStaff(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              staff member: {deletingStaff?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteStaff}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card>
        <CardHeader>
          <CardTitle>Staff List</CardTitle>
          <CardDescription>A list of all staff members.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((staffMember) => (
                <TableRow key={staffMember.id}>
                  <TableCell className="font-medium">
                    {staffMember.name}
                  </TableCell>
                  <TableCell>{staffMember.email}</TableCell>
                  <TableCell>{staffMember.username}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{staffMember.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openEditDialog(staffMember)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeletingStaff(staffMember)}
                          className="text-destructive"
                        >
                          Delete
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
