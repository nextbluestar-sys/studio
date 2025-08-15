import Link from "next/link"
import { Lock, Mail } from "lucide-react"

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

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Bluestar Connect</h1>
          </div>
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="email" type="email" placeholder="email@example.com" className="pl-10" required defaultValue="user@bluestarconnect.com" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="password" type="password" placeholder="********" className="pl-10" required defaultValue="userpassword" />
            </div>
            <Link href="/dashboard">
              <Button type="submit" className="w-full text-lg">
                Login
              </Button>
            </Link>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Forgot your password?{' '}
              <Link href="#" className="font-medium text-primary hover:underline">
                Reset It
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
