
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Staff } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EditProfileForm from "./edit-profile-form"
import { toast } from "@/hooks/use-toast"
import { staff as allStaff } from "@/lib/data"
import DigitalIdCard from "./digital-id-card"
import { CreditCard } from "lucide-react"
import ChangePasswordForm from "./change-password-form"

export default function ProfilePage() {
  const [user, setUser] = useState<{ role: string; user?: Staff } | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [idCardOpen, setIdCardOpen] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleProfileUpdate = (updatedUser: Staff) => {
    if (!user) return

    const newUserState = { ...user, user: updatedUser };
    setUser(newUserState)
    localStorage.setItem("loggedInUser", JSON.stringify(newUserState))
    
    // Also update the staff array in data.ts for persistence across sessions in this demo
    const staffIndex = allStaff.findIndex(s => s.id === updatedUser.id)
    if(staffIndex > -1) {
      allStaff[staffIndex] = updatedUser;
    }

    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    })
    setEditDialogOpen(false)
  }

  const handlePasswordChange = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been successfully updated.",
    })
    setPasswordDialogOpen(false);
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const getInitials = (name: string) => {
    if (!name) return ""
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  const isStaff = user.role === "Staff" && user.user
  const isAdmin = user.role === "Admin"
  const displayName = isAdmin ? "Administrator" : user.user?.name || "Staff"
  const displayEmail = isAdmin ? "admin@bluestarconnect.com" : user.user?.email
  const displayUsername = isAdmin ? "admin" : user.user?.username
  const displayPhone = isAdmin ? "N/A" : user.user?.phone
  const displayAddress = isAdmin ? "N/A" : user.user?.address
  const avatarSrc = user.user?.photo || `https://avatar.vercel.sh/${displayName}.png`

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your account details.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarSrc} alt={displayName} />
              <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-3xl">{displayName}</CardTitle>
              <CardDescription>{displayEmail}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Account Information</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Username:</span>
                  <span>{displayUsername}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Role:</span>
                  <Badge variant={user.role === 'Admin' ? 'destructive' : 'secondary'}>{user.user?.role || user.role}</Badge>
                </div>
              </div>
            </div>
            {isStaff && (
              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contact Number:</span>
                    <span>{displayPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address:</span>
                    <span className="text-right max-w-xs truncate">{displayAddress}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end pt-4 gap-2">
            {isStaff && (
              <>
                <Dialog open={idCardOpen} onOpenChange={setIdCardOpen}>
                  <DialogTrigger asChild>
                      <Button variant="outline"><CreditCard className="mr-2 h-4 w-4" />View ID Card</Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-sm">
                      {user.user && <DigitalIdCard staff={user.user} />}
                  </DialogContent>
                </Dialog>
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                      <Button>Update Profile</Button>
                  </DialogTrigger>
                  <DialogContent>
                      <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>
                              Update your personal information. Click save when you're done.
                          </DialogDescription>
                      </DialogHeader>
                      {user.user && (
                          <EditProfileForm initialData={user.user} onSave={handleProfileUpdate} />
                      )}
                  </DialogContent>
                </Dialog>
              </>
            )}
            {isAdmin && (
              <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Change Password</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Admin Password</DialogTitle>
                    <DialogDescription>
                      Enter a new password for the admin account.
                    </DialogDescription>
                  </DialogHeader>
                  <ChangePasswordForm onSave={handlePasswordChange} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
