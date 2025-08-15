
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Logo from "../components/logo"
import { staff } from "@/lib/data"
import { toast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"

export default function StaffLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const staffMember = staff.find(
      (s) => s.username === username && s.password === password
    )

    if (staffMember) {
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'Staff', user: staffMember }));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${staffMember.name}!`,
      })
      router.push("/dashboard")
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid username or password.",
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Bluestar Connect</h1>
          </div>
          <CardTitle className="text-2xl">Staff Login</CardTitle>
          <CardDescription>
            Enter your username and password to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="Username"
                className="pl-10"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="pl-10"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full text-lg">
              Login
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Are you an administrator?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Admin Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
