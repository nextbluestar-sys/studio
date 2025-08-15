import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DashboardStats from "../components/dashboard-stats"
import ComplaintsChart from "../components/complaints-chart"
import RecentComplaints from "../components/recent-complaints"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to ManagePro. Here's an overview of your system.
        </p>
      </div>
      <DashboardStats />
      <div className="grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Complaints Overview</CardTitle>
            <CardDescription>
              A chart showing complaint trends over the last week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ComplaintsChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
            <CardDescription>
              The most recent complaints logged in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentComplaints />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
