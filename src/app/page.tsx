
import Link from "next/link"
import Logo from "./components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Clock, AreaChart } from "lucide-react"

export default function LandingPage() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Customer Management",
      description: "Keep track of all your customers, their history, and their value to your business.",
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Complaint Tracking",
      description: "Log, prioritize with AI, and manage customer complaints efficiently.",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Attendance System",
      description: "Monitor staff attendance with clock-in/out features and leave management.",
    },
    {
      icon: <AreaChart className="w-8 h-8 text-primary" />,
      title: "Insightful Reports",
      description: "Generate monthly attendance and salary reports with just a few clicks.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
          <Logo className="w-8 h-8" />
          <span className="text-xl font-semibold">Bluestar Connect</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  The All-in-One Management Solution
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Bluestar Connect helps you manage customers, track complaints, monitor staff, and generate reports, all in one place.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/login" prefetch={false}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is packed with features designed to streamline your operations and boost productivity.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-col items-center text-center gap-4">
                     {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground">
                    {feature.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Bluestar Connect. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
