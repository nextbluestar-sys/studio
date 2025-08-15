
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Staff } from "@/lib/types"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const [user, setUser] = useState<{ role: string; user?: Staff } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  const displayName = user.role === "Admin" ? "Administrator" : user.user?.name || "Staff"
  const displayEmail = user.role === "Admin" ? "admin@bluestarconnect.com" : user.user?.email
  const displayUsername = user.role === "Admin" ? "admin" : user.user?.username

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
              <AvatarImage src={`https://avatar.vercel.sh/${displayName}.png`} alt={displayName} />
              <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-3xl">{displayName}</CardTitle>
              <CardDescription>{displayEmail}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Account Information</h3>
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
          <div className="flex justify-end pt-4">
            <Button>Update Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
