
"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "../components/logo"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here.
    // For this demo, we'll assume login is always successful for the admin.
    localStorage.setItem('loggedInUser', JSON.stringify({ role: 'Admin' }));
    toast({
      title: "Admin Login Successful",
      description: "Welcome back!",
    });
    router.push("/dashboard");
  };

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
            <h2 className="text-3xl font-bold tracking-tight">Admin Login</h2>
            <p className="mt-2 text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="email" type="email" placeholder="email@example.com" className="pl-10 h-12" required defaultValue="admin@bluestarconnect.com" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="password" type="password" placeholder="********" className="pl-10 h-12" required defaultValue="adminpassword" />
            </div>
              <Button type="submit" className="w-full text-lg h-12">
                Login
              </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Are you a staff member?{' '}
              <Link href="/staff-login" className="font-medium text-primary hover:underline">
                Staff Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
