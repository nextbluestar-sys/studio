
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "../components/logo"
import { staff } from "@/lib/data"
import { toast } from "@/hooks/use-toast"

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
    <div className="flex min-h-screen w-full flex-wrap text-foreground">
      {/* Left Panel: Branding */}
      <div className="relative flex w-full flex-col items-center justify-center bg-primary p-10 text-primary-foreground md:w-1/2">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary to-accent opacity-80"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <Logo className="mb-4 h-16 w-16" />
          <h1 className="text-4xl font-bold">Bluestar Connect</h1>
          <p className="mt-2 text-lg">Your all-in-one management solution.</p>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex w-full items-center justify-center bg-background p-6 md:w-1/2">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Staff Login</h2>
            <p className="mt-2 text-muted-foreground">
              Enter your username and password to continue.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="Username"
                className="pl-10 h-12"
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
                className="pl-10 h-12"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full text-lg h-12">
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
        </div>
      </div>
    </div>
  )
}
